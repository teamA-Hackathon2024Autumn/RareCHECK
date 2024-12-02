from flask import Flask, jsonify, request, session
from flask_cors import CORS
from models import db, Question, User, Category, LearningRecord
from sqlalchemy import and_, or_, func
from flask_session import Session
from models import db, Question, User, Category
from datetime import datetime, timedelta
import uuid
import traceback
import random
import pytz
import bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
# CORS(app)  # CORSを有効にする
# CORS が有効だとリクエストが通らない（front→localhost:3000, backend→localhost:5000）
CORS(app, supports_credentials=True) 
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# セッション用のシークレットキー、環境変数ファイルに移す
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = os.getenv('SESSION_TYPE', 'filesystem')
app.config['SESSION_COOKIE_HTTPONLY'] = os.getenv('SESSION_COOKIE_HTTPONLY', 'True').lower() == 'true'

# sqlalchemyの初期化
db.init_app(app)

Session(app)

# ログイン
@app.route('/rarecheck/users/login', methods=['POST'])
def login():
    try:
        # クライアントからのリクエストデータを取得
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # 入力データのバリデーション
        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400
        
        # ユーザーをデータベースから検索
        user = User.query.filter_by(email=email).first()  # パスワードではなく、メールで検索

        if user is None or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            print(f"Debug: Invalid login for email={email}")
            return jsonify({'message': 'Invalid email or password'}), 400
        
        if user:
            # セッションIDを生成
            session_id = str(uuid.uuid4())
            session['session_id'] = session_id
            session['user_id'] = user.id

            # レスポンスデータを作成
            response_data = {
                'userId': user.id,
                'username': user.username,
                'isAdmin': user.is_admin,
            }
            return jsonify(response_data), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 400

    except Exception as e:
          # エラーハンドリング
        traceback.print_exc()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


# ログアウト
@app.route('/rarecheck/users/logout', methods=['POST'])
def logout():
    try:
        data = request.get_json()

        # セッションが存在する場合
        if 'session_id' in session:
            # セッションをクリア
            session.clear()
            return jsonify({'message': 'Logout successful'}), 200
        else:
            # セッションが存在しない場合
            return jsonify({'message': 'No active session found'}), 400
    except Exception as e:
        # エラーハンドリング
        traceback.print_exc()
        return jsonify({'message': 'An error occurred during logout', 'error': str(e)}), 500


# 新規登録
@app.route('/rarecheck/users/register', methods=['POST'])
def register():
    try:
        # クライアントからのリクエストデータを取得
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # 入力データのバリデーション
        if not username or not email or not password:
            return jsonify({'message': 'Username, email, and password are required'}), 400

        # ユーザー名またはメールアドレスの重複チェック
        if User.query.filter_by(username=username).first():
            return jsonify({'message': 'ユーザー名がすでに利用されています'}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'メールアドレスがすでに利用されています'}), 400
        
        # パスワードをハッシュ化
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # 新しいユーザーをデータベースに追加
        new_user = User(
            username=username,
            email=email,
            password=hashed_password.decode('utf-8'),  # ハッシュを文字列として保存
            is_admin=False  # 新規登録時はデフォルトで管理者ではない
        )
        db.session.add(new_user)
        db.session.commit()

        # セッションIDを生成
        session_id = str(uuid.uuid4())
        session['session_id'] = session_id
        session['user_id'] = new_user.id

        # 登録完了後のレスポンスデータ
        response_data = {
            'userId': new_user.id,
            'username': new_user.username,
            'isAdmin': new_user.is_admin,
        }
        return jsonify(response_data), 201  # ユーザー登録成功時は201を返す

    except Exception as e:
        db.session.rollback()  # エラー時にトランザクションをロールバック
        traceback.print_exc()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


# ユーザー情報の取得
@app.route('/rarecheck/users/<int:user_id>', methods=['GET'])
def get_user_info(user_id):
    try:
        # セッションからユーザーIDを取得
        session_user_id = session.get('user_id')
        if session_user_id is None or session_user_id != user_id:
            return jsonify({'message': 'Unauthorized: User ID does not match session'}), 403

        # ユーザー情報をデータベースから取得
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404

        # ユーザー名とメールアドレスをレスポンスとして返す
        response_data = {
            'username': user.username,
            'email': user.email
        }
        return jsonify(response_data), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'message': 'An unexpected error occurred', 'error': str(e)}), 500


# ユーザー情報の更新
@app.route('/rarecheck/users/<int:user_id>', methods=['PUT'])
def update_user_info(user_id):
    try:
        # セッションからユーザーIDを取得
        session_user_id = session.get('user_id')
        if session_user_id is None or session_user_id != user_id:
            return jsonify({'message': 'Unauthorized: User ID does not match session'}), 403

        # リクエストデータの取得
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        before_password = data.get('beforePassword')
        new_password = data.get('password')

        if not all([username, email, before_password, new_password]):
            return jsonify({'message': 'All fields are required'}), 400

        # ユーザー情報をデータベースから取得
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404

        # 現在のパスワードを検証
        if not bcrypt.checkpw(before_password.encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({'message': 'The current password is incorrect'}), 400

        # ユーザー情報を更新
        user.username = username
        user.email = email
        user.password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        db.session.commit()
        return jsonify({
            'message': 'User information updated successfully',
            'username': user.username
        }), 200  # 成功時にメッセージとユーザー名を返す

    except Exception as e:
        db.session.rollback()
        traceback.print_exc()
        return jsonify({'message': 'An unexpected error occurred', 'error': str(e)}), 500


# 管理者(admin)
# 問題一覧表示(承認・未承認含む全ての問題)
@app.route('/rarecheck/admin/questions', methods=['GET'])
def admin_get_questions():
    questions = Question.query.all()
    question = []

    for q in questions:
        question.append({
            "id": q.id,
            "username": q.user.username,
            "question": q.question,
            "step": q.step,
            "category_name": q.category.category_name
        })
    
    return jsonify(question)

# 問題一覧表示(未承認の問題一覧)
@app.route('/rarecheck/admin/notaccept/questions', methods=['GET'])
def get_not_accept_question():
    questions = Question.query.filter(
        Question.is_accept == False, 
        Question.has_comment == False
    ).all()
    question = []

    for q in questions:
        question.append({
            "id": q.id,
            "username": q.user.username,
            "question": q.question,
            "step": q.step,
            "category_name": q.category.category_name
        })
    
    return jsonify(question)

# 問題詳細表示　(承認とコメントと削除ができる) + 問題編集
@app.route('/rarecheck/admin/question/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def admin_get_question(id):
    question = Question.query.get(id)

    if request.method == 'GET':
        if not question:
            return jsonify({'error': 'question not found'}), 404
        
        return jsonify({
            'id': question.id,
            'difficulty': question.difficulty,
            'is_accept': question.is_accept,
            'step': question.step,
            'category_name': question.category.category_name,
            'question': question.question,
            # 'question_image': question.question_image, S3に保存する
            'correct_option': question.correct_option,
            'wrong_option_1': question.wrong_option_1,
            'wrong_option_2': question.wrong_option_2,
            'explanation': question.explanation,
            # 'explanation_image': question.explanation_image, S3に保存する
            'comment': question.comment,
        })
    
    elif request.method == 'PUT':
        # フロントから送られてきたデータを取得
        data = request.get_json()

        if 'category_name' in data:
            category = Category.query.filter_by(category_name=data.get('category_name')).first()
            if not category:
                return jsonify({'error': 'Invalid category_name'}), 400
            question.category_id = category.id

        question.step = data.get('step', question.step)
        question.question = data.get('question', question.question)
        # question.question_image = data.get('question_image', question.quesion_image) S3に保存する
        question.correct_option = data.get('correct_option', question.correct_option)
        question.wrong_option_1 = data.get('wrong_option_1', question.wrong_option_1)
        question.wrong_option_2 = data.get('wrong_option_2', question.wrong_option_2)
        question.explanation = data.get('explanation', question.explanation)
        # question.explanation_image = data.get('explanation_image', question.explanation_image) S3に保存する
        question.difficulty = data.get('difficulty', question.difficulty)
        question.comment = data.get('comment', question.comment)
        if question.comment != None:
            question.has_comment = True
        if data.get('is_accept') is True and question.is_accept == False:
            question.is_accept = data.get('is_accept', question.is_accept)
        elif data.get('is_accept') is False and question.is_accept == True:
            question.is_accept = data.get('is_accept', question.is_accept)
        db.session.commit()

        return jsonify({'message': 'Question updated Successfully'}), 200


    
    elif request.method == 'DELETE':
        question = Question.query.filter_by(id=id).first()

        if not question:
            return jsonify({'error': 'question not found'}), 404
        
        try: 
            db.session.delete(question)
            db.session.commit()
            return jsonify({'question deleted successfully'}), 200
        except:
            db.session.rollback()
            return jsonify({'error': 'failed to delete question'})



# 一般ユーザー(受講生)
# 問題一覧表示
@app.route('/rarecheck/users/questions', methods=['GET']) # sessionからuser_idを取得しているためurlにuser_idを含めていません。
def user_get_questions():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'message': 'Unauthorized. Please log in.'}), 401

    # ユーザーが作成した問題一覧を取得
    questions = Question.query.filter(Question.user_id == user_id).all()

    if not questions:
        return jsonify({"message": "Question don't exist."}), 404

    question_list = []
    for q in questions:
        question_list.append({
            "id": q.id,
            "question": q.question,
            "step": q.step,
            "category_name": q.category.category_name,
            "created_at": q.created_at.isoformat(),
            "has_comment": q.has_comment,
            "is_accept": q.is_accept
        })

    return jsonify(question_list)
   
# 問題作成
@app.route('/rarecheck/questions/create', methods=['POST'])
def create_question():
    try:
        data = request.get_json()

        # フロントからはcategory_nameが送られてくるが、バックではcategory_idとして保存
        category = Category.query.filter_by(category_name=data.get('category_name')).first()
        if not category:
            return jsonify({'error': 'Invalid category_name'}), 400

        new_question = Question(
            step=data.get('step'),
            question=data.get('question'),
            # question_image=data.get('question_image'), s3に保存する処理
            correct_option=data.get('correct_option'),
            wrong_option_1=data.get('wrong_option_1'),
            wrong_option_2=data.get('wrong_option_2'),
            explanation=data.get('explanation'),
            # explanation_image=data.get('explanation_imageg'), s3に保存する処理
            is_accept=data.get('is_accept'),
            difficulty=data.get('difficulty'),
            comment=data.get('comment'),
            has_comment=data.get('has_comment'),
            user_id=data.get('user_id'),
            category_id=category.id
        )

        db.session.add(new_question)

        db.session.commit()

        return jsonify({
            "message": "question created successfully"
        }), 201
    
    except Exception as e:
        db.session.rollback()
        traceback.print_exc()
        return jsonify({"error": "An unexpected error occurred."}), 500
    
# 問題編集
@app.route('/rarecheck/questions/<int:id>/edit', methods=['GET','PUT'])
def get_question(id):
    question = Question.query.filter_by(id=id).first()

    if not question:
        return jsonify({'error': 'question not found'}), 404
    
    if request.method == 'GET':

        category = Category.query.get(question.category.id)
        category_name = category.category_name if category else None

        return jsonify({
            'id': question.id,
            'difficulty': question.difficulty,
            'is_accept': question.is_accept,
            'step': question.step,
            'category_name': category_name,
            'question': question.question,
            # 'quesiton_image': question.question_image, S3に保存する
            'correct_option': question.correct_option,
            'wrong_option_1': question.wrong_option_1,
            'wrong_option_2': question.wrong_option_2,
            'explanation': question.explanation,
            # 'explanation_image': question.explanation_image, S3に保存する
            'comment': question.comment
        })
    
    elif request.method == 'PUT':
        # フロントから送られてきたデータを取得
        data = request.get_json()

        # フロントから送られてきたcategory_nameをcategory_idにして保存
        if 'category_name' in data:
            category = Category.query.filter_by(category_name=data.get('category_name')).first()
            if not category:
                return jsonify({'error': 'Invalid category_name'}), 400
            question.category_id = category.id

        question.step = data.get('step', question.step)
        question.question = data.get('question', question.question)
        # question.question_image = data.get('question_image', question.quesion_image) S3に保存する
        question.correct_option = data.get('correct_option', question.correct_option)
        question.wrong_option_1 = data.get('wrong_option_1', question.wrong_option_1)
        question.wrong_option_2 = data.get('wrong_option_2', question.wrong_option_2)
        question.explanation = data.get('explanation', question.explanation)
        # question.explanation_image = data.get('explanation_image', question.explanation_image) S3に保存する
        question.has_comment = False

        db.session.commit()


        return jsonify({'message': 'Question updated Successfully'}), 200

# 問題演習
# 演習問題の取得
@app.route('/rarecheck/questions', methods=['POST'])
def get_exercise_questions():
    data = request.get_json()

    step_ranges = data.get('step_ranges', [1, 500])
    step_conditions = []

    # 出題する問題のカテゴリーを取得
    categories = data.get('categories', [])

    # 出題される問題の難易度を取得
    difficulty = data.get('difficulty')

    # 問題の出題数を取得
    question_count = data.get('question_count')

    # ステップ範囲の条件を構築
    step_conditions = []
    for step_range in step_ranges:
        start_step, end_step = step_range
        step_conditions.append(
            and_(Question.step >= start_step, Question.step <= end_step)
        )

    # ベースクエリ
    query = Question.query.filter(
        and_(
            or_(*step_conditions),
            Question.is_accept == True
        )
    )

        
    # カテゴリー指定がある場合(指定なしでも可)
    if categories:
            query = query.filter(Question.category_id.in_(
                Category.query.with_entities(Category.id).filter(Category.category_name.in_(categories))
            ))

     # 難易度指定がある場合(指定なしでも可)
    if difficulty:
            query = query.filter(Question.difficulty.in_(difficulty))

    questions = query.limit(question_count).all()

    results = []
    for question in questions:
        # 選択肢をランダムにしてoptionsという配列で返す
        options = [
            question.correct_option,
            question.wrong_option_1,
            question.wrong_option_2
        ]
        random.shuffle(options)

        results.append({
            "id": question.id,
            "question": question.question,
            "options": options,
            "correct_option": question.correct_option,
            "explanation": question.explanation,
            # "question_image": question.question_image,
            # "explanation_image": question.explanation_image,
            "category_name": question.category.category_name,
            "step": question.step,
            "difficulty": question.difficulty
        })

    return jsonify(results), 200

# フロントから送られてくる出題範囲のデータ例(JSON)
# {
#   "step_ranges": [1, 10] 複数のステップ範囲選択の場合:[[1,10],[100, 150]] # ステップで絞り込む
#   "categories": ["プログラミング", "インフラ"], # カテゴリで絞り込む(0つ以上選択)
#   "difficulty": [1, 2], # 難易度で絞り込む(0つ以上選択) 1が易しい、2が普通、3が難しい
#   "question_count": 5 # 出題数(1つ選択)
# }

# 問題演習の結果を取得して保存(result)
@app.route('/rarecheck/questions/<int:id>/answer', methods=['POST'])
def get_answer(id):
    data = request.get_json()
    user_id = data.get('user_id')
    question_id = data.get('question_id')
    is_solved = data.get('is_solved') # True/Falseで受け取る

    record = LearningRecord.query.filter_by(user_id=user_id, question_id=id).first()
    if record:
        record.is_solved = is_solved
    else:
        record = LearningRecord(user_id=user_id, question_id=question_id, is_solved=is_solved)
        db.session.add(record)

    try:
        db.session.commit()
        return jsonify({'message': 'Answer is recorded successfully'}), 200
    except Exception as e:
        db.session.rollback()
        traceback.print_exc()
        return jsonify({'error': 'Failed to record answer'}), 500
    

# 学習記録(グラフ)
@app.route('/rarecheck/users/<int:user_id>/exercise_analysis', methods=['GET'])
def get_record(user_id):
    try:
        # today = datetime.now(pytz.timezone('Asia/Tokyo'))

        japan_tz = pytz.timezone('Asia/Tokyo')

        today = datetime.now(japan_tz)
        # 2週間前の日付を計算
        two_weeks_ago = today - timedelta(days=14)
        # 4週間前の日付を計算
        four_weeks_ago = today - timedelta(days=28)

        # (2週間前)
        # ユーザーの演習数をカウント
        total_questions_first = db.session.query(func.count(LearningRecord.id)).filter(
            LearningRecord.user_id == user_id,
            LearningRecord.date.between(two_weeks_ago, today)
        ).scalar()

        # 正答数をカウント 
        total_correct_first = db.session.query(func.count(LearningRecord.id)).filter(
            LearningRecord.user_id == user_id,
            LearningRecord.date.between(two_weeks_ago, today),
            LearningRecord.is_solved == True
        ).scalar()

        # 正答率の計算
        correct_percentage_first = (
            (total_correct_first / total_questions_first) * 100 if total_questions_first > 0 else 0
        )

        # (4週間前)
        # ユーザーの演習数をカウント
        total_questions_second = db.session.query(func.count(LearningRecord.id)).filter(
            LearningRecord.user_id == user_id,
            LearningRecord.date.between(four_weeks_ago, two_weeks_ago)
        ).scalar()

        # 正答数をカウント 
        total_correct_second = db.session.query(func.count(LearningRecord.id)).filter(
            LearningRecord.user_id == user_id,
            LearningRecord.date.between(four_weeks_ago, two_weeks_ago),
            LearningRecord.is_solved == True
        ).scalar()

        # 正答率の計算
        correct_percentage_second = (
            (total_correct_second / total_questions_second) * 100 if total_questions_second > 0 else 0
        )


        records = {
            "first_two_week": {
                "start_date": two_weeks_ago.strftime('%Y/%m/%d'),
                "end_date": today.strftime('%Y/%m/%d'),
                "total_questions": total_questions_first,
                "total_correct": total_correct_first,
                "correct_percentage": round(correct_percentage_first, 2)
            },
            "second_two_week": {
                "start_date": four_weeks_ago.strftime('%Y/%m/%d'),
                "end_date": two_weeks_ago.strftime('%Y/%m/%d'),
                "total_questions": total_questions_second,
                "total_correct": total_correct_second,
                "correct_percentage": round(correct_percentage_second, 2)
            }
        }

        return jsonify(records), 200


    except Exception as e:
        return jsonify({"message": "Faild to calculate user's analysis."}), 500

    
@app.errorhandler(Exception)
def handle_exception(e):
    # 詳細なエラーをレスポンスとして返す
    return jsonify({
        "error": str(e),
        "type": type(e).__name__
    }), 500

    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # データベースの初期化
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True, reloader_interval=5)

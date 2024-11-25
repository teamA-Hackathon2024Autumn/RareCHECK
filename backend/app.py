from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from models import db, Question, User, Category
import uuid
import traceback


app = Flask(__name__)
# CORS(app)  # CORSを有効にする
# CORS が有効だとリクエストが通らない（front→localhost:3000, backend→localhost:5000）
CORS(app, supports_credentials=True) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@db/rarecheck'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# セッション用のシークレットキー、環境変数ファイルに移す
app.config['SECRET_KEY'] = 'rarecheck_secret_key'  
app.config['SESSION_TYPE'] = 'filesystem'  # セッションをファイルに保存
app.config['SESSION_COOKIE_HTTPONLY'] = True # HttpOnly を有効化

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
        user = User.query.filter_by(email=email, password=password).first()
        if user is None:
            print(f"Debug: No user found with email={email} and password={password}")
            return jsonify({'message': 'email, password not found'}), 400
        
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
        session_id = data.get('sessionId')

        # セッションが存在する場合
        # if session_id in session:
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

# 問題詳細表示　(承認とコメントと削除ができる)
@app.route('/rarecheck/admin/question/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def admin_get_question(id):
    question = Question.query.get(id)

    if request.method == 'GET':
        if not question:
            return jsonify({'error': 'question not found'}), 404
        
        return jsonify({
            'id': question.id,
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

        question.comment = data.get('comment', question.comment)
        if question.comment != None:
            question.has_comment = True
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
@app.route('/rarecheck/questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    question = []
    for q in questions:
        question.append({
            "id": q.id,
            "question": q.question,
            "step": q.step,
            "created_at": q.created_at,
            "comment": q.comment,
            "is_accept": q.is_accept
        })

    return jsonify(question)


   
# 問題作成
@app.route('/rarecheck/questions/create', methods=['POST'])
def create_question():
    try:
        data = request.get_json()

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
            category_id=data.get('category_id')
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
        return jsonify({
            'id': question.id,
            'step': question.step,
            'category_id': question.category_id,
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

        question.step = data.get('step', question.step)
        question.category_id = data.get('category_id', question.category_id)
        question.question = data.get('question', question.question)
        # question.question_image = data.get('question_image', question.quesion_image) S3に保存する
        question.correct_option = data.get('correct_option', question.correct_option)
        question.wrong_option_1 = data.get('wrong_option_1', question.wrong_option_1)
        question.wrong_option_2 = data.get('wrong_opiton_2', question.wrong_option_2)
        question.explanation = data.get('explanation', question.explanation)
        # question.explanation_image = data.get('explanation_image', question.explanation_image) S3に保存する

        db.session.commit()


        return jsonify({'message': 'Question updated Successfully'}), 200

    
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

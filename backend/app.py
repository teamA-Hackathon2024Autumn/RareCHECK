from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Question, User, Category, LearningRecord
from sqlalchemy import and_, or_
import traceback
import random


app = Flask(__name__)
CORS(app)  # CORSを有効にする
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@db/rarecheck'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# sqlalchemyの初期化
db.init_app(app)

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
        question.wrong_option_2 = data.get('wrong_opiton_2', question.wrong_option_2)
        question.explanation = data.get('explanation', question.explanation)
        # question.explanation_image = data.get('explanation_image', question.explanation_image) S3に保存する

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
        return jsonify({'error': 'Failed to record answer'}), 500

    
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

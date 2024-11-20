from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Question
import traceback


app = Flask(__name__)
CORS(app)  # CORSを有効にする
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@db/rarecheck'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# sqlalchemyの初期化
db.init_app(app)

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

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    step = db.Column(db.Integer, nullable=True)
    question = db.Column(db.String(1000), nullable=False)
    question_image = db.Column(db.String(255), nullable=True)
    correct_option = db.Column(db.String(255), nullable=False)
    wrong_option_1 = db.Column(db.String(255), nullable=False)
    wrong_option_2 = db.Column(db.String(255), nullable=False)
    explanation = db.Column(db.String(1000), nullable=False)
    explanation_image = db.Column(db.String(255), nullable=True)
    is_accept = db.Column(db.Boolean, nullable=False, default=False)
    difficulty = db.Column(db.Integer, nullable=True)  # 難易度: 1が易しい、2が普通、3が難しい
    comment = db.Column(db.String(500), nullable=True)
    has_comment = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    user_id = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, nullable=False)
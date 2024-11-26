from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    questions = db.relationship('Question', back_populates='user')
    learning_records = db.relationship('LearningRecord', back_populates='user')

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_name = db.Column(db.String(255), unique=True, nullable=False)

    questions = db.relationship('Question', back_populates='category')

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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    user = db.relationship('User', back_populates='questions')
    category = db.relationship('Category', back_populates='questions')
    learning_records = db.relationship('LearningRecord', back_populates='question')

class LearningRecord(db.Model):
    __tablename__ = 'learning_records'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())
    is_solved = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)

    user = db.relationship('User', back_populates='learning_records')
    question = db.relationship('Question', back_populates='learning_records')
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORSを有効にする
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@db/dbname'
db = SQLAlchemy(app)

# データベースモデルの定義
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

@app.route('/items', methods=['GET'])
def get_items():
    try:
        items = Item.query.all()
        return jsonify([{'id': item.id, 'name': item.name} for item in items])
    except Exception as e:
        return str(e), 500  # エラーが発生した場合、500エラーを返す
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # データベースの初期化
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True, reloader_interval=5)
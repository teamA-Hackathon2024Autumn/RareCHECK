# Dockerfile for Flask
FROM python:3.9

WORKDIR /app

# 依存関係をコピー
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコピー
COPY . .

# Flaskを起動
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--debug"]
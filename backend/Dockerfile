# Dockerfile for Flask
FROM python:3.9

WORKDIR /app

# 依存関係をコピー
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# ping と ip route をインストール
RUN apt-get update && apt-get install -y iputils-ping iproute2 && rm -rf /var/lib/apt/lists/*

# ソースコードをコピー
COPY . .

# Flaskを起動
<<<<<<< HEAD
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--debug"]
=======
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--debug"]
>>>>>>> main

# Dockerfile for Flask
FROM python:3.9

WORKDIR /app

# 依存関係をコピー
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコピー
COPY ./backend/ .

# .env ファイルを環境変数として読み込む
RUN apt-get update && apt-get install -y bash && apt-get clean
RUN echo "export $(cat .env | xargs)" >> ~/.bashrc
SHELL ["/bin/bash", "-c"]

# Flaskを起動
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--debug"]
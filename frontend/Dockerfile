# Dockerfile for React with Vite
FROM node:18

WORKDIR /app

# 依存関係をコピー
COPY package.json ./
RUN npm install

# ping と ip route をインストール
RUN apt-get update && apt-get install -y iputils-ping iproute2 && rm -rf /var/lib/apt/lists/*

# ソースコードをコピー
COPY . .

# Viteのビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "run", "dev"]

EXPOSE 3000

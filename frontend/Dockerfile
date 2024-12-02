# Dockerfile for React with Vite
FROM node:18

WORKDIR /app

# 依存関係をコピー
COPY ./frontend/package.json ./
RUN npm install

# ソースコードをコピー
COPY ./frontend/ .

# Viteのビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "run", "dev"]

EXPOSE 3000
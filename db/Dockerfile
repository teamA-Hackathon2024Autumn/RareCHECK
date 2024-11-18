FROM ubuntu:20.04

# 非対話モードでパッケージをインストール
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    mysql-server \
    iputils-ping \
    iproute2 \
    curl \
    wget && \
    rm -rf /var/lib/apt/lists/*

# コンテナが起動する際のデフォルトコマンド（必要に応じて変更）
CMD ["mysqld"]

FROM mysql:5.7

# my.cnf を適切な場所にコピーし、権限を設定
COPY ./my.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf

# 初期化スクリプトの配置
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
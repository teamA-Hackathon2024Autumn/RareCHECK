DROP DATABASE rarecheck;

CREATE DATABASE rarecheck;
USE rarecheck;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    step INTEGER,
    question VARCHAR(1000) NOT NULL,
    question_image VARCHAR(255),
    correct_option VARCHAR(255) NOT NULL,
    wrong_option_1 VARCHAR(255) NOT NULL,
    wrong_option_2 VARCHAR(255) NOT NULL,
    explanation VARCHAR(1000) NOT NULL,
    explanation_image VARCHAR(255),
    is_accept BOOLEAN NOT NULL DEFAULT FALSE,
    difficulty INTEGER, -- 1が易しい、2が普通、3が難しい
    comment VARCHAR(500),
    has_comment BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE rankings (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP NOT NULL,
    _1st VARCHAR(255),
    _2nd VARCHAR(255),
    _3rd VARCHAR(255),
    _4th VARCHAR(255),
    _5th VARCHAR(255),
    _6th VARCHAR(255),
    _7th VARCHAR(255),
    _8th VARCHAR(255),
    _9th VARCHAR(255),
    _10th VARCHAR(255)
);

CREATE TABLE learning_records (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_solved BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- usersのサンプルデータ（管理者）
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser1', 'test1@email.com', '$2b$12$gqRvHbLHZRHl4gcrQDlzjeX1hsZvBta8KZNdRROv5IbVWg/ecTZY2', TRUE);
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser2', 'test2@email.com', '$2b$12$ESE2cOq1mr7LwJGJ9cmYCOPgQ5DB4aSChhp3I89gokjLydtSg7I1S', TRUE);
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser3', 'test3@email.com', '$2b$12$7fdhuOk0oa8F5.GCtKjusOASyzrB5QxgKOFliZy4XIMbZUyHhBd7W', TRUE);

-- userのサンプルデータ（一般ユーザー）
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser4', 'test4@email.com', '$2b$12$yigDJLzFFdcuVFYeUAO5C.gtT8IIRi2rvaIlgYTlifS62N8W0fLae', FALSE);
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser5', 'test5@email.com', '$2b$12$YVla/2mgWvvylZ7MKn6iPODmpX3WKMMMIASTX3ICbUmelp/WMlH0y', FALSE);
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser6', 'test6@email.com', '$2b$12$3Y99pREzC4b5De4RB2t7ne8ouvOKK8GMfRt5KWSyjfUy9EFE1l1yC', FALSE);

-- categoriesのサンプルデータ
INSERT INTO categories (category_name) VALUES ('インフラ'),('プログラミング'),('ウェブシステム'),('アーキテクティング'),('セキュリティ'),('AI/データサイエンス'),('UI/UX'),('ビジネススキル'),('その他');

-- 管理者画面用 questionsテーブルのテストデータ is_acceptは全てFALSE ５件
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id)
VALUES
(151, '仮想マシンのスナップショットの主な目的は何ですか？', 'システム状態のバックアップ', 'ネットワークの速度向上', 'CPU性能の向上', 'スナップショットはシステムの状態をバックアップします。', FALSE, 1, 6, 1),
(152, 'Pythonで無限ループを作成するのに使う構文はどれですか？', 'while True:', 'for i in range():', 'while 1 < 0:', 'while True: は無限ループを作成するために使用されます。', FALSE, 2, 6, 2),
(153, 'HTTPステータスコード404の意味は何ですか？', 'リソースが見つからない', 'サーバーエラー', 'リクエストが成功', '404はリクエストされたリソースが見つからないことを意味します。', FALSE, 1, 6, 3),
(154, '負荷テストで重要な指標はどれですか？', '応答時間', 'ログサイズ', 'IPアドレス', '応答時間は負荷テストで重要な指標です。', FALSE, 2, 6, 4),
(155, 'ネットワークトラフィックを暗号化するプロトコルはどれですか？', 'TLS', 'FTP', 'HTTP', 'TLSは通信を暗号化するプロトコルです。', FALSE, 1, 6, 5);


-- 問題演習用 questionsテーブルのテストデータ is_acceptは全てTRUE
-- インフラ (step 1~10)
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id)
VALUES
(1, 'サーバの構成を監視するツールはどれですか？', 'Nagios', 'Git', 'Apache', 'Nagiosは監視ツールで、サーバやネットワークの監視に用いられます。', TRUE, 1, 5, 1),
(2, 'ネットワークの遅延を測定するツールはどれですか？', 'Ping', 'Docker', 'MySQL', 'Pingはネットワーク遅延や応答時間を測定するツールです。', TRUE, 1, 5, 1),
(3, 'コンテナの仮想化を行うツールはどれですか？', 'Docker', 'PostgreSQL', 'Nagios', 'Dockerはアプリケーションのコンテナ仮想化を行うツールです。', TRUE, 1, 5, 1),
(4, 'ファイアウォールの設定に用いられるコマンドはどれですか？', 'iptables', 'SSH', 'curl', 'iptablesはLinuxのファイアウォール設定に使用されます。', TRUE, 2, 5, 1),
(5, 'IPアドレスの設定を変更するコマンドはどれですか？', 'ifconfig', 'scp', 'vim', 'ifconfigはLinuxでネットワークインターフェースを管理するコマンドです。', TRUE, 2, 5, 1),
(11, 'Pythonでリストを操作するメソッドはどれですか？', 'append', 'sum', 'len', 'appendはリストに要素を追加するためのPythonメソッドです。', TRUE, 1, 5, 2),
(12, 'JavaScriptでDOM要素を取得するメソッドはどれですか？', 'getElementById', 'addEventListener', 'createElement', 'getElementByIdはIDでDOM要素を取得します。', TRUE, 1, 5, 2),
(13, 'C++でクラスのメンバー関数を定義するキーワードはどれですか？', 'class', 'private', 'main', 'C++でclassはオブジェクトを定義するためのキーワードです。', TRUE, 1, 5, 2),
(14, 'Rubyで文字列を結合する方法はどれですか？', 'concat', 'merge', 'append', 'concatはRubyで文字列を結合するためのメソッドです。', TRUE, 2, 5, 2),
(15, 'Go言語で新しいゴルーチンを起動するにはどのキーワードを使いますか？', 'go', 'start', 'run', 'goキーワードを使用して新しいゴルーチンを作成します。', TRUE, 2, 5, 2),
(21, 'HTTPのステータスコード200の意味は何ですか？', 'OK', 'Not Found', 'Unauthorized', '200はリクエストが正常に処理されたことを意味します。', TRUE, 1, 5, 3),
(22, 'データをやり取りする際のJSONの完全な名称は何ですか？', 'JavaScript Object Notation', 'Java Syntax Object', 'Java Simple Option', 'JSONは軽量なデータ交換フォーマットです。', TRUE, 1, 5, 3),
(23, 'REST APIにおけるGETリクエストの目的は何ですか？', 'データを取得する', 'データを更新する', 'データを削除する', 'GETリクエストはデータを取得するために使用されます。', TRUE, 1, 5, 3),
(24, 'CSSで要素の背景色を設定するプロパティは何ですか？', 'background-color', 'color', 'border-color', 'background-colorは要素の背景色を設定するプロパティです。', TRUE, 2, 5, 3),
(25, 'WebページのSEOを改善するために重要なHTMLタグはどれですか？', 'meta', 'div', 'script', 'metaタグはSEOで重要な情報を提供します。', TRUE, 2, 5, 3),
(31, 'マイクロサービスアーキテクチャの特徴は何ですか？', '小規模で独立したサービスの集合', '単一のモノリシックなアプリケーション', 'SQLデータベースのみを使用', 'マイクロサービスアーキテクチャは小規模で独立したサービスを提供します。', TRUE, 1, 5, 4),
(32, '分散システムのスケーラビリティを確保するために使用する概念は何ですか？', '水平スケーリング', 'データ正規化', 'クエリキャッシュ', '水平スケーリングはスケーラビリティ向上に用いられます。', TRUE, 1, 5, 4),
(33, 'コンテナオーケストレーションツールの一例は何ですか？', 'Kubernetes', 'Docker', 'Apache', 'Kubernetesはコンテナオーケストレーションツールです。', TRUE, 1, 5, 4),
(34, 'キャパシティプランニングの目的は何ですか？', 'システムリソースの計画と最適化', 'データ暗号化', 'ファイル共有', 'キャパシティプランニングは効率的なリソース管理を目的とします。', TRUE, 2, 5, 4),
(35, 'DevOpsにおけるCI/CDの役割は何ですか？', '継続的インテグレーションと継続的デリバリー', '分散データベースの管理', 'バージョン管理の停止', 'CI/CDは開発プロセスの自動化に役立ちます。', TRUE, 2, 5, 4),
(41, 'SQLインジェクション攻撃の対策として推奨される方法はどれですか？', 'パラメータ化されたクエリの使用', 'プレーンSQLの使用', 'データベースの暗号化', 'パラメータ化されたクエリはSQLインジェクションを防ぎます。', TRUE, 1, 5, 5),
(42, 'HTTPS通信に用いられるプロトコルはどれですか？', 'TLS', 'FTP', 'SMTP', 'TLSはHTTPS通信で使用される暗号化プロトコルです。', TRUE, 1, 5, 5),
(43, 'ファイルのハッシュ値を生成する目的は何ですか？', '整合性の確認', '速度向上', 'ファイルサイズの縮小', 'ハッシュ値はデータの整合性を確認するために使用されます。', TRUE, 1, 5, 5),
(44, 'マルウェアの一種であるランサムウェアの特徴は何ですか？', 'データを暗号化して身代金を要求する', 'システムを高速化する', 'データベースを最適化する', 'ランサムウェアはデータを暗号化して身代金を要求します。', TRUE, 2, 5, 5),
(45, 'セキュリティの三大要素として知られるものは何ですか？', '機密性、完全性、可用性', '耐久性、拡張性、速度', 'コスト、信頼性、効率性', 'セキュリティの三大要素は機密性、完全性、可用性です。', TRUE, 2, 5, 5),
(51, 'Linuxでネットワーク接続状況を確認するコマンドはどれですか？', 'netstat', 'vi', 'ping', 'netstatはネットワーク接続状況を確認するためのコマンドです。', TRUE, 1, 5, 1),
(52, 'クラウドサービスの一つであるIaaSの意味は何ですか？', 'Infrastructure as a Service', 'Internet as a Service', 'Information as a Service', 'IaaSはインフラをサービスとして提供するクラウドモデルです。', TRUE, 1, 5, 1),
(53, 'ロードバランサーの主な役割は何ですか？', 'トラフィックの分散', 'データの暗号化', 'データの圧縮', 'ロードバランサーはトラフィックを分散してシステムの負荷を軽減します。', TRUE, 2, 5, 1),
(54, 'ファイル転送プロトコルとして有名なものはどれですか？', 'FTP', 'HTTP', 'SSH', 'FTPはファイルを転送するためのプロトコルです。', TRUE, 1, 5, 1),
(55, 'LinuxでIPルートを設定するコマンドはどれですか？', 'ip route', 'ifconfig', 'scp', 'ip routeはネットワークルーティングを設定するためのコマンドです。', TRUE, 2, 5, 1),
(61, 'Pythonで例外処理を行うキーワードはどれですか？', 'try', 'catch', 'error', 'tryは例外処理の開始部分を示すPythonのキーワードです。', TRUE, 1, 5, 2),
(62, 'JavaScriptで非同期処理を管理するオブジェクトは何ですか？', 'Promise', 'Array', 'Object', 'Promiseは非同期処理を管理するために使用されます。', TRUE, 1, 5, 2),
(63, 'C++でポインタを解放するために使う関数はどれですか？', 'delete', 'free', 'null', 'deleteはC++で動的に確保したメモリを解放するために使用されます。', TRUE, 2, 5, 2),
(64, 'Rubyでコードを繰り返し実行するメソッドはどれですか？', 'each', 'forEach', 'map', 'eachはRubyで繰り返し処理を行うメソッドです。', TRUE, 1, 5, 2),
(65, 'Go言語でエラーを処理するために使用する構造はどれですか？', 'error', 'exception', 'panic', 'errorはGo言語でエラーを表現するための型です。', TRUE, 2, 5, 2),
(71, 'HTMLでリンクを作成するタグはどれですか？', 'a', 'link', 'href', '<a>タグはリンクを作成するために使用されます。', TRUE, 1, 5, 3),
(72, 'CSSでテキストの色を設定するプロパティは何ですか？', 'color', 'font-color', 'text-color', 'colorプロパティはテキストの色を設定します。', TRUE, 1, 5, 3),
(73, 'HTTPリクエストメソッドのうち、データを送信するために使うものはどれですか？', 'POST', 'GET', 'DELETE', 'POSTリクエストはサーバーにデータを送信するために使用されます。', TRUE, 1, 5, 3),
(74, 'HTMLフォームでサーバーに送信されるデータを指定する属性は何ですか？', 'action', 'method', 'type', 'action属性はデータ送信先のURLを指定します。', TRUE, 2, 5, 3),
(75, 'JavaScriptでイベントハンドラーを登録するメソッドはどれですか？', 'addEventListener', 'onEvent', 'bindEvent', 'addEventListenerはイベントを監視するためのメソッドです。', TRUE, 2, 5, 3),
(81, '分散データベースにおいて整合性を保証するための仕組みは何ですか？', 'トランザクション', 'キャッシュ', '負荷分散', 'トランザクションはデータの整合性を保証します。', TRUE, 2, 5, 4),
(82, 'アーキテクチャ設計でスケーラビリティを向上させる方法は何ですか？', '水平スケーリング', '垂直スケーリング', 'メモリ増設', '水平スケーリングはスケーラビリティ向上に有効です。', TRUE, 1, 5, 4),
(83, 'マイクロサービスにおいてサービス間の通信を管理するツールはどれですか？', 'Service Mesh', 'Load Balancer', 'Redis', 'Service Meshはサービス間通信の管理に用いられます。', TRUE, 2, 5, 4),
(84, 'データをレプリケートする目的は何ですか？', '可用性向上', '応答時間短縮', 'データの暗号化', 'レプリケーションは可用性を向上させます。', TRUE, 1, 5, 4),
(85, 'RESTアーキテクチャの特徴は何ですか？', 'ステートレス通信', 'セッション管理必須', 'トランザクション管理', 'RESTはステートレス通信を特徴とします。', TRUE, 1, 5, 4),
(91, '公開鍵暗号方式で送信者が使用する鍵は何ですか？', '受信者の公開鍵', '受信者の秘密鍵', '送信者の公開鍵', '受信者の公開鍵を使用して暗号化します。', TRUE, 2, 5, 5),
(92, 'SSL証明書を提供する機関は何と呼ばれますか？', '認証局 (CA)', 'データベース', 'セッションマネージャ', '認証局はSSL証明書を発行します。', TRUE, 1, 5, 5),
(93, 'サイバー攻撃の一種であるDoS攻撃の目的は何ですか？', 'サービスの停止', 'データの暗号化', '情報の窃取', 'DoS攻撃はサービスを停止させることを目的とします。', TRUE, 2, 5, 5),
(94, 'パスワード管理に推奨される方法はどれですか？', 'ハッシュ化とソルト付加', '平文で保存', '暗号化なし', 'ハッシュ化とソルト付加はセキュリティを向上させます。', TRUE, 2, 5, 5),
(95, 'セキュリティにおける「ゼロトラスト」とは何ですか？', '全てのリソースにアクセスを検証するモデル', '暗号化を行わないモデル', 'すべてを信頼するモデル', 'ゼロトラストは信頼せず、常に検証するモデルです。', TRUE, 2, 5, 5),
(101, 'ネットワークの帯域幅を測定するツールはどれですか？', 'iperf', 'curl', 'wget', 'iperfはネットワーク帯域幅を測定するために使用されます。', TRUE, 1, 5, 1),
(102, 'DNSで名前解決に失敗した場合のエラーコードは何ですか？', 'NXDOMAIN', 'SERVFAIL', 'REFUSED', 'NXDOMAINは名前解決が失敗した場合に表示されるエラーです。', TRUE, 1, 5, 1),
(103, '仮想化技術の一つであるKVMは何の略ですか？', 'Kernel-based Virtual Machine', 'Key Virtual Manager', 'Kernel Virtual Memory', 'KVMはLinuxで動作する仮想化基盤です。', TRUE, 2, 5, 1),
(104, 'Linuxシステムのログを確認するコマンドはどれですか？', 'journalctl', 'ls', 'top', 'journalctlはLinuxシステムのログを表示します。', TRUE, 2, 5, 1),
(105, '負荷分散を実現するプロキシサーバとしてよく使われるツールはどれですか？', 'Nginx', 'Apache', 'Tomcat', 'Nginxは軽量で高性能なプロキシサーバです。', TRUE, 1, 5, 1),
(111, 'Pythonでリストの要素数を取得する関数はどれですか？', 'len', 'size', 'count', 'lenはPythonでリストの要素数を取得します。', TRUE, 1, 5, 2),
(112, 'JavaScriptでオブジェクトのプロパティを列挙するメソッドはどれですか？', 'Object.keys', 'Object.values', 'Object.entries', 'Object.keysはオブジェクトのすべてのキーを取得します。', TRUE, 1, 5, 2),
(113, 'C++で標準入出力を操作するライブラリはどれですか？', 'iostream', 'fstream', 'sstream', 'iostreamは標準入力・出力を操作するために使用されます。', TRUE, 1, 5, 2),
(114, 'Rubyで配列をソートするメソッドは何ですか？', 'sort', 'filter', 'map', 'sortはRubyで配列を昇順に並び替えます。', TRUE, 1, 5, 2),
(115, 'Go言語で型安全なコレクションを作るために使用される構造はどれですか？', 'スライス', 'マップ', 'リスト', 'スライスは動的な配列を表現します。', TRUE, 2, 5, 2),
(121, 'HTMLで画像を表示するタグはどれですか？', 'img', 'image', 'src', '<img>タグは画像を表示するために使用されます。', TRUE, 1, 5, 3),
(122, 'CSSでボックスの余白を設定するプロパティは何ですか？', 'margin', 'padding', 'border', 'marginはボックスの外側の余白を設定します。', TRUE, 1, 5, 3),
(123, 'JavaScriptで配列の要素を検索するメソッドはどれですか？', 'find', 'filter', 'map', 'findは条件に一致する最初の要素を返します。', TRUE, 2, 5, 3),
(124, 'HTTPリクエストのヘッダーに含まれる認証情報の形式は何ですか？', 'Authorization', 'Authentication', 'Token', 'Authorizationヘッダーは認証情報を含みます。', TRUE, 2, 5, 3),
(125, 'Webサーバとデータベースの間でデータを転送するために用いられる形式は何ですか？', 'JSON', 'XML', 'CSV', 'JSONは軽量なデータ転送形式として使用されます。', TRUE, 2, 5, 3),
(131, 'マイクロサービスアーキテクチャの主な利点は何ですか？', '開発・デプロイの独立性', 'データの一元管理', 'コードの簡素化', 'マイクロサービスは各サービスが独立して開発・デプロイ可能です。', TRUE, 2, 5, 4),
(132, 'サービス指向アーキテクチャ (SOA) の特徴は何ですか？', '再利用可能なサービスの統合', 'クライアントとサーバーの直接通信', 'スタンドアロンアプリケーションの開発', 'SOAは再利用可能なサービスを統合して構築されます。', TRUE, 2, 5, 4),
(133, 'コンテナ技術を利用する主な目的は何ですか？', 'アプリケーションの移植性向上', 'データベースの高速化', 'サーバーのスケーリング', 'コンテナ技術は移植性を向上させます。', TRUE, 1, 5, 4),
(134, 'モノリシックアーキテクチャの課題は何ですか？', 'スケーラビリティの制約', 'セキュリティの向上', '簡易なデプロイ', 'モノリシックアーキテクチャはスケーラビリティに制約があります。', TRUE, 2, 5, 4),
(135, 'DevOpsの文化において重視されるのは何ですか？', '継続的な改善と自動化', '権限の分散', 'ドキュメント作成の削減', 'DevOpsは継続的な改善と自動化を重視します。', TRUE, 1, 5, 4),
(141, 'フィッシング攻撃を防ぐために最も有効な方法は何ですか？', 'メールの送信者を確認する', '暗号化されたデータを使用する', '二要素認証を無効にする', '送信者を確認することでフィッシング攻撃を防ぐことができます。', TRUE, 1, 5, 5),
(142, 'SQLインジェクション攻撃の対策として適切な方法は何ですか？', 'パラメータ化クエリを使用する', 'ユーザー入力をそのまま実行する', 'SQLのバージョンを更新する', 'パラメータ化クエリはSQLインジェクションを防ぎます。', TRUE, 2, 5, 5),
(143, 'パスワードの安全性を高めるために推奨される方法は何ですか？', '複雑で長いパスワードを使用する', '同じパスワードを使い回す', '辞書に載っている単語を使う', '複雑で長いパスワードは安全性を高めます。', TRUE, 1, 5, 5),
(144, 'ネットワークを監視して異常を検知するシステムは何ですか？', 'IDS (侵入検知システム)', 'IPS (侵入防止システム)', 'DLP (データ漏洩防止)', 'IDSはネットワークの異常を検知するために使用されます。', TRUE, 1, 5, 5),
(145, 'ゼロデイ攻撃とは何ですか？', '脆弱性が公開される前に行われる攻撃', '既存のセキュリティパッチを利用した攻撃', '古いソフトウェアを狙った攻撃', 'ゼロデイ攻撃は未公開の脆弱性を利用します。', TRUE, 2, 5, 5),
(146, 'HTTPSがHTTPより安全である理由は何ですか？', '通信が暗号化されるため', 'リクエスト速度が速いため', 'サーバー側の設定が簡単なため', 'HTTPSはSSL/TLSによる暗号化で通信を保護します。', TRUE, 1, 5, 5),
(147, 'ファイアウォールの主な役割は何ですか？', 'ネットワークのトラフィックを制御する', 'データベースのパフォーマンスを向上させる', 'データを圧縮して転送する', 'ファイアウォールはトラフィックを制御します。', TRUE, 1, 5, 5),
(148, 'マルウェアの感染を防ぐための推奨される行動は何ですか？', '信頼できないソフトウェアをインストールしない', 'すべてのファイルを実行する', 'ウイルススキャンを無効にする', '不明なソフトウェアを避けることで感染を防げます。', TRUE, 2, 5, 5),
(149, '多要素認証の一例として適切なものは何ですか？', 'パスワードと指紋認証の組み合わせ', '単一のパスワードの使用', '静的なIPアドレスの使用', '多要素認証は複数の要素を組み合わせて認証を強化します。', TRUE, 1, 5, 5),
(150, 'セキュリティにおいて脆弱性スキャンを実施する目的は何ですか？', 'システムの弱点を特定する', 'ネットワーク速度を向上させる', '暗号化アルゴリズムを最適化する', '脆弱性スキャンはシステムの弱点を特定するために行われます。', TRUE, 1, 5, 5);





-- 疎通確認用
-- CREATE TABLE IF NOT EXISTS item (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL
-- );

-- INSERT INTO item (name) VALUES ('Item 1'), ('Item 2'), ('Item 3');
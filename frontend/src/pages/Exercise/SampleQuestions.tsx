type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  questionimage: string;
  explanationimage: string;
  category: string;
  step: number | string;
  difficulty: string;
};

export const questions: Question[] = [
  // {
  //   "id": 1,
  //   "question": "コンピュータのCPUの役割は何ですか？",
  //   "options": ["データの保存", "データの処理", "インターネット接続"],
  //   "answer": "データの処理",
  //   "explanation": "CPU（中央処理装置）はコンピュータの脳のような役割を果たし、計算やデータ処理を行います。",
  //   "questionimage": "",
  //   "explanationimage": "",
  //   "category": "コンピュータ",
  //   "step": 2,
  //   "difficulty": "易しい"
  // },
  // {
  //   "id": 2,
  //   "question": "インターネットで使われるIPアドレスとは何ですか？",
  //   "options": ["インターネットプロバイダの名前", "コンピュータの一意の識別番号", "ウェブサイトの名前"],
  //   "answer": "コンピュータの一意の識別番号",
  //   "explanation": "IPアドレスはインターネット上でコンピュータやデバイスを識別するための一意の番号です。",
  //   "questionimage": "",
  //   "explanationimage": "",
  //   "category": "ネットワーク",
  //   "step": 1,
  //   "difficulty": "易しい"
  // },
  // {
  //   "id": 3,
  //   "question": "HTMLとは何の略ですか？",
  //   "options": ["HyperText Markup Language", "Hyperlink Text Markup Language", "HomeText Markup Language"],
  //   "answer": "HyperText Markup Language",
  //   "explanation": "HTMLはウェブページを作成するためのマークアップ言語で、文書に構造を与えます。",
  //   "questionimage": "",
  //   "explanationimage": "",
  //   "category": "プログラミング",
  //   "step": 300,
  //   "difficulty": "易しい"
  // },
  // {
  //   "id": 4,
  //   "question": "WindowsとMac OSの違いは何ですか？",
  //   "options": ["OSのインターフェース", "OSの価格", "OSの開発元"],
  //   "answer": "OSの開発元",
  //   "explanation": "WindowsはMicrosoft、Mac OSはAppleによって開発されたオペレーティングシステムです。",
  //   "questionimage": "",
  //   "explanationimage": "",
  //   "category": "オペレーティングシステム",
  //   "step": 249,
  //   "difficulty": "易しい"
  // },
  // {
  //   "id": 5,
  //   "question": "プログラミング言語「Python」の特徴は何ですか？",
  //   "options": ["静的型付け", "簡潔で読みやすいコード", "コンパイルが必要"],
  //   "answer": "簡潔で読みやすいコード",
  //   "explanation": "Pythonは簡潔で直感的なコードを書けることで有名なプログラミング言語です。",
  //   "questionimage": "",
  //   "explanationimage": "",
  //   "category": "プログラミング",
  //   "step": 11,
  //   "difficulty": "易しい"
  // },
  {
    id: 6,
    question: "HTMLの「<h1>」タグは何のために使いますか？",
    options: ["リンクを作る", "見出しを作る", "画像を表示する"],
    answer: "見出しを作る",
    explanation: "「<h1>」タグは、最も重要な見出しを定義するために使われます。",
    questionimage: "",
    explanationimage: "",
    category: "ウェブデザイン",
    step: 10,
    difficulty: "易しい",
  },
  {
    id: 7,
    question: "Wi-Fiは何の略ですか？",
    options: ["Wireless Fidelity", "Web Fidelity", "Wide Frequency Interface"],
    answer: "Wireless Fidelity",
    explanation:
      "Wi-Fiは、無線通信を意味する「Wireless Fidelity」の略で、インターネット接続に使われます。",
    questionimage: "",
    explanationimage: "",
    category: "ネットワーク",
    step: "",
    difficulty: "普通",
  },
  {
    id: 8,
    question: "Linuxはどのような種類のソフトウェアですか？",
    options: [
      "オペレーティングシステム",
      "アプリケーションソフト",
      "プログラミング言語",
    ],
    answer: "オペレーティングシステム",
    explanation:
      "Linuxはオープンソースのオペレーティングシステムで、サーバーやパソコンに広く使われています。",
    questionimage: "",
    explanationimage: "",
    category: "オペレーティングシステム",
    step: 2,
    difficulty: "易しい",
  },
  {
    id: 9,
    question: "「URL」とは何の略ですか？",
    options: [
      "Uniform Resource Locator",
      "Universal Resource Locator",
      "Universal Remote Locator",
    ],
    answer: "Uniform Resource Locator",
    explanation:
      "URLはウェブ上のリソースのアドレスを指し、Uniform Resource Locatorの略です。",
    questionimage: "",
    explanationimage: "",
    category: "インターネット",
    step: 50,
    difficulty: "易しい",
  },
  {
    id: 10,
    question: "データベース管理システム（DBMS）とは何ですか？",
    options: [
      "データの保存と管理を行うソフトウェア",
      "ウェブページを作成するソフトウェア",
      "コンピュータのパフォーマンスを最適化するツール",
    ],
    answer: "データの保存と管理を行うソフトウェア",
    explanation:
      "DBMSは、データの保存、管理、検索、更新などを効率的に行うためのシステムです。",
    questionimage: "",
    explanationimage: "",
    category: "データベース",
    step: "",
    difficulty: "易しい",
  },
  {
    id: 11,
    question: "インターネットの「HTTP」とは何の略ですか？",
    options: [
      "HyperText Transfer Protocol",
      "HyperText Translation Protocol",
      "HyperTool Transfer Protocol",
    ],
    answer: "HyperText Transfer Protocol",
    explanation:
      "HTTPはウェブブラウザとウェブサーバー間で情報を転送するための通信プロトコルです。",
    questionimage: "",
    explanationimage: "",
    category: "ネットワーク",
    step: 89,
    difficulty: "易しい",
  },
  {
    id: 12,
    question: "バイナリコードとは何ですか？",
    options: ["0と1の組み合わせ", "文字コード", "画像ファイルの圧縮形式"],
    answer: "0と1の組み合わせ",
    explanation:
      "バイナリコードは、コンピュータがデータを扱うために使用する0と1から成るコードです。",
    questionimage: "",
    explanationimage: "",
    category: "プログラミング",
    step: "",
    difficulty: "易しい",
  },
  {
    id: 13,
    question: "「クラウドコンピューティング」とは何ですか？",
    options: [
      "ローカルでデータを保存すること",
      "インターネットを通じてコンピュータ資源を利用すること",
      "コンピュータに直接接続されたストレージデバイスを使うこと",
    ],
    answer: "インターネットを通じてコンピュータ資源を利用すること",
    explanation:
      "クラウドコンピューティングは、インターネットを通じてデータやアプリケーションを利用する仕組みです。",
    questionimage: "",
    explanationimage: "",
    category: "ネットワーク",
    step: "",
    difficulty: "易しい",
  },
  {
    id: 14,
    question: "「RAM」とは何の略ですか？",
    options: [
      "Read Access Memory",
      "Random Access Memory",
      "Rapid Access Memory",
    ],
    answer: "Random Access Memory",
    explanation:
      "RAMはコンピュータのメモリの一種で、データをランダムに読み書きできるため、この名前が付けられました。",
    questionimage: "",
    explanationimage: "",
    category: "ハードウェア",
    step: 6,
    difficulty: "易しい",
  },
  {
    id: 15,
    question: "サーバーとはどんな役割を果たしますか？",
    options: [
      "データを保存して提供する",
      "ユーザーが操作するための端末",
      "コンピュータの処理能力を高める",
    ],
    answer: "データを保存して提供する",
    explanation:
      "サーバーは、ネットワーク上でデータやサービスを提供するコンピュータシステムです。",
    questionimage: "",
    explanationimage: "",
    category: "ネットワーク",
    step: 33,
    difficulty: "普通",
  },
];

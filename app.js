// これは基本的なExpressサーバーのセットアップです。
// アプリケーションを構築する際に、ルーティングやミドルウェアをここに追加してください。

// Expressライブラリをインポート
const express = require('express');
const path = require('path');

// Expressアプリケーションを初期化
const app = express();
const port = 3000;  // ポート番号を固定で3000に指定

// EJSテンプレートエンジンを設定
app.set('view engine', 'ejs');

// 公開フォルダを指定して静的ファイルを提供
app.use(express.static(path.join(__dirname, 'public')));

// ルーティングを追加する場所
// 例: app.get('/', (req, res) => { res.render('index'); });





// サーバーを起動
app.listen(port, () => {
    console.log(`サーバーが起動しました: http://localhost:${port}`);
});


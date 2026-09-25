# Portfolio

上嶋勇己のポートフォリオサイトです。

## 開発環境

- Node.js: 16.15.1
- Sass

初回セットアップ:

```sh
nvm install 16.15.1
cd assets
nvm use 16.15.1
npm install
```

Sassの監視・コンパイル:

```sh
cd assets
nvm use 16.15.1
npm run sass
```

## 公開環境

本番サイトはVercelで公開し、GitHubの `main` ブランチへの変更を自動デプロイする方針です。

## ドキュメント

- [要件定義書](./REQUIREMENTS.md)

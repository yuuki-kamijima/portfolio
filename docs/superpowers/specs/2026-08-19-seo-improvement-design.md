# ポートフォリオサイト SEO 改善 設計書

作成日: 2026-08-19

## 1. 目的

ポートフォリオサイト（https://www.yuuki-kamijima.site/）の検索流入を増やす。
狙いは次の2つを両立させることとする。

- **地域＋サービス検索**: 「長野 ホームページ制作」「長野 Webデザイン」などで新規の問い合わせにつなげる
- **指名検索**: 「上嶋勇己」で確実に上位表示し、名刺やSNSからの訪問者に情報を正しく届ける

## 2. 現状

### すでに満たしているもの

- 全4ページに `title` / `description` / `canonical` を設定済み
- `robots.txt` と `sitemap.xml` を配置済み
- `<html lang="ja">` を指定済み
- 全 `img` に `alt` を付与済み
- デモページ（`demo/`、`demo_about.html`、`works_hero_demo.html`）に `noindex,nofollow` を設定済み
- `/index.html` から `/` への 301 リダイレクトを `vercel.json` に設定済み

### 不足しているもの

| 項目 | 現状 |
| --- | --- |
| OGP / Twitter Card | 全ページ未設定。SNS共有時にタイトルも画像も表示されない |
| 構造化データ（JSON-LD） | 全ページ未設定 |
| 画像の容量 | PNG/JPEG 合計約20MB。最大は `about.png` の 2.3MB |
| 画像の遅延読み込み | `loading` 属性なし |
| 画像の寸法指定 | `width` / `height` 属性なし。レイアウトシフト（CLS）の原因 |
| `contact.html` の `h1` | 存在せず `h2` から始まっている |
| ファビコン | 未設定 |
| `sitemap.xml` の `lastmod` | なし |

## 3. 方針

### 3.1 メタ情報の拡充

全4ページに次を追加する。

- OGP: `og:type` / `og:title` / `og:description` / `og:url` / `og:image` / `og:image:width` / `og:image:height` / `og:image:alt` / `og:site_name` / `og:locale`
- Twitter Card: `twitter:card`（`summary_large_image`）/ `twitter:title` / `twitter:description` / `twitter:image`
- ファビコン: SVG のモノグラム（`YK`）と `apple-touch-icon`
- `theme-color`

OGP 画像は 1200×630 の `assets/img/ogp.jpg` を新規に生成する。

### 3.2 構造化データ（JSON-LD）

事業情報は**長野県までの `areaServed`** に留め、番地・電話番号は記載しない。連絡手段は問い合わせフォームと SNS のみとする。

| ページ | スキーマ |
| --- | --- |
| `index.html` | `WebSite` + `Person` + `ProfessionalService` |
| `about.html` | `ProfilePage` + `Person`（`knowsAbout`、`sameAs`）+ `BreadcrumbList` |
| `works.html` | `CollectionPage` + `ItemList`（実績7件）+ `BreadcrumbList` |
| `contact.html` | `ContactPage` + `BreadcrumbList` |

`Person` の `sameAs` には Instagram と LINE の URL を入れ、指名検索での同一人物判定を助ける。

### 3.3 キーワード最適化

デザインとレイアウトは変更しない。変更するのは次に限る。

- `index.html` の `title` を「長野県のホームページ制作・Webデザイン｜上嶋勇己」に変更し、地域・サービス・氏名を同居させる
- 各ページの `description` に地域キーワードを自然に含める
- `contact.html` の `<h2 class="section-title">Contact</h2>` を `h1` に変更する。CSS クラスは据え置くため見た目は変わらない

`index.html` の `h1`「Creative Designer.」は変更しない。視覚的に隠したキーワードの追加は Google のガイドラインに抵触するおそれがあるため行わない。

### 3.4 画像最適化

Core Web Vitals（LCP・CLS）の改善を目的とする。

- Python の Pillow で PNG / JPEG を WebP に変換する。**元ファイルは削除せず残す**
- `<img>` を `<picture>` に置き換え、WebP 非対応環境には元の PNG を返す
- 既存の `onerror` によるフォールバックは維持する
- 全画像に実寸の `width` / `height` を付与し、CLS を防ぐ
- ファーストビュー外の画像に `loading="lazy"` と `decoding="async"` を付与する

CSS の `background-image` で読み込んでいるヒーロー背景（`nagano-mountain.png` / `IMG_8299.jpeg` / `macbook.png`、合計約3.3MB）は、Sass のソース（`assets/sass/layouts/_hero.scss`）を編集して `image-set()` で WebP を優先させる。

```scss
background-image: url("../img/nagano-mountain.png");
background-image: image-set(
  url("../img/nagano-mountain.webp") type("image/webp"),
  url("../img/nagano-mountain.png") type("image/png")
);
```

`image-set()` に未対応のブラウザは2行目の宣言を無視し、1行目の PNG を読み込むため安全に後方互換となる。

### 3.5 sitemap.xml / robots.txt

- `sitemap.xml` の各 URL に `lastmod` を追加する
- **`robots.txt` にデモページの `Disallow` は追加しない**。`Disallow` するとクローラーが `noindex` を読み取れなくなり、かえってインデックスから削除されなくなるため、現状の `noindex` のみが正しい

## 4. 実施しないこと

- 既存のデザイン・アニメーション・レイアウトの変更
- ブログなど新規ページの追加
- キーワードの不自然な詰め込み
- 視覚的に隠したテキストの追加

## 5. 既知の副作用

`assets/css/common.css` は Sass の生成物である。今回 `_hero.scss` を編集して再コンパイルするため、インストール済みの Sass 1.79.5 と、既存 CSS を生成した旧バージョンとの差により、`header.header-capsule nav ul li a.active-link` のルールの**出力位置が変わる**。内容は同一で、競合するセレクタもないため表示への影響はない。

## 6. 受け入れ条件

- 全4ページで OGP・Twitter Card・JSON-LD が出力されていること
- JSON-LD が JSON として妥当で、`@type` が想定どおりであること
- `contact.html` に `h1` が1つ存在すること
- 参照している WebP ファイルがすべて実在すること
- 画像の総容量が削減されていること
- ブラウザで表示崩れがないこと

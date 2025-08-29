<p align="center">
  <a href="https://xmcl.app" target="_blank">
    <img alt="ロゴ" width="100" src="https://github.com/Voxelum/x-minecraft-launcher/blob/master/xmcl-electron-app/icons/dark@256x256.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Voxelum/x-minecraft-launcher">
    <img src="https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg" alt="ビルド">
  </a>
  <a href="https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@xmcl/core.svg" alt="ライセンス">
  </a>
  <a href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="コミット">
  </a>
  <br>
  <a href="https://discord.gg/W5XVwYY7GQ">
    <img src="https://discord.com/api/guilds/405213567118213121/widget.png" alt="Discord">
  </a>
  <a href="https://kook.top/gqjSHh">
    <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/kook-badge" alt="Kook">
  </a>
  <a href="https://afdian.com/@ci010">
    <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/afdian-badge" alt="afdian">
  </a>
  <a href="https://patreon.com/xmcl">
    <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dxmcl%26type%3Dpledges" alt="patreon">
  </a>
</p>

![ホーム](https://raw.githubusercontent.com/Voxelum/xmcl-page/master/.vitepress/theme/assets/home.png)

アプリケーションをダウンロードするには[公式サイト](https://xmcl.app)をご覧ください！

wingetがインストールされている場合は、wingetを使用してインストールできます

```bash
winget install CI010.XMinecraftLauncher
```

HomeBrew経由でのインストールもタップから可能です

```bash
brew tap voxelum/xmcl
brew install --cask --no-quarantine voxelum/xmcl
```

<kbd>[<img title="ウクライナ" alt="ウクライナ" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1280px-Flag_of_Ukraine.svg.png" width="22">](docs/README.uk.md)</kbd>
<kbd>[<img title="ロシア" alt="ロシア" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png" width="22">](docs/README.ru.md)</kbd>
<kbd>[<img title="ドイツ" alt="ドイツ" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" width="22">](docs/README.de.md)</kbd>
<kbd>[<img title="中国" alt="中国" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" width="22">](docs/README.zh.md)</kbd>
<kbd>[<img title="日本" alt="日本" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/2560px-Flag_of_Japan.svg.png" width="22">](docs/README.jp.md)</kbd>
<kbd>[<img title="ポーランド" alt="ポーランド" src="https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg" width="22">](docs/README.pl.md)</kbd>
<kbd>[<img title="カザフスタン" alt="カザフスタン" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="アラビア語" alt="アラビア語" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkolizej.at.ua%2F_pu%2F3%2F76583687.png&f=1&nofb=1&ipt=c6c2d418c48381f3f77a90574f99672f12cd72fe0ee90e89ade34438149f21aa" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="フランス" alt="フランス" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikiway.com%2Fupload%2Fiblock%2F01e%2F800px-Flag_of_France_svg.png&f=1&nofb=1&ipt=ae6be806c98ab47e579b51d1441309f588a41b9bc741c7aec15031f51aef0890" width="26">](docs/README.kz.md)</kbd>

## 特徴

- 📥 **ダウンロードと自動完了**。公式またはサードパーティのミラーから `Minecraft`、`Forge`、`Fabric`、`Quilt`、`OptiFine`、`JVM` のダウンロードをサポートします。
- ⚡️ **高速ダウンロード**。HTTP/HTTPSエージェントによるソケットの再利用と、ファイルを同時に複数部分でダウンロードします。
- 💻 **クロスプラットフォーム**。ランチャーはElectronベースであり、Windows 10/11、MacOS、Linuxをサポートします。
- 📚 **マルチインスタンス**。ユーザーは複数のインスタンスを作成して、異なるバージョン、MOD、起動設定を分離できます。
- 🗂 **すべてのリソースを管理**。インスタンスにリソースをインストールするためにハードリンクやシンボリックリンクを使用し、ディスク使用量を最適化します。MODをあちこちコピーしないで！ 😆
- 🔥 **CurseForge、Modrinthの内蔵対応**。ランチャー内でリソースをダウンロードできます。
- 📦 **インポート/エクスポートのサポート**。CurseForgeおよびModrinthのMODパックを準拠してインポート/エクスポートできます！
- 🔒 **複数のアカウントシステムのサポート**。組み込みのMicrosoftログインとMojang Yggdrasil API。また、[ely.by](https://ely.by/) と [littleskin.cn](https://littleskin.cn) の内蔵サポートもあります。サードパーティ認証サーバーを追加することも可能です！
- 🔗 **ユーザー間のピアツーピア接続**。同じ物理的なLANにいなくても、LAN越しのマルチプレイヤーでプレイできます！
- 🔑 **コード署名と現代的なパッケージング**。Windowsでは、`appx` と `appinstaller` を使用してアプリをインストールできます。ブラウザからのブロックメッセージやSmartScreenエラーが表示されなくなります！ 😎

## 貢献

[![DeepWikiに質問](https://deepwiki.com/badge.svg)](https://deepwiki.com/Voxelum/x-minecraft-launcher)

一般的な開発者の場合、[貢献ガイド](./CONTRIBUTING.md)をご確認ください。

国際化（i18n）ローカライズ開発者の場合、[ローカライズ開始ガイド](https://docs.xmcl.app/en/guide/i18n)に従ってください。

## ライセンス

[MIT](LICENSE)

## スポンサーシップ

| [![](https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66)](https://signpath.io/) | Windowsで無料のコード署名が提供される [SignPath.io](https://signpath.io/)、[SignPath Foundation](https://signpath.org/) によって証明書が提供されます。 |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| [![](https://deno.com/images/deno_logo_4.gif)](https://deno.com/deploy) | [Deno Deploy](https://deno.com/deploy)、XMCLはサーバーレスJavaScriptアプリケーションのための手間のかからないプラットフォームを利用しています。[Deno](https://deno.com/) が提供します。 |
| [![](assets/EdgeOne.png)](https://edgeone.ai/) | [アジア最大級のCDN、Edge、セキュリティソリューション - Tencent EdgeOne](https://edgeone.ai/)、このプロジェクトのCDN加速とセキュリティ保護はTencent EdgeOneによってスポンサーされました。 |

### スポンサー (AFDIAN)

<!-- afdian-start -->
<div style="display: flex; align-items: center; justify-items:center; gap: 0.2em; flex-wrap: wrap;">
<a title="愛発電ユーザー_9d663: ￥390.00" href="https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="愛発電ユーザー_19e29: ￥300.00" href="https://afdian.com/u/19e292c21a1d11ee929a52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="ahdg: ￥180.00" href="https://afdian.com/u/dd9058ce20df11eba5c052540025c377"> <img width="70" height="70" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg"> </a>
<a title="Kandk: ￥30.00" href="https://afdian.com/u/404b86a078e111ecab3652540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png"> </a>
<a title="白雨 楠: ￥30.00" href="https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg"> </a>
<a title="聖剣: ￥30.00" href="https://afdian.com/u/ef50bc78b3d911ecb85352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/user_upload_osl/8a1c4eb2e580b4b8b463ceb2114b6381_w132_h132_s3.jpeg"> </a>
<a title="同謀者: ￥30.00" href="https://afdian.com/u/7c3c65dc004a11eb9a6052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-blue.png"> </a>
<a title="染川瞳: ￥5.00" href="https://afdian.com/u/89b1218c86e011eaa4d152540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/89b1218c86e011eaa4d152540025c377/avatar/9bf08f81d231f3054c98f9e5c1c8ce40_w640_h640_s57.jpg"> </a>
<a title="愛発電ユーザー_CvQb: ￥5.00" href="https://afdian.com/u/177bea3cf47211ec990352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="水合: ￥5.00" href="https://afdian.com/u/039508f2b17d11ebad1052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-orange.png"> </a>
<a title="愛発電ユーザー_0c5c8: ￥5.00" href="https://afdian.com/u/0c5c865e08ee11ecba1352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="DIO: ￥5.00" href="https://afdian.com/u/7ac297b4722211eab4a752540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="愛発電ユーザー_DJpu: ￥5.00" href="https://afdian.com/u/8c23a236cf7311ec9c3452540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
</div>
<!-- afdian-end -->

## 謝辞

[BANER](https://github.com/BANSAFAn)、RU/UKコミュニティで多くの助けをくれました。

[GodLeaveMe](https://github.com/GodLeaveMe)、[v1mkss](https://github.com/v1mkss)、AURパッケージレジストリの維持をしてくれました。

[0xc0000142](https://github.com/0xc0000142)、wingetの維持をしてくれました。

[Marmur2020](https://github.com/Marmur2020) と [BANSAFAn](https://github.com/BANSAFAn)、ウクライナ語を完全に翻訳してくれました！

[vanja-san](https://github.com/vanja-san)、ロシア語を提供してくれました！

[lukechu10](https://github.com/lukechu10) と [HoldYourWaffle](https://github.com/HoldYourWaffle)、ランチャーのコア開発を手伝ってくれました。

[laolarou726](https://github.com/laolarou726)、ランチャーのデザインに多くの助けをくれました。

また、特別な感謝を

[Yricky](https://github.com/Yricky)、[Jin](https://github.com/Indexyz)、[LG](https://github.com/LasmGratel)、[Phoebe](https://github.com/PhoebezZ)、[Sumeng Wang](https://github.com/darkkingwsm)、[Luca](https://github.com/LucaIsGenius)、[Charles Tang](https://github.com/CharlesQT) に感謝します。
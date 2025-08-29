<p align="center">
  <a href="https://xmcl.app" target="_blank">
    <img alt="Logo" width="100" src="https://github.com/Voxelum/x-minecraft-launcher/blob/master/xmcl-electron-app/icons/dark@256x256.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Voxelum/x-minecraft-launcher">
    <img src="https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg" alt="构建">
  </a>
  <a href="https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@xmcl/core.svg" alt="许可证">
  </a>
  <a href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="提交">
  </a>
  <br>
  <a href="https://discord.gg/W5XVwYY7GQ">
    <img src="https://discord.com/api/guilds/405213567118213121/widget.png" alt="Discord">
  </a>
  <a href="https://kook.top/gqjSHh">
    <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/kook-badge" alt="Kook">
  </a>
  <a href="https://afdian.com/@ci010">
    <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/afdian-badge" alt="爱发电">
  </a>
  <a href="https://patreon.com/xmcl">
    <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dxmcl%26type%3Dpledges" alt="patreon">
  </a>
</p>

![主页](https://raw.githubusercontent.com/Voxelum/xmcl-page/master/.vitepress/theme/assets/home.png)

访问 [官方网站](https://xmcl.app) 下载应用程序！

如果你有 winget，可以使用 winget 安装

```bash
winget install CI010.XMinecraftLauncher
```

也可以通过 tap 使用 HomeBrew 安装

```bash
brew tap voxelum/xmcl
brew install --cask --no-quarantine voxelum/xmcl
```

<kbd>[<img title="乌克兰" alt="乌克兰" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1280px-Flag_of_Ukraine.svg.png" width="22">](docs/README.uk.md)</kbd>
<kbd>[<img title="俄罗斯" alt="俄罗斯" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png" width="22">](docs/README.ru.md)</kbd>
<kbd>[<img title="德国" alt="德国" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" width="22">](docs/README.de.md)</kbd>
<kbd>[<img title="中国" alt="中国" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" width="22">](docs/README.zh.md)</kbd>
<kbd>[<img title="日本" alt="日本" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/2560px-Flag_of_Japan.svg.png" width="22">](docs/README.jp.md)</kbd>
<kbd>[<img title="波兰" alt="波兰" src="https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg" width="22">](docs/README.pl.md)</kbd>
<kbd>[<img title="哈萨克斯坦" alt="哈萨克斯坦" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="阿拉伯语" alt="阿拉伯语" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkolizej.at.ua%2F_pu%2F3%2F76583687.png&f=1&nofb=1&ipt=c6c2d418c48381f3f77a90574f99672f12cd72fe0ee90e89ade34438149f21aa" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="法国" alt="法国" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikiway.com%2Fupload%2Fiblock%2F01e%2F800px-Flag_of_France_svg.png&f=1&nofb=1&ipt=ae6be806c98ab47e579b51d1441309f588a41b9bc741c7aec15031f51aef0890" width="26">](docs/README.kz.md)</kbd>

## 特性

- 📥 **下载和自动完成**。支持从官方或第三方镜像下载 `Minecraft`、`Forge`、`Fabric`、`Quilt`、`OptiFine`、`JVM`。
- ⚡️ **快速下载**。通过 HTTP/HTTPS 代理复用套接字，并并发分段下载文件。
- 💻 **跨平台**。该启动器基于 Electron 构建，支持 🗔 Windows 10/11、🍎 MacOS 和 🐧 Linux。
- 📚 **多实例**。用户可以创建多个实例来隔离不同版本、模组和启动设置。
- 🗂 **管理所有资源**。使用（硬链接/符号链接）在实例中安装资源，保持磁盘使用最优化。无需到处复制模组！😆
- 🔥 **内置 CurseForge、Modrinth 支持**。你可以在启动器内下载资源。
- 📦 **支持导入/导出** CurseForge 和 Modrinth 模组包，符合标准！
- 🔒 **支持多种账户系统**。内置 Microsoft 登录和 Mojang Yggdrasil API。还支持 [ely.by](https://ely.by/) 和 [littleskin.cn](https://littleskin.cn)。你也可以添加第三方认证服务器！
- 🔗 **用户之间的点对点连接**。即使不在同一物理局域网，也能通过 LAN 进行多人游戏！
- 🔑 **代码签名与现代打包**。在 Windows 上，你可以使用 `appx` 和 `appinstaller` 来安装应用程序。你不会再收到浏览器的阻止消息或看到 SmartScreen 错误！😎

## 贡献

[![询问 DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Voxelum/x-minecraft-launcher)

对于一般开发者，请参阅 [贡献指南](./CONTRIBUTING.md)

对于本地化开发者，请遵循 [本地化入门指南](https://docs.xmcl.app/en/guide/i18n)

## 许可证

[MIT](LICENSE)

## 赞助

| [![](https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66)](https://signpath.io/) | Windows 上免费的代码签名由 [SignPath.io](https://signpath.io/) 提供，证书由 [SignPath Foundation](https://signpath.org/) 颁发 |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| [![](https://deno.com/images/deno_logo_4.gif)](https://deno.com/deploy) | [Deno Deploy](https://deno.com/deploy)，XMCL 利用其无烦恼的平台来运行无服务器 JavaScript 应用程序。由 [Deno](https://deno.com/) 提供 |
| [![](assets/EdgeOne.png)](https://edgeone.ai/) | [最佳亚洲 CDN、边缘和安全解决方案 - 腾讯 EdgeOne](https://edgeone.ai/)，该项目的 CDN 加速和安全保护由腾讯 EdgeOne 赞助。 |

### 赞助商（爱发电）

<!-- afdian-start -->
<div style="display: flex; align-items: center; justify-items:center; gap: 0.2em; flex-wrap: wrap;">
<a title="爱发电用户_9d663: ￥390.00" href="https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="爱发电用户_19e29: ￥300.00" href="https://afdian.com/u/19e292c21a1d11ee929a52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="ahdg: ￥180.00" href="https://afdian.com/u/dd9058ce20df11eba5c052540025c377"> <img width="70" height="70" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg"> </a>
<a title="Kandk: ￥30.00" href="https://afdian.com/u/404b86a078e111ecab3652540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png"> </a>
<a title="白雨 楠: ￥30.00" href="https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg"> </a>
<a title="圣剑: ￥30.00" href="https://afdian.com/u/ef50bc78b3d911ecb85352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/user_upload_osl/8a1c4eb2e580b4b8b463ceb2114b6381_w132_h132_s3.jpeg"> </a>
<a title="同谋者: ￥30.00" href="https://afdian.com/u/7c3c65dc004a11eb9a6052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-blue.png"> </a>
<a title="染川瞳: ￥5.00" href="https://afdian.com/u/89b1218c86e011eaa4d152540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/89b1218c86e011eaa4d152540025c377/avatar/9bf08f81d231f3054c98f9e5c1c8ce40_w640_h640_s57.jpg"> </a>
<a title="爱发电用户_CvQb: ￥5.00" href="https://afdian.com/u/177bea3cf47211ec990352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="水合: ￥5.00" href="https://afdian.com/u/039508f2b17d11ebad1052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-orange.png"> </a>
<a title="爱发电用户_0c5c8: ￥5.00" href="https://afdian.com/u/0c5c865e08ee11ecba1352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="DIO: ￥5.00" href="https://afdian.com/u/7ac297b4722211eab4a752540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="爱发电用户_DJpu: ￥5.00" href="https://afdian.com/u/8c23a236cf7311ec9c3452540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
</div>
<!-- afdian-end -->

## 致谢

[BANER](https://github.com/BANSAFAn)，他在俄语/乌克兰社区给予了我很多帮助。

[GodLeaveMe](https://github.com/GodLeaveMe)、[v1mkss](https://github.com/v1mkss)，维护 AUR 包注册表。

[0xc0000142](https://github.com/0xc0000142)，维护 winget。

[Marmur2020](https://github.com/Marmur2020) & [BANSAFAn](https://github.com/BANSAFAn)，完整翻译了乌克兰语！

[vanja-san](https://github.com/vanja-san)，提供了俄语！

[lukechu10](https://github.com/lukechu10) & [HoldYourWaffle](https://github.com/HoldYourWaffle) 帮助我开发启动器核心。

[laolarou726](https://github.com/laolarou726)，在启动器设计方面给予了我很多帮助。

此外，特别感谢

[Yricky](https://github.com/Yricky)、[Jin](https://github.com/Indexyz)、[LG](https://github.com/LasmGratel)、[Phoebe](https://github.com/PhoebezZ)、[Sumeng Wang](https://github.com/darkkingwsm)、[Luca](https://github.com/LucaIsGenius)、[Charles Tang](https://github.com/CharlesQT)
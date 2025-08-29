<p align="center">
  <a href="https://xmcl.app" target="_blank">
    <img alt="الشعار" width="100" src="https://github.com/Voxelum/x-minecraft-launcher/blob/master/xmcl-electron-app/icons/dark@256x256.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Voxelum/x-minecraft-launcher">
    <img src="https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg" alt="بناء">
  </a>
  <a href="https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@xmcl/core.svg" alt="رخصة">
  </a>
  <a href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/الالتزامات التقليدية-1.0.0-yellow.svg" alt="التزام">
  </a>
  <br>
  <a href="https://discord.gg/W5XVwYY7GQ">
    <img src="https://discord.com/api/guilds/405213567118213121/widget.png" alt="ديسكورد">
  </a>
  <a href="https://kook.top/gqjSHh">
    <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/kook-badge" alt="كوك">
  </a>
  <a href="https://afdian.com/@ci010">
    <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/afdian-badge" alt="afdian">
  </a>
  <a href="https://patreon.com/xmcl">
    <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dxmcl%26type%3Dpledges" alt="patreon">
  </a>
</p>

![الرئيسية](https://raw.githubusercontent.com/Voxelum/xmcl-page/master/.vitepress/theme/assets/home.png)

قم بزيارة [الموقع الرسمي](https://xmcl.app) لتنزيل التطبيق!

إذا كنت تستخدم winget، يمكنك استخدامه لتثبيت التطبيق

```bash
winget install CI010.XMinecraftLauncher
```

تتوفر أيضًا تثبيت عبر HomeBrew من خلال tap

```bash
brew tap voxelum/xmcl
brew install --cask --no-quarantine voxelum/xmcl
```

<kbd>[<img title="أوكرانيا" alt="أوكرانيا" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1280px-Flag_of_Ukraine.svg.png" width="22">](docs/README.uk.md)</kbd>
<kbd>[<img title="روسيا" alt="روسيا" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png" width="22">](docs/README.ru.md)</kbd>
<kbd>[<img title="ألمانيا" alt="ألمانيا" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" width="22">](docs/README.de.md)</kbd>
<kbd>[<img title="الصين" alt="الصين" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" width="22">](docs/README.zh.md)</kbd>
<kbd>[<img title="اليابان" alt="اليابان" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/2560px-Flag_of_Japan.svg.png" width="22">](docs/README.jp.md)</kbd>
<kbd>[<img title="بولندا" alt="بولندا" src="https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg" width="22">](docs/README.pl.md)</kbd>
<kbd>[<img title="كازاخستان" alt="كازاخستان" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="العربية" alt="العربية" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkolizej.at.ua%2F_pu%2F3%2F76583687.png&f=1&nofb=1&ipt=c6c2d418c48381f3f77a90574f99672f12cd72fe0ee90e89ade34438149f21aa" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="فرنسا" alt="فرنسا" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikiway.com%2Fupload%2Fiblock%2F01e%2F800px-Flag_of_France_svg.png&f=1&nofb=1&ipt=ae6be806c98ab47e579b51d1441309f588a41b9bc741c7aec15031f51aef0890" width="26">](docs/README.kz.md)</kbd>

## الميزات

- 📥 **تحميل وتكملة تلقائية**. يدعم تحميل `Minecraft`, `Forge`, `Fabric`, `Quilt`, `OptiFine`, `JVM` من مصادر رسمية أو ثالثة.
- ⚡️ **تحميل سريع**. إعادة استخدام المقبس عبر عناصر HTTP/HTTPS، وتحميل الملفات بشكل متوازي.
- 💻 **متعدد المنصات**. يعتمد اللانشر على Electron، ويدعم 🗔 Windows 10/11، 🍎 MacOS، و 🐧 Linux.
- 📚 **متعدد النسخ**. يمكن للمستخدمين إنشاء نسخ متعددة لعزل الإصدارات المختلفة والمواد والإعدادات.
- 🗂 **إدارة جميع الموارد**. استخدم الروابط الصلبة/الرمزية لتثبيت الموارد في النسخ، واحتفظ باستخدام القرص الأمثل. لا توجد نسخ من المواد في كل مكان! 😆
- 🔥 **دعم داخلي لـ CurseForge, Modrinth**. يمكنك تنزيل الموارد داخل اللانشر.
- 📦 **دعم الاستيراد/التصدير**. يدعم استيراد وتصدير حزم المواد من CurseForge و Modrinth مع الامتثال!
- 🔒 **دعم أنظمة الحسابات المتعددة**. تسجيل الدخول الداخلي لـ Microsoft وواجهة برمجة تطبيقات Mojang Yggdrasil. كما يحتوي على دعم داخلي لـ [ely.by](https://ely.by/) و [littleskin.cn](https://littleskin.cn). يمكنك أيضًا إضافة خوادم المصادقة الخارجية!
- 🔗 **اتصال بين المستخدمين عبر شبكة P2P**. يمكنك لعب اللعبة متعددة اللاعبين عبر الشبكة المحلية حتى لو لم تكن في نفس الشبكة المحلية الفيزيائية!
- 🔑 **توقيع الكود وتعبئة حديثة**. تحت نظام Windows، يمكنك استخدام `appx` و `appinstaller` لتثبيت التطبيق. لن تتلقى رسائل الحظر من المتصفح أو ترى أخطاء SmartScreen بعد الآن! 😎

## المساهمة

[![اطلب من DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Voxelum/x-minecraft-launcher)

للمطورين العاديين، انظر [المساهمة](./CONTRIBUTING.md)

للمطورين المختصين بالترجمة، يرجى اتباع [بدء العمل مع الترجمة](https://docs.xmcl.app/en/guide/i18n)

## الرخصة

[MIT](LICENSE)

## الرعاية

| [![](https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66)](https://signpath.io/) | توقيع الكود المجاني على Windows مقدم من [SignPath.io](https://signpath.io/)، الشهادة من [Foundation SignPath](https://signpath.org/) |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| [![](https://deno.com/images/deno_logo_4.gif)](https://deno.com/deploy) | [Deno Deploy](https://deno.com/deploy)، يستخدم XMCL منصة دون مجهود لتطبيقات JavaScript الخالية من الخادم. مقدم من [Deno](https://deno.com/) |
| [![](assets/EdgeOne.png)](https://edgeone.ai/) | [أفضل CDN آسيوي، Edge، وحلول أمنية - Tencent EdgeOne](https://edgeone.ai/)، تسريع CDN وحماية الأمن لهذا المشروع مدعوم من Tencent EdgeOne. |

### الراعي (AFDIAN)

<!-- afdian-start -->
<div style="display: flex; align-items: center; justify-items:center; gap: 0.2em; flex-wrap: wrap;">
<a title="مستخدم爱发电_9d663: ￥390.00" href="https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="مستخدم爱发电_19e29: ￥300.00" href="https://afdian.com/u/19e292c21a1d11ee929a52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="ahdg: ￥180.00" href="https://afdian.com/u/dd9058ce20df11eba5c052540025c377"> <img width="70" height="70" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg"> </a>
<a title="Kandk: ￥30.00" href="https://afdian.com/u/404b86a078e111ecab3652540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png"> </a>
<a title="白雨 楠: ￥30.00" href="https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg"> </a>
<a title="圣剑: ￥30.00" href="https://afdian.com/u/ef50bc78b3d911ecb85352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/user_upload_osl/8a1c4eb2e580b4b8b463ceb2114b6381_w132_h132_s3.jpeg"> </a>
<a title="同谋者: ￥30.00" href="https://afdian.com/u/7c3c65dc004a11eb9a6052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-blue.png"> </a>
<a title="染川瞳: ￥5.00" href="https://afdian.com/u/89b1218c86e011eaa4d152540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/89b1218c86e011eaa4d152540025c377/avatar/9bf08f81d231f3054c98f9e5c1c8ce40_w640_h640_s57.jpg"> </a>
<a title="مستخدم爱发电_CvQb: ￥5.00" href="https://afdian.com/u/177bea3cf47211ec990352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="水合: ￥5.00" href="https://afdian.com/u/039508f2b17d11ebad1052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-orange.png"> </a>
<a title="مستخدم爱发电_0c5c8: ￥5.00" href="https://afdian.com/u/0c5c865e08ee11ecba1352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="DIO: ￥5.00" href="https://afdian.com/u/7ac297b4722211eab4a752540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="مستخدم爱发电_DJpu: ￥5.00" href="https://afdian.com/u/8c23a236cf7311ec9c3452540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
</div>
<!-- afdian-end -->

## الامتنان

[BANER](https://github.com/BANSAFAn)، الذي ساعدني كثيرًا في مجتمع RU/UK.

[GodLeaveMe](https://github.com/GodLeaveMe)، [v1mkss](https://github.com/v1mkss)، يحافظان على سجل حزم AUR.

[0xc0000142](https://github.com/0xc0000142)، يحافظ على winget.

[Marmur2020](https://github.com/Marmur2020) & [BANSAFAn](https://github.com/BANSAFAn)، قاموا بترجمة اللغة الأوكرانية بالكامل!

[vanja-san](https://github.com/vanja-san)، قدم اللغة الروسية!

[lukechu10](https://github.com/lukechu10) & [HoldYourWaffle](https://github.com/HoldYourWaffle) ساعدوني في نواة اللانشر.

[laolarou726](https://github.com/laolarou726)، الذي ساعد كثيرًا في تصميم اللانشر.

كما أن هناك شكرًا خاصًا لـ

[Yricky](https://github.com/Yricky)، [Jin](https://github.com/Indexyz)، [LG](https://github.com/LasmGratel)، [Phoebe](https://github.com/PhoebezZ)، [Sumeng Wang](https://github.com/darkkingwsm)، [Luca](https://github.com/LucaIsGenius)، [Charles Tang](https://github.com/CharlesQT)
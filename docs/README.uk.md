<p align="center">
  <a href="https://xmcl.app" target="_blank">
    <img alt="Логотип" width="100" src="https://github.com/Voxelum/x-minecraft-launcher/blob/master/xmcl-electron-app/icons/dark@256x256.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Voxelum/x-minecraft-launcher">
    <img src="https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg" alt="Збірка">
  </a>
  <a href="https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@xmcl/core.svg" alt="Ліцензія">
  </a>
  <a href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Коміт">
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

![головна](https://raw.githubusercontent.com/Voxelum/xmcl-page/master/.vitepress/theme/assets/home.png)

Відвідайте [офіційний сайт](https://xmcl.app) для завантаження програми!

Якщо у вас встановлено winget, ви можете скористатися ним для встановлення

```bash
winget install CI010.XMinecraftLauncher
```

Також доступне встановлення через HomeBrew за допомогою tap

```bash
brew tap voxelum/xmcl
brew install --cask --no-quarantine voxelum/xmcl
```

<kbd>[<img title="Україна" alt="Україна" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1280px-Flag_of_Ukraine.svg.png" width="22">](docs/README.uk.md)</kbd>
<kbd>[<img title="Росія" alt="Росія" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png" width="22">](docs/README.ru.md)</kbd>
<kbd>[<img title="Німеччина" alt="Німеччина" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" width="22">](docs/README.de.md)</kbd>
<kbd>[<img title="Китай" alt="Китай" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" width="22">](docs/README.zh.md)</kbd>
<kbd>[<img title="Японія" alt="Японія" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/2560px-Flag_of_Japan.svg.png" width="22">](docs/README.jp.md)</kbd>
<kbd>[<img title="Польща" alt="Польща" src="https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg" width="22">](docs/README.pl.md)</kbd>
<kbd>[<img title="Казахстан" alt="Казахстан" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="Арабська" alt="Арабська" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkolizej.at.ua%2F_pu%2F3%2F76583687.png&f=1&nofb=1&ipt=c6c2d418c48381f3f77a90574f99672f12cd72fe0ee90e89ade34438149f21aa" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="Франція" alt="Франція" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikiway.com%2Fupload%2Fiblock%2F01e%2F800px-Flag_of_France_svg.png&f=1&nofb=1&ipt=ae6be806c98ab47e579b51d1441309f588a41b9bc741c7aec15031f51aef0890" width="26">](docs/README.kz.md)</kbd>

## Особливості

- 📥 **Завантаження та автоматичне завершення**. Підтримує завантаження `Minecraft`, `Forge`, `Fabric`, `Quilt`, `OptiFine`, `JVM` з офіційних або сторонніх дзеркал.
- ⚡️ **Швидке завантаження**. Повторне використання сокетів через HTTP/HTTPS агенти, і завантаження файлів частинами одночасно.
- 💻 **Кроссплатформенність**. Лаунчер базується на Electron і підтримує 🗔 Windows 10/11, 🍎 MacOS та 🐧 Linux.
- 📚 **Мультиінстанси**. Користувачі можуть створювати кілька інстансів для ізоляції різних версій, модів та налаштувань запуску.
- 🗂 **Керування всіма ресурсами**. Використовуйте (жорсткі/символічні) посилання для встановлення ресурсів у інстансах, зберігаючи оптимальне використання диска. Без копій модів всюди! 😆
- 🔥 **Вбудована підтримка CurseForge, Modrinth**. Можна завантажувати ресурси всередині лаунчера.
- 📦 **Підтримка імпорту/експорту** CurseForge та Modrinth модпаків з дотриманням стандартів!
- 🔒 **Підтримка декількох систем облікових записів**. Вбудований вхід через Microsoft та Mojang Yggdrasil API. Також є вбудована підтримка [ely.by](https://ely.by/) та [littleskin.cn](https://littleskin.cn). Можна додавати сторонні сервери автентифікації!
- 🔗 **P2P з'єднання між користувачами**. Можна грати в мультиплеєр по LAN навіть якщо ви не знаходитесь в одній фізичній мережі!
- 🔑 **Підпис коду та сучасна упаковка**. Під Windows можна використовувати `appx` та `appinstaller` для встановлення програми. Ви більше не будете отримувати повідомлення про блокування від браузера або бачити помилки SmartScreen! 😎

## Внесок

[![Задати питання DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Voxelum/x-minecraft-launcher)

Для звичайних розробників, див. [Внесок](./CONTRIBUTING.md)

Для локалізаторів i18n, дотримуйтесь [Початку роботи з локалізацією](https://docs.xmcl.app/en/guide/i18n)

## ЛІЦЕНЗІЯ

[MIT](LICENSE)

## Спонсорство

| [![](https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66)](https://signpath.io/) | Безкоштовна підписка коду на Windows надана [SignPath.io](https://signpath.io/), сертифікат від [SignPath Foundation](https://signpath.org/) |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| [![](https://deno.com/images/deno_logo_4.gif)](https://deno.com/deploy) | [Deno Deploy](https://deno.com/deploy), XMCL використовує його безпроблемну платформу для серверних додатків JavaScript. Надано [Deno](https://deno.com/) |
| [![](assets/EdgeOne.png)](https://edgeone.ai/) | [Найкращий азіатський CDN, Edge та безпечні рішення - Tencent EdgeOne](https://edgeone.ai/), прискорення CDN та захист безпеки для цього проекту спонсують Tencent EdgeOne. |

### Спонсор (AFDIAN)

<!-- afdian-start -->
<div style="display: flex; align-items: center; justify-items:center; gap: 0.2em; flex-wrap: wrap;">
<a title="Користувач爱发电_9d663: ￥390.00" href="https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="Користувач爱发电_19e29: ￥300.00" href="https://afdian.com/u/19e292c21a1d11ee929a52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="ahdg: ￥180.00" href="https://afdian.com/u/dd9058ce20df11eba5c052540025c377"> <img width="70" height="70" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg"> </a>
<a title="Kandk: ￥30.00" href="https://afdian.com/u/404b86a078e111ecab3652540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png"> </a>
<a title="白雨 楠: ￥30.00" href="https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg"> </a>
<a title="圣剑: ￥30.00" href="https://afdian.com/u/ef50bc78b3d911ecb85352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/user_upload_osl/8a1c4eb2e580b4b8b463ceb2114b6381_w132_h132_s3.jpeg"> </a>
<a title="同谋者: ￥30.00" href="https://afdian.com/u/7c3c65dc004a11eb9a6052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-blue.png"> </a>
<a title="染川瞳: ￥5.00" href="https://afdian.com/u/89b1218c86e011eaa4d152540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/89b1218c86e011eaa4d152540025c377/avatar/9bf08f81d231f3054c98f9e5c1c8ce40_w640_h640_s57.jpg"> </a>
<a title="Користувач爱发电_CvQb: ￥5.00" href="https://afdian.com/u/177bea3cf47211ec990352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="水合: ￥5.00" href="https://afdian.com/u/039508f2b17d11ebad1052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-orange.png"> </a>
<a title="Користувач爱发电_0c5c8: ￥5.00" href="https://afdian.com/u/0c5c865e08ee11ecba1352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="DIO: ￥5.00" href="https://afdian.com/u/7ac297b4722211eab4a752540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="Користувач爱发电_DJpu: ￥5.00" href="https://afdian.com/u/8c23a236cf7311ec9c3452540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
</div>
<!-- afdian-end -->

## Подяки

[BANER](https://github.com/BANSAFAn), який допоміг мені багато в спільноті RU/UK.

[GodLeaveMe](https://github.com/GodLeaveMe), [v1mkss](https://github.com/v1mkss), підтримують реєстр пакетів AUR.

[0xc0000142](https://github.com/0xc0000142), підтримує winget.

[Marmur2020](https://github.com/Marmur2020) & [BANSAFAn](https://github.com/BANSAFAn), повністю переклали українську мову!

[vanja-san](https://github.com/vanja-san), надав російську мову!

[lukechu10](https://github.com/lukechu10) & [HoldYourWaffle](https://github.com/HoldYourWaffle) допомогли мені з ядром лаунчера.

[laolarou726](https://github.com/laolarou726), який допомагає з дизайном лаунчера.

Також особлива подяка

[Yricky](https://github.com/Yricky), [Jin](https://github.com/Indexyz), [LG](https://github.com/LasmGratel), [Phoebe](https://github.com/PhoebezZ), [Sumeng Wang](https://github.com/darkkingwsm), [Luca](https://github.com/LucaIsGenius), [Charles Tang](https://github.com/CharlesQT)
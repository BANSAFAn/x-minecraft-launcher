<p align="center">
  <a href="https://xmcl.app" target="_blank">
    <img alt="Logo" width="100" src="https://github.com/Voxelum/x-minecraft-launcher/blob/master/xmcl-electron-app/icons/dark@256x256.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Voxelum/x-minecraft-launcher">
    <img src="https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg" alt="Build">
  </a>
  <a href="https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@xmcl/core.svg" alt="License">
  </a>
  <a href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Commit">
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

![home](https://raw.githubusercontent.com/Voxelum/xmcl-page/master/.vitepress/theme/assets/home.png)

Odwiedź [oficjalną stronę](https://xmcl.app) aby pobrać aplikację!

Jeśli masz winget, możesz użyć go do instalacji

```bash
winget install CI010.XMinecraftLauncher
```

Instalacja również dostępna przez HomeBrew poprzez tap

```bash
brew tap voxelum/xmcl
brew install --cask --no-quarantine voxelum/xmcl
```

<kbd>[<img title="Ukraina" alt="Ukraina" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1280px-Flag_of_Ukraine.svg.png" width="22">](docs/README.uk.md)</kbd>
<kbd>[<img title="Rosja" alt="Rosja" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png" width="22">](docs/README.ru.md)</kbd>
<kbd>[<img title="Niemcy" alt="Niemcy" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" width="22">](docs/README.de.md)</kbd>
<kbd>[<img title="Chiny" alt="Chiny" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" width="22">](docs/README.zh.md)</kbd>
<kbd>[<img title="Japonia" alt="Japonia" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/2560px-Flag_of_Japan.svg.png" width="22">](docs/README.jp.md)</kbd>
<kbd>[<img title="Polska" alt="Polska" src="https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg" width="22">](docs/README.pl.md)</kbd>
<kbd>[<img title="Kazachstan" alt="Kazachstan" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="Arabski" alt="Arabski" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkolizej.at.ua%2F_pu%2F3%2F76583687.png&f=1&nofb=1&ipt=c6c2d418c48381f3f77a90574f99672f12cd72fe0ee90e89ade34438149f21aa" width="26">](docs/README.kz.md)</kbd>
<kbd>[<img title="Francja" alt="Francja" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikiway.com%2Fupload%2Fiblock%2F01e%2F800px-Flag_of_France_svg.png&f=1&nofb=1&ipt=ae6be806c98ab47e579b51d1441309f588a41b9bc741c7aec15031f51aef0890" width="26">](docs/README.kz.md)</kbd>

## Funkcje

- 📥 **Pobieranie i automatyczne uzupełnianie**. Wsparcie dla pobierania `Minecraft`, `Forge`, `Fabric`, `Quilt`, `OptiFine`, `JVM` z oficjalnych lub trzecich serwerów lustrzanych.
- ⚡️ **Szybkie pobieranie**. Ponowne wykorzystanie gniazd poprzez agenty HTTP/HTTPS i pobieranie plików jednocześnie w częściach.
- 💻 **Wieloplatformowość**. Launcher oparty na Electronie, wspiera 🗔 Windows 10/11, 🍎 MacOS i 🐧 Linux.
- 📚 **Wiele instancji**. Użytkownicy mogą tworzyć wiele instancji w celu izolowania różnych wersji, modów i ustawień uruchamiania.
- 🗂 **Zarządzanie wszystkimi zasobami**. Wykorzystanie linków (twardych/symbolicznych) do instalacji zasobów w instancjach, zachowując optymalne wykorzystanie dysku. Bez kopiowania modów wszędzie! 😆
- 🔥 **Wbudowane wsparcie dla CurseForge, Modrinth**. Możesz pobierać zasoby bezpośrednio w launcherze.
- 📦 **Wsparcie importu/eksportu** CurseForge i Modrinth modpacków zgodnie z normami!
- 🔒 **Wsparcie dla wielu systemów kont**. Wbudowane logowanie Microsoft oraz API Mojang Yggdrasil. Ma również wbudowane wsparcie dla [ely.by](https://ely.by/) i [littleskin.cn](https://littleskin.cn). Można także dodać serwery uwierzytelniania innych firm!
- 🔗 **Połączenie P2P między użytkownikami**. Możesz grać w trybie wieloosobowym przez LAN nawet jeśli nie jesteś w tej samej fizycznej sieci LAN!
- 🔑 **Podpis kodu i nowoczesne pakowanie**. W systemie Windows możesz używać `appx` i `appinstaller` do instalacji aplikacji. Nie zobaczysz już więcej komunikatów blokujących od przeglądarki ani błędów SmartScreen! 😎

## Wkład

[![Zadaj pytanie DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Voxelum/x-minecraft-launcher)

Dla ogólnych programistów, zobacz [Kontrybucje](./CONTRIBUTING.md)

Dla deweloperów lokalizacji i18n, proszę postępuj zgodnie z [Rozpoczynanie pracy z lokalizacją](https://docs.xmcl.app/en/guide/i18n)

## LICENCJA

[MIT](LICENSE)

## Sponsorstwo

| [![](https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66)](https://signpath.io/) | Bezpłatne podpisywanie kodu w systemie Windows zapewniane przez [SignPath.io](https://signpath.io/), certyfikat od [Fundacji SignPath](https://signpath.org/) |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| [![](https://deno.com/images/deno_logo_4.gif)](https://deno.com/deploy) | [Deno Deploy](https://deno.com/deploy), XMCL korzysta z jego bezproblemowej platformy do aplikacji JavaScript bezserwerowych. Dostarczone przez [Deno](https://deno.com/) |
| [![](assets/EdgeOne.png)](https://edgeone.ai/) | [Najlepszy azjatycki CDN, Edge i bezpieczne rozwiązania - Tencent EdgeOne](https://edgeone.ai/), przyspieszenie CDN i ochrona bezpieczeństwa dla tego projektu są sponsorowane przez Tencent EdgeOne. |

### Sponsor (AFDIAN)

<!-- afdian-start -->
<div style="display: flex; align-items: center; justify-items:center; gap: 0.2em; flex-wrap: wrap;">
<a title="Użytkownik爱发电_9d663: ￥390.00" href="https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="Użytkownik爱发电_19e29: ￥300.00" href="https://afdian.com/u/19e292c21a1d11ee929a52540025c377"> <img width="100" height="100" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="ahdg: ￥180.00" href="https://afdian.com/u/dd9058ce20df11eba5c052540025c377"> <img width="70" height="70" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg"> </a>
<a title="Kandk: ￥30.00" href="https://afdian.com/u/404b86a078e111ecab3652540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png"> </a>
<a title="白雨 楠: ￥30.00" href="https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg"> </a>
<a title="圣剑: ￥30.00" href="https://afdian.com/u/ef50bc78b3d911ecb85352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/user_upload_osl/8a1c4eb2e580b4b8b463ceb2114b6381_w132_h132_s3.jpeg"> </a>
<a title="同谋者: ￥30.00" href="https://afdian.com/u/7c3c65dc004a11eb9a6052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-blue.png"> </a>
<a title="染川瞳: ￥5.00" href="https://afdian.com/u/89b1218c86e011eaa4d152540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/user/89b1218c86e011eaa4d152540025c377/avatar/9bf08f81d231f3054c98f9e5c1c8ce40_w640_h640_s57.jpg"> </a>
<a title="Użytkownik爱发电_CvQb: ￥5.00" href="https://afdian.com/u/177bea3cf47211ec990352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="水合: ￥5.00" href="https://afdian.com/u/039508f2b17d11ebad1052540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-orange.png"> </a>
<a title="Użytkownik爱发电_0c5c8: ￥5.00" href="https://afdian.com/u/0c5c865e08ee11ecba1352540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"> </a>
<a title="DIO: ￥5.00" href="https://afdian.com/u/7ac297b4722211eab4a752540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
<a title="Użytkownik爱发电_DJpu: ￥5.00" href="https://afdian.com/u/8c23a236cf7311ec9c3452540025c377"> <img width="50" height="50" style="border-radius: 100%" src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png"> </a>
</div>
<!-- afdian-end -->

## Podziękowania

[BANER](https://github.com/BANSAFAn), który pomógł mi dużo w społeczności RU/UK.

[GodLeaveMe](https://github.com/GodLeaveMe), [v1mkss](https://github.com/v1mkss), utrzymujący rejestr pakietów AUR.

[0xc0000142](https://github.com/0xc0000142), utrzymujący winget.

[Marmur2020](https://github.com/Marmur2020) & [BANSAFAn](https://github.com/BANSAFAn), całkowicie przetłumaczyli język ukraiński!

[vanja-san](https://github.com/vanja-san), zapewnił język rosyjski!

[lukechu10](https://github.com/lukechu10) & [HoldYourWaffle](https://github.com/HoldYourWaffle) pomogli mi w jądrze launchera.

[laolarou726](https://github.com/laolarou726), który pomagał dużo w projektowaniu launchera.

Również szczególne podziękowania dla

[Yricky](https://github.com/Yricky), [Jin](https://github.com/Indexyz), [LG](https://github.com/LasmGratel), [Phoebe](https://github.com/PhoebezZ), [Sumeng Wang](https://github.com/darkkingwsm), [Luca](https://github.com/LucaIsGenius), [Charles Tang](https://github.com/CharlesQT)
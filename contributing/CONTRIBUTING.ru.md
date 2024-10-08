
### Технический стек и некоторая предыстория

Здесь представлен обзор инструментария и времени выполнения этого проекта.

Для всего проекта у нас есть

- [Node.js >=18.17.0](https://nodejs.org/). Базовая среда библиотек ядра.
- [Electron 27](https://electron.atom.io). Фактическое время выполнения программы запуска.
- [pnpm](https://pnpm.io/). Используется для управления пакетами monorepo.
- [TypeScript](https://www.typescriptlang.org/). Весь проект использует как можно больше TypeScript.

Для основного процесса (Electron) мы имеем

- [esbuild](https://esbuild.github.io/). Мы используем esbuild для сборки нашего основного процесса TypeScript.

Для рендерера, который является чистым фронтендом.

- [Vue](https://vuejs.org). Используется для создания пользовательских интерфейсов.
- [Vite](https://vitejs.dev/). Используется в качестве системы сборки.
- [Vuetify](https://vuetifyjs.com/). Используется как библиотека компонентов.
- [Windi CSS](https://windicss.org/). Используется для создания инструментов CSS.
- [Vue Composition API](https://github.com/vuejs/composition-api). Мост для композиционного API для Vue 2. Когда Vuetify обновится до Vue 3, Vue будет обновлен, и это будет удалено.

### Структура проекта

![Диаграмма](/assets/diagram.svg)

- xmcl
  - Связанный git-репо [launcher-core](https://github.com/voxelum/minecraft-launcher-core-node) является git-подмодулем в этом проекте.
  - Реализует основную логику установки и запуска Minecraft и представляет их в виде библиотеки.
- xmcl-electron-app
  - Использует Electron для реализации времени выполнения.
  - Это напрямую зависит от xmcl-runtime.
  - Неявно зависит от xmcl-keystone-ui (временно, может быть удалено позже?)
- xmcl-keystone-ui
  - Основной пользовательский интерфейс по умолчанию для пусковой установки.
  - На 100% совместим с браузерами. В этом проекте не задействован Electron API.
- xmcl-runtime
  - Основная реализация архитектуры пусковой установки. Она зависит только от Node.js и не требует времени выполнения Electron.
- xmcl-runtime-api
  - Это общий код и API для XMCL runtime. Его можно использовать для приложения рендеринга (на стороне браузера).


### Концепция/Структура

Пусковая установка состоит из «сервера/клиента» или «main/renderer». Они взаимодействуют друг с другом посредством [ipcMain](https://electronjs.org/docs/api/ipc-main) и [ipcRenderer](https://electronjs.org/docs/api/ipc-renderer) от Electron.

Main - это «бэкэнд» пусковой установки. Он управляет окнами и всеми постоянными данными/состоянием приложения. Управление состоянием осуществляется с помощью [Vuex](https://vuex.vuejs.org/). Как только состояние/данные будут изменены [Vuex commit](https://vuex.vuejs.org/guide/mutations.html), он передаст ipc-сообщение, содержащее [информацию о мутации]((https://vuex.vuejs.org/guide/mutations.html)) всем рендерам. В то же время он запустит действие сохранения измененного модуля, чтобы записать изменение на диск.

Рендерер является/является просто (а) браузером, который взаимодействует с main. Он поддерживает копию хранилища. (Я могу быть полной или частичной копией) Ввод пользователя вызовет [action](https://vuex.vuejs.org/guide/actions.html) или [commit](https://vuex.vuejs.org/guide/mutations.html), и он будет синхронизирован с main. Хотя это не требует никаких дополнительных действий от разработчика. Локальный коммит и действие будут автоматически отправлены в main. Разработчик может обращаться с рендерером как с обычным vue-приложением.

### Рекомендуемая инструкция по чтению кода

Если вас интересует логика конкретной страницы, вы можете перейти в папку `xmcl-keystone-ui/src/windows/main/views`. Файлы `.vue` в этой папке являются основным компонентом, используемым в программе запуска. Префикс файла - это домен пользовательского интерфейса.

Посмотрите несколько примеров:

1. `AppSideBar.vue` - компонент боковой панели, а `AppSideBarInstanceItem.vue` - компонент, используемый в `AppSideBar.vue`, представляющий экземпляр.
2. `Curseforge.vue` - компонент страницы CurseForge, а `CurseforgeCategories.vue` - карточка категории, используемая на странице `Curseforge.vue`.

Если вас интересует логика ядра, вы можете перейти в раздел `xmcl-runtime/services/`. Каждый файл в нем представляет собой сервис для определенного домена/аспекта логики запуска. Во время этого процесса вы также должны знать о соответствующих файлах в `xmcl-runtime-api/services/`, которые декларируют интерфейс реальных сервисов.

Некоторые примеры:

1. `xmcl-runtime/services/InstanceService.ts` содержит реализацию API для добавления/удаления/обновления экземпляров. В файле `xmcl-runtime-api/services/InstanceService.ts` содержится интерфейс `InstanceService`.
2. `xmcl-runtime/services/InstanceVersionService.ts` содержит реализацию API для проверки работоспособности версии экземпляра. Он определяет, какую версию использует экземпляр, и нужно ли устанавливать эту версию.
3. `xmcl-runtime/services/InstallService.ts` содержит реализацию API для установки Minecraft/Forge/Fabric и т.д.
3. `xmcl-runtime/services/LaunchService.ts` содержит API-реализацию запуска экземпляра.

## Вклад

Настоятельно рекомендуем использовать VSCode для открытия проекта.

### Начало работы

#### Клон

Клонирование проекта с флагом подмодулей `--recurse-submodules`.

```bash
git clone --recurse-submodules https://github.com/Voxelum/x-minecraft-launcher
```

Если вы забыли добавить флаг `--recurse-submodules`, вам придется инициализировать и обновлять git-подмодуль вручную.

```bash
git submodule init
git submodule update
```

#### Установка

Установите проект с помощью [pnpm](https://pnpm.io):

```
pnpm install
```

<details>
  <summary> Решение проблемы медленной установки зависимостей (например, Electron) в Китае. </summary>

  Откройте свой git bash и добавьте `registry=https://registry.npm.taobao.org electron_mirror=«https://npm.taobao.org/mirrors/electron/»` перед `pnpm i`. Используйте зеркала npm и Electron, предоставленные Ali.

  Последняя команда, которую вы введете, будет

  ```bash
  registry=https://registry.npm.taobao.org electron_mirror="https://npm.taobao.org/mirrors/electron/" pnpm i
  ```
</details>

#### Установите переменные окружения

Вы должны установить `CURSEFORGE_API_KEY`, создав файл `.env` под `xmcl-electron-app`. Этот файл `.env` добавляется в файл `.gitignore`.

**НЕ ПЕРЕДАВАЙТЕ СВОЙ CURSEFORGE API КЛЮЧ**.

#### Start Launcher

Затем вы можете запустить программу запуска

#### Для VSCode

Перейдите в раздел `Запуск и отладка`, используйте профиль `Electron: Main (launch)` для запуска электрона. (Горячая клавиша F5)

#### Для не VSCode

Откройте один терминал

```bash
# Start a dev server for UI
npm run dev:renderer
```

Откройте другой терминал

``` bash
# Start watching main process code
npm run dev:main
```

#### «Горячее» изменение кода

У вас есть изменения в коде, и вы хотите обновить изменения в запущенном экземпляре программы запуска.

##### Для процесса браузера

Vite обеспечивает горячую перезагрузку, она должна обновляться автоматически. Если что-то пошло не так, вы можете обновить браузер, нажав `Ctrl+R`.

##### Для основного процесса

Если вы используете VSCode для запуска программы запуска, после изменения кода вы можете нажать кнопку перезагрузки в отладчике VSCode.

Если вы не используете VSCode для запуска, он должен закрыть Electron и перезагрузиться автоматически.

### Найдено что-то неправильное в ядре пусковой установки

Ядро пусковой установки находится в [отдельном проекте](https://github.com/voxelum/minecraft-launcher-core-node), написанном на TypeScript.

Пожалуйста, откройте там вопрос, если вы обнаружите какую-либо проблему, связанную с этим.

#### Рекомендуемый способ взаимодействия с Vuex

- Создайте новый файл для хука в папке `src/renderer/composables` и экспортируйте хук в папку `src/renderer/composables/index.ts`.
  - Оберните операцию Vuex в свой хук
- Импортируйте свой хук с помощью `import { yourHook } из '/@/composables'` в свой файл Vue
- Используйте хук в файле Vue без прямого доступа к Vuex

### Отладчик VSCode

Проект включает в себя конфигурации отладчика VSCode. Вы можете добавить точку останова в строке и отлаживать. В настоящее время метод отладчика VSCode поддерживает отладку только главного процесса.

(Вы можете использовать Chrome Devtools для процесса рендеринга в любом случае).

Теперь у нас есть два варианта:

1. Electron: Main (launch)
2. Electron: Main (attach)

Если вы используете первый вариант для запуска, он автоматически присоединит отладчик к экземпляру.


### Зафиксируйте свой код

Этот проект следует [обычным коммитам](https://www.conventionalcommits.org/en/v1.0.0-beta.3/). Вкратце, первая строка вашего сообщения о фиксации должна быть:

```
commit type: commit description
```

Существует несколько типов фиксации: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `test`.

См. [этот gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716):

> feat: (новая возможность для пользователя, не новая возможность для скрипта сборки)
>
> fix: (исправление ошибки для пользователя, а не исправление для скрипта сборки)
>
> docs: (изменения в документации)
>
> style: (форматирование, пропущенные точки с запятой и т.д.; без изменения производственного кода)
>
> refactor: (рефакторинг производственного кода, например, переименование переменной)
>
> test: (добавление недостающих тестов, рефакторинг тестов; без изменения производственного кода)
>
> chore: (обновление задач grunt и т. д.; без изменения производственного кода)

**Ваш коммит будет отклонен, если вы не будете следовать этим правилам*.

### Как собирать

Текущая программа запуска требует выполнения 2 команд для сборки

Во-первых, вам нужно собрать код фронтенда:

```bash
pnpm build:renderer
```

Если только код под `xmcl-keystone-ui` не изменился, вам не нужно собирать его снова.

Затем вы можете собрать Electron в связке с фронтендом, который вы только что собрали:
```bash
pnpm build:all
```

Если вам нужна отладочная сборка, вы можете использовать `pnpm build:dir`, который соберет только результат сборки директории и не будет упаковывать их в другой релизный формат.

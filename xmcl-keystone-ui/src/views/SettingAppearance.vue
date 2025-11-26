<template>
  <div class="settings-page">
    <SettingHeader>
      🎨 {{ t("setting.appearance") }}
    </SettingHeader>

    <div class="content-grid">
      <!-- Layout & Theme -->
      <div class="settings-card">
        <h3 class="card-title">
          <v-icon class="title-icon">dashboard</v-icon>
          {{ t('setting.layoutTitle') }} & {{ t('setting.darkTheme') }}
        </h3>
        <div class="settings-list">
          <SettingItemSelect :select.sync="layout" :title="t('setting.layoutTitle')" :text="t('setting.layoutTitle')"
            :description="t('setting.layoutDescription')" :items="layouts" />
          <SettingItemCheckbox v-if="env?.os === 'linux'" v-model="linuxTitlebar" :title="t('setting.linuxTitlebar')"
            :text="t('setting.linuxTitlebar')" :description="t('setting.linuxTitlebarDescription')" />
          <SettingItemSelect :select.sync="darkModel" :title="t('setting.darkTheme')" :text="t('setting.darkTheme')"
            :description="t('setting.darkThemeDescription')" :items="themes" />
        </div>
      </div>

      <!-- Color Theme -->
      <div class="settings-card full-width">
        <h3 class="card-title">
          <v-icon class="title-icon">format_paint</v-icon>
          {{ t('setting.colorTheme.name') }}
          <v-tooltip right>
            <template #activator="{ on }">
              <v-btn icon v-on="on" @click="resetToDefault" class="reset-btn">
                <v-icon>restore</v-icon>
              </v-btn>
            </template>
            {{ t('setting.resetToDefault') }}
          </v-tooltip>
        </h3>
        <p class="card-description">{{ t("setting.colorTheme.description") }}</p>
        <div class="color-picker-grid">
          <div class="color-picker-item">
            <label>{{ t('setting.colorTheme.appBarColor') }}</label>
            <SettingAppearanceColor v-model="appBarColor" :blur.sync="blurAppBar" has-blur />
          </div>
          <div class="color-picker-item">
            <label>{{ t('setting.colorTheme.sideBarColor') }}</label>
            <SettingAppearanceColor v-model="sideBarColor" :blur.sync="blurSidebar" has-blur />
          </div>
          <div class="color-picker-item">
            <label>{{ t('setting.colorTheme.primaryColor') }}</label>
            <SettingAppearanceColor v-model="primaryColor" />
          </div>
          <div class="color-picker-item">
            <label>{{ t('setting.colorTheme.cardColor') }}</label>
            <SettingAppearanceColor v-model="cardColor" :blur.sync="blurCard" has-blur />
          </div>
          <div class="color-picker-item">
            <label>{{ t('setting.colorTheme.backgroundColor') }}</label>
            <SettingAppearanceColor v-model="backgroundColor" :blur.sync="blur" has-blur />
          </div>
          <div class="color-picker-item">
            <label>{{ t('setting.colorTheme.warningColor') }}</label>
            <SettingAppearanceColor v-model="warningColor" />
          </div>
          <div class="color-picker-item">
            <label>{{ t('setting.colorTheme.errorColor') }}</label>
            <SettingAppearanceColor v-model="errorColor" />
          </div>
        </div>
      </div>

      <!-- Background -->
      <div class="settings-card full-width">
        <h3 class="card-title">
          <v-icon class="title-icon">wallpaper</v-icon>
          {{ t('setting.backgroundType') }}
        </h3>
        <div class="settings-list">
          <SettingItemSelect :select.sync="backgroundType" :title="t('setting.backgroundType')"
            :text="t('setting.backgroundType')" :description="t('setting.backgroundTypeDescription')"
            :items="backgroundTypes" />
          <SettingItemCheckbox v-model="backgroundColorOverlay" :title="t('setting.backgroundColorAbove')"
            :text="t('setting.backgroundColorAbove')" :description="t('setting.backgroundColorAboveDescription')" />
        </div>
        <div v-if="backgroundType === 'particle'" class="sub-control">
          <SettingItemSelect :select.sync="particleMode" :title="t('setting.particleMode.name')"
            :text="t('setting.particleMode.name')" :description="t('setting.particleModeDescription')"
            :items="particleModes" />
        </div>
        <div v-if="backgroundType === 'image'" class="sub-control">
          <div class="file-control">
            <div class="file-info">
              <div class="file-title">{{ t("setting.backgroundImage") }}</div>
              <div class="file-description">{{ t("setting.backgroundImageDescription") }}</div>
            </div>
            <div class="file-actions">
              <v-select v-model="backgroundImageFit" filled dense hide-details
                :label="t('setting.backgroundImageFit.name')" :items="backgroundImageFits" class="fit-select" />
              <v-btn text color="primary" :disabled="!backgroundImage" @click="clearImage">
                {{ t("setting.backgroundImageClear") }}
              </v-btn>
              <v-btn text color="primary" @click="selectImage">
                {{ t("setting.backgroundImageSelect") }}
              </v-btn>
            </div>
          </div>
        </div>
        <div v-if="backgroundType === 'video'" class="sub-control">
          <div class="file-control">
            <div class="file-info">
              <div class="file-title">{{ t("setting.backgroundVideo") }}</div>
              <div class="file-description">{{ t("setting.backgroundVideoDescription") }}</div>
            </div>
            <div class="file-actions">
              <v-select v-model="backgroundImageFit" filled dense hide-details
                :label="t('setting.backgroundImageFit.name')" :items="backgroundImageFits" class="fit-select" />
              <v-btn text color="primary" :disabled="!backgroundImage" @click="clearVideo">
                {{ t("setting.backgroundImageClear") }}
              </v-btn>
              <v-btn text color="primary" @click="selectVideo">
                {{ t("setting.backgroundVideoSelect") }}
              </v-btn>
            </div>
          </div>
          <div class="slider-control">
            <div class="slider-info">
              <div class="slider-title">{{ t("setting.backgroundVideoVolume") }}</div>
              <div class="slider-description">{{ t("setting.backgroundVideoVolumeDescription") }}</div>
            </div>
            <v-slider v-model="volume" step="0.01" :min="0" :max="1" class="volume-slider" />
          </div>
        </div>
        <div class="sub-control">
          <div class="file-control">
            <div class="file-info">
              <div class="file-title">{{ t("setting.backgroundMusic") }}</div>
            </div>
            <div class="file-actions">
              <v-menu offset-y :disabled="backgroundMusic.length === 0">
                <template #activator="{ on }">
                  <v-btn text color="primary" :disabled="backgroundMusic.length === 0" v-on="on">
                    {{ t("setting.viewBackgroundMusic") }}
                  </v-btn>
                </template>
                <v-list dense two-line>
                  <v-list-item v-for="(m, i) of backgroundMusic" :key="m.url" @click="viewMusic(m.url)">
                    <v-list-item-content>
                      <v-list-item-title>{{ basename(m.url, '/') }}</v-list-item-title>
                      <v-list-item-subtitle>{{ m.mimeType }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon @click="removeMusic(i)">
                        <v-icon color="red">delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn text color="primary" @click="selectMusic">
                {{ t("setting.backgroundVideoSelect") }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Font -->
      <div class="settings-card full-width">
        <h3 class="card-title">
          <v-icon class="title-icon">text_fields</v-icon>
          {{ t('setting.themeFont') }}
        </h3>
        <div class="font-control">
          <div class="font-info">
            <div class="font-title">{{ t('setting.themeFont') }}</div>
            <div class="font-description">{{ t('setting.themeFontDescription') }}</div>
          </div>
          <div class="font-actions">
            <div class="font-size-controls">
              <v-btn-toggle v-model="fontDelta" mandatory solo dense>
                <v-btn solo>1px</v-btn>
                <v-btn solo>0.1px</v-btn>
              </v-btn-toggle>
              <v-btn icon @click="onFontSizeDecrease"><v-icon>text_decrease</v-icon></v-btn>
              <v-text-field :value="`${Math.round(fontSize * 10) / 10}px`" readonly solo outlined dense hide-details
                class="font-size-input" />
              <v-btn icon @click="onFontSizeIncrease"><v-icon>text_increase</v-icon></v-btn>
            </div>
            <div class="font-buttons">
              <v-btn text color="primary" @click="onSelectFont">{{ t("setting.themeSelectFont") }}</v-btn>
              <v-btn text color="primary" @click="onRevertFont">{{ t("setting.themeResetFont") }}</v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Share -->
      <div class="settings-card">
        <h3 class="card-title">
          <v-icon class="title-icon">share</v-icon>
          {{ t('setting.themeShare') }}
        </h3>
        <div class="settings-list">
          <div class="share-control">
            <div class="share-info">
              <div class="share-title">{{ t('setting.themeShare') }}</div>
              <div class="share-description">{{ t('setting.themeShareDescription') }}</div>
            </div>
            <div class="share-actions">
              <v-btn text color="primary" @click="onExportTheme">{{ t("setting.themeExport") }}</v-btn>
              <v-btn text color="primary" @click="onImportTheme">{{ t("setting.themeImport") }}</v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Appearance Items (extra tools from the alternate branch) -->
      <div class="settings-card full-width">
        <AppearanceItems :theme="currentTheme" @save="onSave" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppearanceItems from '@/components/AppearanceItems.vue'
import SettingHeader from '@/components/SettingHeader.vue'
import SettingItemCheckbox from '@/components/SettingItemCheckbox.vue'
import SettingItemSelect from '@/components/SettingItemSelect.vue'
import SettingAppearanceColor from '@/components/SettingAppearanceColor.vue'
import { useService } from '@/composables'
import { kEnvironment } from '@/composables/environment'
import { kSettingsState } from '@/composables/setting'
import { kTheme } from '@/composables/theme'
import { kUIDefaultLayout } from '@/composables/uiLayout'
import { injection } from '@/util/inject'
import { serialize } from '@/util/theme.v1'
import { ThemeServiceKey } from '@xmcl/runtime-api'
import { basename } from '@/util/basename'

const { t } = useI18n()
const { state } = injection(kSettingsState)
const env = injection(kEnvironment)
const { currentTheme, update, addMusic, setBackgroundImage, clearBackgroundImage, exportTheme, importTheme, setFont, resetFont, fontSize } = injection(kTheme)
const { setTheme } = useService(ThemeServiceKey)

const linuxTitlebar = computed({
  get: () => state.value?.linuxTitlebar ?? false,
  set: v => state.value?.linuxTitlebarSet(v),
})

const layout = injection(kUIDefaultLayout)

const layouts = computed(() => [{
  text: t('setting.layout.default'),
  value: 'default',
}, {
  text: t('setting.layout.focus'),
  value: 'focus',
}])

const particleModes = computed(() => Object.entries({
  push: t('setting.particleMode.push'),
  remove: t('setting.particleMode.remove'),
  repulse: t('setting.particleMode.repulse'),
  bubble: t('setting.particleMode.bubble'),
}).map(([v, text]) => ({ value: v, text })))
const backgroundImageFits = computed(() => [
  { value: 'cover', text: t('setting.backgroundImageFit.cover') },
  { value: 'contain', text: t('setting.backgroundImageFit.contain') },
])
const backgroundTypes = computed(() => [
  { value: BackgroundType.NONE, text: t('setting.backgroundTypes.none') },
  { value: BackgroundType.IMAGE, text: t('setting.backgroundTypes.image') },
  { value: BackgroundType.PARTICLE, text: t('setting.backgroundTypes.particle') },
  { value: BackgroundType.HALO, text: t('setting.backgroundTypes.halo') },
  { value: BackgroundType.VIDEO, text: t('setting.backgroundTypes.video') },
])

// Bound appearance values (assume these are provided by kTheme injection)
const appBarColor = ref('')
const sideBarColor = ref('')
const primaryColor = ref('')
const cardColor = ref('')
const backgroundColor = ref('')
const warningColor = ref('')
const errorColor = ref('')
const blurAppBar = ref(0)
const blurSidebar = ref(0)
const blurCard = ref(0)
const blur = ref(0)

// Background and media
const backgroundType = ref(BackgroundType.NONE)
const backgroundImage = ref('')
const backgroundImageFit = ref('cover')
const backgroundColorOverlay = ref(false)
const particleMode = ref('push')
const volume = ref(0.5)
const backgroundMusic = ref<Array<{ url: string; mimeType?: string }>>([])

function selectImage() {
  showOpenDialog({
    title: t('theme.selectImage'),
    properties: ['openFile'],
    filters: [{ name: 'image', extensions: ['png', 'jpg', 'gif', 'webp'] }],
  }).then((v) => {
    const imagePath = v.filePaths?.[0]
    if (imagePath) {
      setBackgroundImage(imagePath)
    }
  })
}
function selectVideo() {
  showOpenDialog({
    title: t('theme.selectVideo'),
    properties: ['openFile'],
    filters: [{ name: 'video', extensions: ['mp4', 'webm'] }],
  }).then((v) => {
    if (v.filePaths?.[0]) {
      setBackgroundImage(v.filePaths[0])
    }
  })
}

function selectMusic() {
  showOpenDialog({
    title: t('theme.selectMusic'),
    properties: ['openFile'],
    filters: [{ name: 'audio', extensions: ['mp3', 'ogg', 'wav'] }],
  }).then(async (v) => {
    if (v.filePaths?.[0]) {
      await addMusic(v.filePaths[0])
    }
  })
}

function viewMusic(m: string) {
  // Provided by Theme service
  try {
    showMediaItemInFolder?.(m)
  } catch {
    // noop
  }
}

function clearVideo() {
  clearBackgroundImage()
}
function clearImage() {
  clearBackgroundImage()
}

function onExportTheme() {
  showSaveDialog({
    title: t('setting.themeExport'),
    defaultPath: currentTheme.value.name,
    filters: [{ name: 'xtheme', extensions: ['xtheme'] }],
  }).then((v) => {
    if (v.filePath) {
      exportTheme(v.filePath)
    }
  })
}

function onImportTheme() {
  showOpenDialog({
    title: t('setting.themeImport'),
    properties: ['openFile'],
    filters: [{ name: 'xtheme', extensions: ['xtheme'] }],
  }).then((v) => {
    if (v.filePaths?.[0]) {
      importTheme(v.filePaths[0])
    }
  })
}

const fontDelta = ref(0)
function onFontSizeIncrease() {
  const delta = fontDelta.value ? 0.1 : 1
  fontSize.value += delta
}
function onFontSizeDecrease() {
  const delta = fontDelta.value ? 0.1 : 1
  fontSize.value -= delta
}

function onSelectFont() {
  showOpenDialog({
    title: t('setting.themeSelectFont'),
    properties: ['openFile'],
    filters: [{ name: 'font', extensions: ['ttf', 'otf', 'woff', 'woff2'] }],
  }).then((v) => {
    if (v.filePaths?.[0]) {
      setFont(v.filePaths[0])
    }
  })
}

function onRevertFont() {
  resetFont()
}

// Save handler from the alternate branch: persist the current theme
function onSave() {
  // persist serialized theme and refresh theme
  setTheme(currentTheme.value.name, serialize(currentTheme.value)).then(() => {
    update()
  })
}

function resetToDefault() {
  // minimal reset implementation
  // real implementation should restore default theme values
  // Use currentTheme / kTheme provided functions in real app
  // Here we call onSave after resetting values if available
  // For now just call update to re-render
  update()
}

</script>

<style scoped>
.settings-page {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 24px;
}

.settings-card {
  background-color: var(--v-surface-variant);
  border: 2px solid var(--v-outline);
  border-radius: 12px;
  padding: 20px;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.full-width {
  grid-column: 1 / -1;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
}

.title-icon {
  color: var(--v-primary-base);
}

.color-picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.color-picker-item label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--v-on-surface-variant);
}

.file-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-info .file-title {
  font-weight: 600;
}

.font-control {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.font-size-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.font-buttons {
  display: flex;
  gap: 8px;
}

.slider-control {
  margin-top: 12px;
}

.card-description {
  color: var(--v-on-surface-variant);
  margin-bottom: 12px;
}
</style>

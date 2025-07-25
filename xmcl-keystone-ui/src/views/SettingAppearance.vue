<template>
  <div>
    <SettingHeader>🎨 {{ t("setting.appearance") }}</SettingHeader>
    <SettingItemSelect
      :select.sync="layout"
      :title="t('setting.layoutTitle')"
      :description="t('setting.layoutDescription')"
      :items="layouts"
    />
    <SettingItemSelect
      :select.sync="sidebarPosition"
      :title="t('setting.sidebarPosition.name')"
      :description="t('setting.sidebarPosition.description')"
      :items="sidebarPositions"
    />
    <SettingItemCheckbox
      v-if="env?.os === 'linux'"
      v-model="linuxTitlebar"
      :title="t('setting.linuxTitlebar')"
      :description="t('setting.linuxTitlebarDescription')"
    />
    <SettingItemSelect
      :select.sync="darkModel"
      :title="t('setting.darkTheme')"
      :description="t('setting.darkThemeDescription')"
      :items="themes"
    />
    <SettingHeader>{{ t('setting.visibleCards.name') }}</SettingHeader>
    <SettingItemCheckbox
      v-model="showMods"
      :title="t('setting.visibleCards.showMods')"
    />
    <SettingItemCheckbox
      v-model="showResourcePacks"
      :title="t('setting.visibleCards.showResourcePacks')"
    />
    <SettingItemCheckbox
      v-model="showShaderPacks"
      :title="t('setting.visibleCards.showShaderPacks')"
    />
    <SettingItemCheckbox
      v-model="showSaves"
      :title="t('setting.visibleCards.showSaves')"
    />
    <SettingItemCheckbox
      v-model="showScreenshots"
      :title="t('setting.visibleCards.showScreenshots')"
    />
    <SettingItemCheckbox
      v-model="enableCardBlur"
      :title="t('setting.enableCardBlur')"
      :description="t('setting.enableCardBlurDescription')"
    />
    <v-list-item class="items-center justify-center">
      <v-list-item-action class="self-center">
        <v-tooltip
          color="warning"
          outlined
          right
        >
          <template #activator="{ on }">
            <v-btn
              text
              icon
              v-on="on"
              @click="resetToDefault"
            >
              <v-icon>
                restore
              </v-icon>
            </v-btn>
          </template>
          {{ t('setting.resetToDefault') }}
        </v-tooltip>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{
            t("setting.colorTheme.name")
          }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            t("setting.colorTheme.description")
          }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action
        app-bar
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="appBarColor"
          :blur.sync="blurAppBar"
          has-blur
          :text="t('setting.colorTheme.appBarColor')"
        />
      </v-list-item-action>
      <v-list-item-action
        sidebar
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="sideBarColor"
          :blur.sync="blurSidebar"
          has-blur
          :text="t('setting.colorTheme.sideBarColor')"
        />
      </v-list-item-action>

      <v-list-item-action
        primary
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="primaryColor"
          :text="t('setting.colorTheme.primaryColor')"
        />
      </v-list-item-action>
      <v-list-item-action
        primary
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="cardColor"
          :blur.sync="blurCard"
          has-blur
          :text="t('setting.colorTheme.cardColor')"
        />
      </v-list-item-action>
      
      <v-list-item-action
        text
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="textColor"
          :text="t('setting.textColor')"
        />
      </v-list-item-action>
      <v-list-item-action
        secondary
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="backgroundColor"
          :blur.sync="blur"
          has-blur
          :text="t('setting.colorTheme.backgroundColor')"
        />
      </v-list-item-action>
      <v-list-item-action
        warning
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="warningColor"
          :text="t('setting.colorTheme.warningColor')"
        />
      </v-list-item-action>
      <v-list-item-action
        error
        class="ml-[16px]"
      >
        <SettingAppearanceColor
          v-model="errorColor"
          :text="t('setting.colorTheme.errorColor')"
        />
      </v-list-item-action>
    </v-list-item>
    <SettingItemSelect
      :select.sync="backgroundType"
      :title="t('setting.backgroundType')"
      :description="t('setting.backgroundTypeDescription')"
      :items="backgroundTypes"
    />
    <SettingItemCheckbox
      v-model="backgroundColorOverlay"
      :title="t('setting.backgroundColorAbove')"
      :description="t('setting.backgroundColorAboveDescription')"
    />
    <SettingItemSelect
      v-if="backgroundType === 'particle'"
      :select.sync="particleMode"
      :title="t('setting.particleMode.name')"
      :description="t('setting.particleModeDescription')"
      :items="particleModes"
    />
    <v-list-item v-if="backgroundType === 'image'">
      <v-list-item-content>
        <v-list-item-title>
          {{
            t("setting.backgroundImage")
          }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            t("setting.backgroundImageDescription")
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="mr-4">
        <v-select
          v-model="backgroundImageFit"
          class="mr-4 w-40"
          filled
          hide-details
          :label="t('setting.backgroundImageFit.name')"
          :items="backgroundImageFits"
        />
      </v-list-item-action>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        :disabled="!backgroundImage"
        @click="clearImage"
      >
        {{ t("setting.backgroundImageClear") }}
      </v-btn>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        @click="selectImage"
      >
        {{ t("setting.backgroundImageSelect") }}
      </v-btn>
    </v-list-item>
    <v-list-item v-if="backgroundType === 'video'">
      <v-list-item-content>
        <v-list-item-title>
          {{
            t("setting.backgroundVideo")
          }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            t("setting.backgroundVideoDescription")
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="mr-4">
        <v-select
          v-model="backgroundImageFit"
          class="mr-4 w-40"
          filled
          hide-details
          :label="t('setting.backgroundImageFit.name')"
          :items="backgroundImageFits"
        />
      </v-list-item-action>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        :disabled="!backgroundImage"
        @click="clearVideo"
      >
        {{ t("setting.backgroundImageClear") }}
      </v-btn>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        @click="selectVideo"
      >
        {{ t("setting.backgroundVideoSelect") }}
      </v-btn>
    </v-list-item>
    <v-list-item v-if="backgroundType === BackgroundType.VIDEO">
      <v-list-item-content>
        <v-list-item-title>
          {{
            t("setting.backgroundVideoVolume")
          }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            t("setting.backgroundVideoVolumeDescription")
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-slider
        v-model="volume"
        step="0.01"
        :min="0"
        :max="1"
        :hint="t('setting.backgroundVideoVolume')"
        :always-dirty="true"
      />
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        {{
          t("setting.backgroundMusic")
        }}
      </v-list-item-title>
      <v-menu
        offset-y
        :disabled="backgroundMusic.length === 0"
      >
        <template #activator="{ on }">
          <v-btn
            outlined
            text
            :disabled="backgroundMusic.length === 0"
            style="margin-right: 10px"
            v-on="on"
          >
            {{ t("setting.viewBackgroundMusic") }}
          </v-btn>
        </template>
        <v-list
          dense
          two-line
        >
          <v-list-item
            v-for="(m, i) of backgroundMusic"
            :key="m.url"
            @click="viewMusic(m.url)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ basename(m.url, '/') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ m.mimeType }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                @click="removeMusic(i)"
              >
                <v-icon color="red">
                  delete
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        @click="selectMusic"
      >
        {{ t("setting.backgroundVideoSelect") }}
      </v-btn>
    </v-list-item>
    <!-- <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{
            t("setting.backgroundImageBlur")
          }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            t("setting.backgroundImageBlurDescription")
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-slider
        v-model="blur"
        :height="5"
        :min="0"
        :max="20"
        :hint="t('setting.backgroundImageBlur')"
        :always-dirty="true"
      />
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{
            t("setting.blurSidebar")
          }}
        </v-list-item-title>
      </v-list-item-content>
      <v-slider
        v-model="blurSidebar"
        :height="5"
        :min="0"
        :max="20"
        :hint="t('setting.blurSidebar')"
        :always-dirty="true"
      />
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{
            t("setting.blurAppBar")
          }}
        </v-list-item-title>
      </v-list-item-content>
      <v-slider
        v-model="blurAppBar"
        :height="5"
        :min="0"
        :max="20"
        :hint="t('setting.blurAppBar')"
        :always-dirty="true"
      />
    </v-list-item> -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{
            t('setting.themeFont')
          }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            t('setting.themeFontDescription')
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <div class="flex flex-grow-0 gap-1 mr-2">
        <v-btn-toggle
          v-model="fontDelta"
          mandatory
          solo
          dense
        >
          <v-btn
            solo
            class="h-unset!"
          >
            1px
          </v-btn>
          <v-btn
            solo
            class="h-unset!"
          >
            0.1px
          </v-btn>
        </v-btn-toggle>
        <v-btn
          icon
          @click="onFontSizeDecrease"
        >
          <v-icon>
            text_decrease
          </v-icon>
        </v-btn>
        <v-text-field
          :value="`${Math.round(fontSize * 10) / 10}px`"
          readonly
          class="max-w-20"
          solo
          outlined
          dense
          hide-details
        />
        <v-btn
          icon
          @click="onFontSizeIncrease"
        >
          <v-icon>
            text_increase
          </v-icon>
        </v-btn>
      </div>

      <v-btn
        outlined
        text
        style="margin-right: 10px"
        @click="onSelectFont"
      >
        {{ t("setting.themeSelectFont") }}
      </v-btn>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        @click="onRevertFont"
      >
        {{ t("setting.themeResetFont") }}
      </v-btn>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{
            t('setting.themeShare')
          }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            t('setting.themeShareDescription')
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        @click="onExportTheme"
      >
        {{ t("setting.themeExport") }}
      </v-btn>
      <v-btn
        outlined
        text
        style="margin-right: 10px"
        @click="onImportTheme"
      >
        {{ t("setting.themeImport") }}
      </v-btn>
    </v-list-item>
  </div>
</template>
<script lang="ts" setup>
import SettingHeader from '@/components/SettingHeader.vue'
import SettingItemCheckbox from '@/components/SettingItemCheckbox.vue'
import SettingItemSelect from '@/components/SettingItemSelect.vue'
import { kEnvironment } from '@/composables/environment'
import { useService } from '@/composables/service'
import { kSettingsState, useSettings } from '@/composables/setting'
import { BackgroundType, kTheme } from '@/composables/theme'
import { kUILayout } from '@/composables/uiLayout'
import { basename } from '@/util/basename'
import { injection } from '@/util/inject'
import { ThemeServiceKey } from '@xmcl/runtime-api'
import SettingAppearanceColor from './SettingAppearanceColor.vue'

const { showOpenDialog, showSaveDialog } = windowController
const { t } = useI18n()
const { blurSidebar, blurAppBar, isDark, fontSize, blurCard, backgroundColorOverlay, backgroundImage, setBackgroundImage, blur, particleMode, backgroundType, backgroundImageFit, volume, clearBackgroundImage, exportTheme, importTheme } = injection(kTheme)
const { sideBarColor, appBarColor, primaryColor, warningColor, errorColor, cardColor, backgroundColor, resetToDefault, currentTheme, font, setFont, resetFont, backgroundMusic, removeMusic, textColor, visibleCards, enableCardBlur } = injection(kTheme)
const { state } = injection(kSettingsState)
const env = injection(kEnvironment)
const { sidebarPosition } = useSettings()

const linuxTitlebar = computed({
  get: () => state.value?.linuxTitlebar ?? false,
  set: v => state.value?.linuxTitlebarSet(v),
})

const darkModel = computed({
  get: () => isDark.value ? 'dark' : 'light',
  set: v => {
    if (v === 'dark') {
      isDark.value = true
    } else if (v === 'light') {
      isDark.value = false
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  },
})

const layout = injection(kUILayout)

const themes = computed(() => [{
  text: t('setting.theme.dark'),
  value: 'dark',
}, {
  text: t('setting.theme.light'),
  value: 'light',
}, {
  text: t('setting.theme.system'),
  value: 'system',
}])

const showMods = computed({
  get: () => (visibleCards.value as string[]).includes('mod'),
  set: (v) => {
    const val = visibleCards.value as string[];
    if (v) {
      visibleCards.value = [...val, 'mod'] as any;
    } else {
      visibleCards.value = val.filter((c: string) => c !== 'mod') as any;
    }
  }
})
const showResourcePacks = computed({
  get: () => (visibleCards.value as string[]).includes('resource-pack'),
  set: (v) => {
    const val = visibleCards.value as string[];
    if (v) {
      visibleCards.value = [...val, 'resource-pack'] as any;
    } else {
      visibleCards.value = val.filter((c: string) => c !== 'resource-pack') as any;
    }
  }
})
const showShaderPacks = computed({
  get: () => (visibleCards.value as string[]).includes('shader-pack'),
  set: (v) => {
    const val = visibleCards.value as string[];
    if (v) {
      visibleCards.value = [...val, 'shader-pack'] as any;
    } else {
      visibleCards.value = val.filter((c: string) => c !== 'shader-pack') as any;
    }
  }
})
const showSaves = computed({
  get: () => (visibleCards.value as string[]).includes('save'),
  set: (v) => {
    const val = visibleCards.value as string[];
    if (v) {
      visibleCards.value = [...val, 'save'] as any;
    } else {
      visibleCards.value = val.filter((c: string) => c !== 'save') as any;
    }
  }
})
const showScreenshots = computed({
  get: () => (visibleCards.value as string[]).includes('screenshots'),
  set: (v) => {
    const val = visibleCards.value as string[];
    if (v) {
      visibleCards.value = [...val, 'screenshots'] as any;
    } else {
      visibleCards.value = val.filter((c: string) => c !== 'screenshots') as any;
    }
  }
})
const layouts = computed(() => [{
  text: t('setting.layout.default'),
  value: 'default',
}, {
  text: t('setting.layout.focus'),
  value: 'focus',
}])

const sidebarPositions = computed(() => [{
  text: t('setting.sidebarPosition.left'),
  value: 'left',
}, {
  text: t('setting.sidebarPosition.right'),
  value: 'right',
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
function selectImage() {
  showOpenDialog({
    title: t('theme.selectImage'),
    properties: ['openFile'],
    filters: [{
      name: 'image',
      extensions: ['png', 'jpg', 'gif', 'webp'],
    }],
  }).then((v) => {
    const imagePath = v.filePaths[0]
    if (imagePath) {
      setBackgroundImage(imagePath)
    }
  })
}
function selectVideo() {
  showOpenDialog({
    title: t('theme.selectVideo'),
    properties: ['openFile'],
    filters: [{
      name: 'video',
      extensions: ['mp4', 'webm'],
    }],
  }).then((v) => {
    if (v.filePaths[0]) {
      setBackgroundImage(v.filePaths[0])
    }
  })
}

const { addMusic } = injection(kTheme)
function selectMusic() {
  showOpenDialog({
    title: t('theme.selectMusic'),
    properties: ['openFile'],
    filters: [{
      name: 'audio',
      extensions: ['mp3', 'ogg', 'wav'],
    }],
  }).then(async (v) => {
    if (v.filePaths[0]) {
      await addMusic(v.filePaths[0])
    }
  })
}

const { showMediaItemInFolder } = useService(ThemeServiceKey)
function viewMusic(m: string) {
  showMediaItemInFolder(m)
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
    filters: [{
      name: 'xtheme',
      extensions: ['xtheme'],
    }],
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
    filters: [{
      name: 'xtheme',
      extensions: ['xtheme'],
    }],
  }).then((v) => {
    if (v.filePaths[0]) {
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
    filters: [{
      name: 'font',
      extensions: ['ttf', 'otf', 'woff', 'woff2'],
    }],
  }).then((v) => {
    if (v.filePaths[0]) {
      setFont(v.filePaths[0])
    }
  })
}

function onRevertFont() {
  resetFont()
}

</script>

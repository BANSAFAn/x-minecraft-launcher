<template>
  <div
    class="template-content flex h-full flex-col overflow-auto"
    style="overflow: auto; padding: 24px 24px 16px"
  >
    <v-skeleton-loader
      v-if="loading"
      type="list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line"
    />
    <v-list
      v-else
      color="transparent"
      class="flex flex-col overflow-auto p-0"
      two-line
    >
      <v-list-item class="mb-2">
        <div class="flex w-full gap-3">
          <v-select
            v-model="selectedVersionFilterOption"
            class="max-w-40"
            hide-details
            label="Minecraft"
            :items="versionFilterOptions"
            clearable
          />
          <v-spacer />
          <v-text-field
            ref="searchTextRef"
            v-model="filterText"
            hide-details
            filled
            append-icon="filter_list"
            :label="t('filter')"
          />
        </div>
      </v-list-item>
      <v-divider />
      <v-virtual-scroll
        :bench="8"
        class="visible-scroll ml-2 h-full max-h-full overflow-auto"
        :items="items"
        :item-height="72"
      >
        <template #default="{ item: p }">
          <InstanceItem
            :key="p.filePath"
            :icon="p.instance.icon"
            :name="p.name"
            :runtime="p.instance.runtime"
            :description="p.description"
            :value="selectedTemplate === p"
            @select="onSelect(p)"
          />
        </template>
      </v-virtual-scroll>
    </v-list>
  </div>
</template>

<script lang=ts setup>
import { useGetFeedTheBeastVersionsCache } from '@/composables/ftb'
import { kInstanceCreation } from '@/composables/instanceCreation'
import { kJavaContext } from '@/composables/java'
import { kPeerShared } from '@/composables/peers'
import { injection } from '@/util/inject'
import { Ref } from 'vue'
import { Template, useInstanceTemplates } from '../composables/instanceTemplates'
import { useModpacks } from '@/composables/modpack'
import InstanceItem from './InstanceItem.vue'

const emit = defineEmits(['select'])

// Templates
const { all } = injection(kJavaContext)
const { connections } = injection(kPeerShared)
const { getFeaturedModpacks } = useGetFeedTheBeastVersionsCache()
const { getTemplates } = useInstanceTemplates(all)
const { state } = useModpacks()
const templates = computed(() => {
  const ftb = getFeaturedModpacks()
  return getTemplates(state.value?.files || [], connections.value, ftb)
})

const selectedTemplatePath = inject('template', ref(''))
const selectedTemplate = computed(() => templates.value.find(f => f.filePath === selectedTemplatePath.value))
function onSelect(template: Template) {
  if (selectedTemplate.value === template) {
    emit('select')
    return
  }
  selectedTemplatePath.value = template.filePath
}
const creationData = injection(kInstanceCreation)
const loading = creationData.loading
watch(selectedTemplate, async (t) => {
  if (!t) return
  await creationData.update(t.instance, t.loadFiles())
  emit('select')
}, { immediate: true })

const filterText = ref('')
const versionFilterOptions = computed(() => templates.value.map(v => v.instance.runtime.minecraft).filter((v): v is string => !!v))
const selectedVersionFilterOption = ref('')
const searchTextRef: Ref<null | HTMLElement> = ref(null)
const { t } = useI18n()

const items = computed(() => templates.value.filter((template) => {
  if (selectedVersionFilterOption.value) {
    if (template.instance.runtime.minecraft !== selectedVersionFilterOption.value) return false
  }
  const searching = (filterText.value ?? '').toLowerCase()
  if (searching.length === 0) {
    return true
  }
  if (template.name.toLowerCase().indexOf(searching) !== -1) {
    return true
  }
  if (template.instance.runtime.minecraft.toLowerCase().indexOf(searching) !== -1) {
    return true
  }
  if (template.instance.runtime.forge?.toLowerCase().indexOf(searching) !== -1) {
    return true
  }
  if (template.instance.runtime.fabricLoader?.toLowerCase().indexOf(searching) !== -1) {
    return true
  }
  return false
}).sort((a, b) => a.name.localeCompare(b.name)))

onUnmounted(() => {
  filterText.value = ''
})
</script>

<style>
.java-select .v-select__selection {
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;

  max-width: 240px;
}
.v-stepper__step span {
  margin-right: 12px !important;
}
.v-stepper__step div {
  display: flex !important;
}

.template-content
  .theme--.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  border: none;
}
</style>

<template>
  <div class="settings-card">
    <h3 class="card-title">
      <v-icon class="title-icon">memory</v-icon>
      {{ t("java.memoryAllocation") }}
    </h3>
    <div class="memory-settings">
      <v-progress-linear class="memory-progress-bar" :active="assignMemory !== false" :value="minMemoryProgress"
        color="deep-orange" :buffer-value="maxMemoryProgress" striped stream height="25" rounded>
        <template #default="{ value }">
          <strong class="pl-4">
            {{ t('java.minMemory') + ' ' + getExpectedSize(minMemory, 'B') }}
          </strong>
          <div class="flex-grow" />
          <strong class="pr-4">
            {{ t('java.maxMemory') + ' ' + getExpectedSize(maxMemory, 'B') }}
          </strong>
        </template>
      </v-progress-linear>

      <v-range-slider v-if="assignMemory !== false" :input-value="mem" :disabled="assignMemory !== true"
        :max="sysmem.total" min="0" :step="step" class="memory-range-slider" height="8"
        track-fill-color="var(--v-primary)" track-color="var(--v-surface-variant)" thumb-color="white"
        thumb-label="always" hide-details @input="mem = $event">
        <template #thumb-label="{ value }">
          <span class="thumb-label-text">{{ getExpectedSize(value, '', 1) }}</span>
        </template>
      </v-range-slider>

      <v-progress-linear class="system-memory-bar mt-3" :value="memoryProgress" color="blue" height="25" rounded
        reverse>
        <template #default="{ value }">
          <div class="flex items-center justify-center">
            <v-icon left>memory</v-icon>
            <strong class="flex flex-grow-0 items-center justify-center">
              {{ t('java.systemMemory', {
                free: getExpectedSize(sysmem.free, 'B'), total: getExpectedSize(sysmem.total,
                  'B')
              }) }}
            </strong>
          </div>
        </template>
      </v-progress-linear>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getExpectedSize } from '@/util/size'
import { Ref } from 'vue'
import { BaseServiceKey, JavaRecord } from '@xmcl/runtime-api'
import { useService } from '@/composables'
import { injection } from '@/util/inject'
import { kInstanceModsContext } from '@/composables/instanceMods'

const props = defineProps<{
  assignMemory: boolean | 'auto'
  min: number
  max: number
}>()
const emit = defineEmits(['update:max', 'update:min'])

const { t } = useI18n()
const { getMemoryStatus } = useService(BaseServiceKey)

const step = 1024 * 1024 * 512
const sysmem: Ref<{ total: number; free: number }> = ref({ total: 0, free: 0 })

const memoryProgress = computed(() => (sysmem.value.total - sysmem.value.free) / sysmem.value.total * 100)
const { enabledMods } = injection(kInstanceModsContext)
const minMemory = computed(() => {
  if (props.assignMemory === 'auto') {
    const modCount = enabledMods.value.length
    let minMemory = 0

    if (modCount === 0) {
      minMemory = 1024
    } else {
      const level = modCount / 25
      const rounded = Math.floor(level)
      const percentage = level - rounded
      minMemory = rounded * 1024 + (percentage > 0.5 ? 512 : 0) + 1024
    }

    return minMemory * 1024 * 1024
  }

  return props.min * 1024 * 1024
})
const maxMemory = computed(() => props.assignMemory === 'auto' ? sysmem.value.total : props.max * 1024 * 1024)

const mem = computed({
  get(): [number, number] {
    return [minMemory.value, maxMemory.value]
  },
  set(mem: [number, number]) {
    emit('update:min', Math.floor(mem[0] / 1024 / 1024))
    emit('update:max', Math.floor(mem[1] / 1024 / 1024))
  },
})

const minMemoryProgress = computed(() => (minMemory.value) / (sysmem.value.total || 1) * 100)
const maxMemoryProgress = computed(() => (maxMemory.value) / (sysmem.value.total || 1) * 100)

const updateTotalMemory = () => {
  getMemoryStatus().then(({ total, free }) => {
    sysmem.value.total = total
    sysmem.value.free = free
  })
}

let interval: any

onUnmounted(() => {
  clearInterval(interval)
})
onMounted(() => {
  updateTotalMemory()
  interval = setInterval(updateTotalMemory, 1000)
})
</script>

<style scoped>
.settings-card {
  background-color: var(--v-surface-variant);
  border: 2px solid var(--v-outline);
  border-radius: 12px;
  padding: 20px;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.settings-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(145deg, var(--v-primary) 0%, transparent 70%);
  border-radius: 12px;
  opacity: 0.1;
  z-index: -1;
}

.settings-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  transform: translateY(-3px);
  border-color: var(--v-primary);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--v-on-surface);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--v-outline-variant);
}

.title-icon {
  color: var(--v-primary);
  font-size: 1.3rem;
}

.memory-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.memory-range-slider {
  margin-top: -25px;
  margin-bottom: 8px;
  z-index: 1;
}

.thumb-label-text {
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
}

/* Deep styles for Vuetify components */
:deep(.v-progress-linear__background) {
  background-color: var(--v-surface-variant) !important;
}

:deep(.v-progress-linear__buffer) {
  background-color: var(--v-surface-container-highest) !important;
}

:deep(.v-slider__track-container) {
  border-radius: 4px;
}

:deep(.v-slider__track-background) {
  background-color: var(--v-surface-variant) !important;
}

:deep(.v-slider__track-fill) {
  background-color: var(--v-primary) !important;
}

:deep(.v-slider__thumb) {
  width: 20px !important;
  height: 20px !important;
  border: 2px solid white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

:deep(.v-slider__thumb-label) {
  background-color: white !important;
  color: rgba(0, 0, 0, 0.87) !important;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  font-weight: 500;
}
</style>

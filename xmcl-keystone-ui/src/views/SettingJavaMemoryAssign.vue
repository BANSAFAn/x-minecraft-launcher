<template>
  <div class="settings-card">
    <h3 class="card-title">
      <v-icon class="title-icon">memory</v-icon>
      {{ t("java.memoryAssignment") }}
    </h3>
    <div class="memory-assign-control">
      <v-btn-toggle v-model="memoryMode" mandatory dense class="memory-toggle">
        <v-btn value="unassigned">
          <v-icon left>hide_source</v-icon>
          {{ t('java.memoryUnassigned') }}
        </v-btn>
        <v-btn value="auto">
          <v-icon left color="primary">memory</v-icon>
          {{ t('java.memoryAuto') }}
        </v-btn>
        <v-btn value="manual">
          <v-icon left color="deep-orange">pinch</v-icon>
          {{ t('java.memoryManual') }}
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const props = defineProps<{
  value: boolean | 'auto'
}>()
const emit = defineEmits(['input'])

const memoryMode = computed({
  get() {
    if (props.value === 'auto') return 'auto'
    return props.value ? 'manual' : 'unassigned'
  },
  set(v: 'unassigned' | 'auto' | 'manual') {
    if (v === 'unassigned') {
      emit('input', false)
    } else if (v === 'auto') {
      emit('input', 'auto')
    } else {
      emit('input', true)
    }
  },
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

.memory-assign-control {
  display: flex;
  justify-content: center;
}

.memory-toggle {
  background-color: var(--v-surface-container-low);
  border: 2px solid var(--v-outline);
  border-radius: 8px;
  overflow: hidden;
}

.memory-toggle .v-btn {
  background-color: transparent;
  color: var(--v-on-surface-variant);
  border: none !important;
  border-radius: 0;
  text-transform: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.memory-toggle .v-btn:not(:last-child) {
  border-right: 2px solid var(--v-outline) !important;
}

.memory-toggle .v-btn:hover {
  background-color: var(--v-surface-container);
}

.memory-toggle .v-btn--active {
  background-color: var(--v-primary);
  color: white;
}

.memory-toggle .v-btn--active:hover {
  background-color: var(--v-primary-darken-1);
}
</style>

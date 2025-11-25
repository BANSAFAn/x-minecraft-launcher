<template>
  <div class="settings-page">
    <SettingHeader>
      🔑 {{ t('userService.title') }}
    </SettingHeader>

    <div class="content-grid">
      <!-- User Services Settings -->
      <div class="settings-card full-width">
        <div class="card-header">
          <h3 class="card-title">
            <v-icon class="title-icon">account_circle</v-icon>
            {{ t('userService.services') }}
          </h3>
          <v-btn v-shared-tooltip.left="_ => t('userService.add')" class="add-btn" icon @click="addNew">
            <v-icon>add</v-icon>
          </v-btn>
        </div>

        <div class="services-list">
          <div v-for="(a, i) of items || []" :key="i" class="service-item">
            <div class="service-input">
              <v-text-field v-model="a.url" :readonly="!a.new" filled dense hide-details class="custom-input"
                :placeholder="t('userService.baseUrlHint')" :rules="urlsRules" />
            </div>
            <div class="service-actions">
              <v-btn v-if="a.new" class="action-btn save-btn" icon @click="save(a)">
                <v-icon>save</v-icon>
              </v-btn>
              <v-btn v-else class="action-btn delete-btn" icon @click="remove(a)">
                <v-icon>delete</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingHeader from '@/components/SettingHeader.vue'
import { useService } from '@/composables'
import { kSupportedAuthorityMetadata } from '@/composables/yggrasil'
import { vSharedTooltip } from '@/directives/sharedTooltip'
import { injection } from '@/util/inject'
import { UserServiceKey } from '@xmcl/runtime-api'
import { Ref } from 'vue'

type AuthorityItem = {
  new?: boolean
  url: string
}
const { data: services, mutate } = injection(kSupportedAuthorityMetadata)

const items: Ref<(AuthorityItem)[]> = ref([])
watch(services, (s) => {
  if (!s) return
  items.value = s.filter(api => api.kind === 'yggdrasil').map(api => ({ url: api.authority, new: false, isConnect: false }))
}, { immediate: true })

const { addYggdrasilService, removeYggdrasilService } = useService(UserServiceKey)
const { t } = useI18n()

const addNew = () => {
  if (items.value?.every(v => !v.new)) {
    items.value.push({ url: '', new: true })
  }
}

const isValidUrl = (s: string) => {
  try {
    const u = new URL(s)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch (e) { return false }
}
const urlsRules = [
  (v: string | undefined) => v && isValidUrl(v),
]

const save = async (api: AuthorityItem) => {
  await addYggdrasilService(api.url)
  mutate()
}
const remove = async (api: AuthorityItem) => {
  await removeYggdrasilService(api.url)
  mutate()
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

.settings-card.full-width {
  grid-column: 1 / -1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--v-on-surface);
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

.add-btn {
  background-color: var(--v-surface-container-low);
  border: 2px solid var(--v-outline);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background-color: var(--v-surface-container);
  border-color: var(--v-primary);
  transform: translateY(-1px);
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: var(--v-surface-container-low);
  border: 2px solid var(--v-outline);
  border-radius: 8px;
  padding: 16px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.service-item:hover {
  background-color: var(--v-surface-container);
  border-color: var(--v-primary);
}

.service-input {
  flex-grow: 1;
}

.service-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.save-btn {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.save-btn:hover {
  background-color: rgba(76, 175, 80, 0.3);
  transform: translateY(-1px);
}

.delete-btn {
  background-color: rgba(244, 67, 54, 0.2);
  color: #F44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.delete-btn:hover {
  background-color: rgba(244, 67, 54, 0.3);
  transform: translateY(-1px);
}

.custom-input {
  background-color: var(--v-surface-container-low);
  border: 2px solid var(--v-outline);
  border-radius: 8px;
}

.custom-input.v-text-field--outlined:hover fieldset {
  border-color: var(--v-primary);
}

.custom-input.v-text-field--outlined.v-input--is-focused fieldset {
  border-color: var(--v-primary);
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
}

:deep(.v-text-field .v-input__control .v-input__slot) {
  background-color: var(--v-surface-container-low);
  border-radius: 8px;
}

:deep(.v-text-field.v-input--is-focused .v-input__slot) {
  background-color: var(--v-surface-container);
}
</style>

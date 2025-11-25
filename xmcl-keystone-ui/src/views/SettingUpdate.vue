<template>
  <div class="settings-page">
    <SettingHeader>
      🚀 {{ t("setting.update") }}
    </SettingHeader>

    <div class="content-grid">
      <!-- Update Status -->
      <div class="settings-card full-width">
        <h3 class="card-title">
          <v-icon class="title-icon">system_update</v-icon>
          {{ t('setting.updateStatus') }}
        </h3>
        <div class="update-control">
          <div class="version-info">
            <div class="version-label">{{ t("setting.latestVersion") }}</div>
            <div class="version-text">
              v{{ version }}
              <span v-if="hasNewUpdate && updateInfo" class="update-badge">
                {{ updateInfo.name }} available
              </span>
            </div>
          </div>
          <div class="update-actions">
            <v-btn icon :loading="checkingUpdate" @click="checkUpdate" class="action-icon-btn">
              <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn :loading="checkingUpdate || installing" :disabled="updateStatus === 'none'"
              :color="updateStatus !== 'none' ? 'primary' : ''" :text="updateStatus === 'none'"
              @click="showUpdateInfo()" class="action-btn">
              {{
                updateStatus === "none"
                  ? t("launcherUpdate.alreadyLatest")
                  : updateStatus === "pending"
                    ? t("launcherUpdate.updateToThisVersion")
                    : t("launcherUpdate.installAndQuit")
              }}
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Auto Update Settings -->
      <div class="settings-card">
        <h3 class="card-title">
          <v-icon class="title-icon">schedule</v-icon>
          {{ t('setting.autoUpdateSettings') }}
        </h3>
        <div class="settings-list">
          <SettingItemCheckbox v-model="autoInstallOnAppQuit" :title="t('setting.autoInstallOnAppQuit')"
            :text="t('setting.autoInstallOnAppQuit')" :description="t('setting.autoInstallOnAppQuitDescription')" />
          <SettingItemCheckbox v-model="autoDownload" :title="t('setting.autoDownload')"
            :text="t('setting.autoDownload')" :description="t('setting.autoDownloadDescription')" />
          <SettingItemCheckbox v-model="allowPrerelease" :title="t('setting.allowPrerelease')"
            :text="t('setting.allowPrerelease')" :description="t('setting.allowPrereleaseDescription')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SettingHeader from '@/components/SettingHeader.vue'
import SettingItemCheckbox from '@/components/SettingItemCheckbox.vue'
import { vSharedTooltip } from '@/directives/sharedTooltip'
import { injection } from '@/util/inject'
import { useDialog } from '../composables/dialog'
import { kUpdateSettings } from '../composables/setting'

const { show: showUpdateInfo } = useDialog('update-info')
const { updateInfo, installing, updateStatus, checkUpdate, checkingUpdate, version } = injection(kUpdateSettings)
const hasNewUpdate = computed(() => updateInfo.value?.name !== version.value)
const { t } = useI18n()

const autoInstallOnAppQuit = ref(false)
const autoDownload = ref(false)
const allowPrerelease = ref(false)
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

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.update-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.version-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.version-label {
  font-weight: 500;
  color: var(--v-on-surface-variant);
  font-size: 0.85rem;
}

.version-text {
  color: var(--v-on-surface);
  font-size: 1.2rem;
  font-weight: 500;
}

.update-badge {
  color: #4CAF50;
  font-weight: 600;
  font-size: 0.9rem;
}

.update-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-icon-btn {
  background-color: var(--v-surface-container-low);
  border: 2px solid var(--v-outline);
  border-radius: 50%;
}

.action-btn {
  border-radius: 8px;
}

:deep(.v-list-item) {
  background-color: var(--v-surface-container-low);
  border: 1px solid var(--v-outline);
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

:deep(.v-list-item:hover) {
  background-color: var(--v-surface-container);
  border-color: var(--v-primary);
}

:deep(.v-list-item__title) {
  color: var(--v-on-surface) !important;
  font-size: 0.95rem !important;
}

:deep(.v-list-item__subtitle) {
  color: var(--v-on-surface-variant) !important;
  font-size: 0.85rem !important;
  white-space: normal !important;
  line-height: 1.4 !important;
}
</style>

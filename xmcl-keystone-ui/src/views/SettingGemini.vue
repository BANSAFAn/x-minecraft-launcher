<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ t('setting.geminiApiKey') }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ t('setting.geminiApiKeyHint') }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-text-field
        v-model="geminiApiKey"
        hide-details
        dense
        :placeholder="t('setting.geminiApiKey')"
        @input="onInput"
      />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts" setup>
import { useSettings } from '@/composables'

const { t } = useI18n()
const { geminiApiKey, state } = useSettings()

const onInput = (v: string) => {
  state.value?.geminiApiKeySet(v)
}
</script>
<template>
  <div class="items-center justify-center flex flex-col gap-6 select-none">
    <v-icon size="60">
      hail
    </v-icon>
    <span class="text-lg">
      {{ t('askAICrash.description') }}
    </span>
    <div class="ai-section">
      <v-textarea
        v-model="question"
        :label="t('askAICrash.question')"
        rows="2"
        auto-grow
      />
      <v-btn
        color="primary"
        :loading="loading"
        @click="askAI"
      >
        {{ t('askAICrash.ask') }}
      </v-btn>
      <div
        v-if="answer"
        class="answer"
      >
        {{ answer }}
      </div>
    </div>
    <ol>
      <li>
        {{ t('askAICrash.copyPrompt') }}
        <v-btn
          color="primary"
          :outlined="copied"
          small
          @click="onCopyPrompt"
        >
          <v-icon left>
            {{ copied ? 'check' : 'smart_toy' }}
          </v-icon>
          {{ t('copyClipboard.success') }}
        </v-btn>
      </li>
      <li>
        {{ t('askAICrash.selectPlatform') }}
        <ul>
          <template v-if="useCNAI">
            <li><a
              href="https://chatglm.cn/share/kFiK3rVp"
              @click="onCopyRaw"
            > <img
              width="21"
              src="https://chatglm.cn/img/icons/favicon.svg"
            > GLM</a></li>
            <li><a href="https://doubao.com/chat"> <img
              width="21"
              src="https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/web/logo-icon.png"
            > 豆包</a></li>
            <li><a href="https://chat.deepseek.com/"><img src="https://chat.deepseek.com/favicon.svg">Deepseek</a></li>
            <li><a href="https://www.tongyi.com/"><img src="https://assets.alicdn.com/g/qwenweb/qwen-webui-fe/0.0.209/static/favicon.png"> Qwen </a></li>
          </template>
          <template v-else>
            <li><a href="https://chat.openai.com"> <img
              width="21"
              src="https://openai.com/favicon.svg"
            > ChatGPT</a></li>
            <li><a href="https://gemini.google.com"> <img
              width="21"
              src="https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg"
            > Gemini</a></li>
            <li><a href="https://chat.deepseek.com/"><img
              width="21"
              src="https://chat.deepseek.com/favicon.svg"
            >Deepseek</a></li>
            <li><a href="https://chat.z.ai"> <img
              width="21"
              src="https://z-cdn.chatglm.cn/z-ai/static/logo.svg"
            > z.ai</a></li>
            <li><a href="https://chat.qwen.ai/"> <img
              width="21"
              src="https://assets.alicdn.com/g/qwenweb/qwen-webui-fe/0.0.209/static/favicon.png"
            > Qwen</a></li>
          </template>
        </ul>
      </li>
    </ol>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';\nimport { useService } from '@/composables';\nimport { kSettingsState } from '@/composables/setting';\nimport { injection } from '@/util/inject';
import { kSettingsState } from '@/composables/setting';
import { injection } from '@/util/inject';

const { t } = useI18n();
const props = defineProps<{
  getPrompt: (raw?: boolean) => string;
  useCNAI: boolean;
}>();

const copied = ref(false);
function onCopyPrompt() {
  windowController.writeClipboard(props.getPrompt());
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function onCopyRaw() {
  windowController.writeClipboard(props.getPrompt(true));
}

const question = ref('');
const answer = ref('');
const loading = ref(false);

const { state } = injection(kSettingsState);

async function askAI() {\n  if (!question.value) return;\n  if (!state.geminiApiKey) {\n    answer.value = t('askAICrash.noApiKey');\n    return;\n  }\n  loading.value = true;\n  answer.value = '';\n  try {\n    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${state.geminiApiKey}`, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify({\n        contents: [{\n          parts: [{\n            text: `${props.getPrompt()}\\n\\nMy question is: ${question.value}`,\n          }],\n        }],\n      }),\n    });\n    if (response.ok) {\n      const result = await response.json();\n      answer.value = result.candidates[0].content.parts[0].text;\n    } else {\n      answer.value = `Error: ${response.statusText}`;\n    }\n  } catch (e) {\n    answer.value = `Error: ${e.message}`;\n  } finally {\n    loading.value = false;\n  }\n}\n</script>
<style scoped>
.ai-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.answer {
  white-space: pre-wrap;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 4px;
}
</style>
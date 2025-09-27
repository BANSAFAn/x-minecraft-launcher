<template>
  <GridLayout
    class="z-1"
    :layout="layout"
    :responsive-layouts="filteredLayouts"
    :is-draggable="true"
    :cols="cols"
    :col-num="12"
    :row-height="32"
    :is-resizable="true"
    :responsive="true"
    :vertical-compact="true"
    :use-css-transforms="true"
    @breakpoint-changed="onBreakpoint"
    @update:layout="onUpdateLayout"
  >
    <HomeGridItem
      v-for="item in layout"
      :key="item.i"
      :item="item"
      :on-resized="onResized"
      :mod-row-count="modRowCount"
      :resource-pack-row-count="resourcePackRowCount"
      :save-row-count="saveRowCount"
      :screenshot-height="screenshotHeight"
      :instance="instance"
      :is-type="isType"
      :CardType="CardType"
    />
  </GridLayout>
</template>
<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { kInstance } from '@/composables/instance'
import { injection } from '@/util/inject'
import debounce from 'lodash.debounce'
import { GridItem, GridLayout } from 'vue-grid-layout'
import HomeModCard from './HomeModCard.vue'
import HomeResourcePacksCard from './HomeResourcePacksCard.vue'
import HomeSavesCard from './HomeSavesCard.vue'
import HomeScreenshotCard from './HomeScreenshotCard.vue'
import HomeShaderPackCard from './HomeShaderPackCard.vue'
import HomeGridItem from './HomeGridItem.vue'
import { kTheme } from '@/composables/theme'
import { computed, ref, watch } from 'vue'
import { kUpstream } from '@/composables/instanceUpdate'

const { instance } = injection(kInstance)
const { visibleCards } = injection(kTheme)

provide(kUpstream, computed(() => ({ upstream: instance.value.upstream, minecraft: instance.value.runtime.minecraft })))

enum CardType {
  Mod,
  ResourcePack,
  ShaderPack,
  Save,
  Screenshots,
}

function rawType(type: CardType) {
  return type + ''
}

function isType(id: string, type: CardType) {
  const [typeString, param] = id.split('@')
  return Number(typeString) === type
}

interface GridItemType {
  x: number
  y: number
  w: number
  h: number
  i: string
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
}

const cols = { lg: 12, md: 12, sm: 6, xs: 4, xxs: 4 }

const fullLayouts = useLocalStorage('cardsLayout', () => ({
  md: [
    { x: 0, y: 0, w: 3, h: 9, minW: 2, minH: 4, i: rawType(CardType.Mod) },
    { x: 9, y: 0, w: 3, h: 9, minW: 2, minH: 4, i: rawType(CardType.ResourcePack) },
    { x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 4, i: rawType(CardType.Save) },
    { x: 6, y: 0, w: 3, h: 4, minW: 2, minH: 4, i: rawType(CardType.ShaderPack) },
    { x: 3, y: 4, w: 6, h: 5, minW: 3, minH: 4, i: rawType(CardType.Screenshots) },
  ],
  lg: [
    { x: 0, y: 0, w: 3, h: 9, minW: 2, minH: 4, i: rawType(CardType.Mod) },
    { x: 9, y: 0, w: 3, h: 9, minW: 2, minH: 4, i: rawType(CardType.ResourcePack) },
    { x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 4, i: rawType(CardType.Save) },
    { x: 6, y: 0, w: 3, h: 4, minW: 2, minH: 4, i: rawType(CardType.ShaderPack) },
    { x: 3, y: 4, w: 6, h: 5, minW: 3, minH: 4, i: rawType(CardType.Screenshots) },
  ],
  sm: [
    { x: 0, y: 0, w: 2, h: 6, minW: 2, minH: 4, i: rawType(CardType.Mod) },
    { x: 2, y: 0, w: 2, h: 5, minW: 2, minH: 4, i: rawType(CardType.ResourcePack) },
    { x: 2, y: 5, w: 2, h: 5, minW: 2, minH: 4, i: rawType(CardType.ShaderPack) },
    { x: 0, y: 6, w: 2, h: 4, minW: 2, minH: 4, i: rawType(CardType.Save) },
    { x: 4, y: 0, w: 2, h: 10, minW: 2, minH: 4, i: rawType(CardType.Screenshots) },
  ],
  xs: [
    { x: 0, y: 0, w: 2, h: 6, minW: 2, minH: 4, i: rawType(CardType.Mod) },
    { x: 2, y: 4, w: 2, h: 4, minW: 2, minH: 4, i: rawType(CardType.Save) },
    { x: 0, y: 6, w: 2, h: 6, minW: 2, minH: 4, i: rawType(CardType.ResourcePack) },
    { x: 2, y: 0, w: 2, h: 4, minW: 2, minH: 4, i: rawType(CardType.ShaderPack) },
    { x: 2, y: 8, w: 2, h: 4, minW: 1, minH: 4, i: rawType(CardType.Screenshots) },
  ],
}), { serializer: { read: JSON.parse, write: JSON.stringify } })

const layout = ref<GridItemType[]>([])

let lastBreakpoint: Breakpoint = 'lg'

type Breakpoint = 'lg' | 'md' | 'sm' | 'xs'

function getCardKey(i: string): keyof typeof visibleCards.value {
  const type = Number(i)
  switch (type) {
    case CardType.Mod: return 'mods'
    case CardType.ResourcePack: return 'resourcePacks'
    case CardType.ShaderPack: return 'shaderPacks'
    case CardType.Save: return 'saves'
    case CardType.Screenshots: return 'screenshots'
    default: throw new Error(`Unknown card type ${type}`)
  }
}

const filteredLayouts = computed<Record<Breakpoint, GridItemType[]>>(() => ({
  lg: fullLayouts.value.lg.filter((item: GridItemType) => visibleCards.value[getCardKey(item.i)]),
  md: fullLayouts.value.md.filter((item: GridItemType) => visibleCards.value[getCardKey(item.i)]),
  sm: fullLayouts.value.sm.filter((item: GridItemType) => visibleCards.value[getCardKey(item.i)]),
  xs: fullLayouts.value.xs.filter((item: GridItemType) => visibleCards.value[getCardKey(item.i)]),
}))

watch(filteredLayouts, () => {
  layout.value = filteredLayouts.value[lastBreakpoint] ?? []
}, { immediate: true })

const onBreakpoint = (newBreakpoint: Breakpoint) => {
  lastBreakpoint = newBreakpoint
}

const onUpdateLayout = (newLayout: GridItemType[]) => {
  layout.value = newLayout
  const full = fullLayouts.value[lastBreakpoint]
  for (const f of full) {
    const found = newLayout.find(n => n.i === f.i)
    if (found) {
      f.x = found.x
      f.y = found.y
      f.w = found.w
      f.h = found.h
    }
  }
  localStorage.setItem('cardsLayout', JSON.stringify(fullLayouts.value))
}

const containerWidths = reactive({
  [CardType.Mod]: 0,
  [CardType.ResourcePack]: 0,
  [CardType.Save]: 0,
  [CardType.ShaderPack]: 0,
} as Record<string, number>)

const screenshotHeight = ref(0)

const saveLayouts = debounce(() => {
  localStorage.setItem('cardsLayout', JSON.stringify(fullLayouts.value))
}, 500)

let screenshotItem = undefined as undefined | HTMLElement

const onResized = (i: string, newH: number, newW: number, newHPx: number, newWPx: number) => {
  containerWidths[i] = newWPx
  if (Number(i) === CardType.Screenshots) {
    if (!screenshotItem) {
      screenshotItem = document.getElementsByClassName('screenshot-item').item(0) as HTMLElement
    }
    if (screenshotItem) {
      nextTick().then(() => {
        const h = screenshotItem!.style.height
        screenshotHeight.value = Number(h.substring(0, h.length - 2))
      })
    } else {
      screenshotHeight.value = Number(newHPx)
    }
  }
  fullLayouts.value[lastBreakpoint] = layout.value
  saveLayouts()
}

const getRowCount = (width: number) => width ? Math.floor((width - 34) / 30) : 7
const resourcePackRowCount = computed(() => getRowCount(containerWidths[CardType.ResourcePack]))
const modRowCount = computed(() => getRowCount(containerWidths[CardType.Mod]))
const saveRowCount = computed(() => getRowCount(containerWidths[CardType.Save]))
</script>


<style scoped>
.vue-grid-layout {
  padding: 0 4px;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    /* background: #ccc; */
}

.vue-grid-placeholder {
  background: var(--color-primary);
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#FFFFFF'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>

&lt;template functional&gt;
  &lt;GridItem
    :key=&quot;props.item.i&quot;
    :x=&quot;props.item.x&quot;
    :y=&quot;props.item.y&quot;
    :w=&quot;props.item.w&quot;
    :h=&quot;props.item.h&quot;
    :min-w=&quot;props.item.minW&quot;
    :min-h=&quot;props.item.minH&quot;
    :i=&quot;props.item.i&quot;
    drag-allow-from=&quot;.v-card__title&quot;
    drag-ignore-from=&quot;.no-drag&quot;
    :class=&quot;{ 'screenshot-item': Number(props.item.i) === props.CardType.Screenshots }&quot;
    @container-resized=&quot;listeners.onResized&quot;
    @resized=&quot;listeners.onResized&quot;
  &gt;
    &lt;HomeModCard
      v-if=&quot;props.isType(props.item.i, props.CardType.Mod)&quot;
      :row-count=&quot;props.modRowCount&quot;
      :row=&quot;props.item.h - 4&quot;
    /&gt;
    &lt;HomeResourcePacksCard
      v-else-if=&quot;props.isType(props.item.i, props.CardType.ResourcePack)&quot;
      :row-count=&quot;props.resourcePackRowCount&quot;
      :row=&quot;props.item.h - 4&quot;
    /&gt;
    &lt;HomeShaderPackCard
      v-else-if=&quot;props.isType(props.item.i, props.CardType.ShaderPack)&quot;
    /&gt;
    &lt;HomeSavesCard
      v-else-if=&quot;props.isType(props.item.i, props.CardType.Save)&quot;
      :row-count=&quot;props.saveRowCount&quot;
      :row=&quot;props.item.h - 4&quot;
    /&gt;
    &lt;HomeScreenshotCard
      v-else-if=&quot;props.isType(props.item.i, props.CardType.Screenshots)&quot;
      :width=&quot;props.item.w&quot;
      :height=&quot;props.screenshotHeight&quot;
      :instance=&quot;props.instance&quot;
    /&gt;
  &lt;/GridItem&gt;
&lt;/template&gt;

&lt;script lang=&quot;ts&quot;&gt;
import HomeModCard from './HomeModCard.vue'
import HomeResourcePacksCard from './HomeResourcePacksCard.vue'
import HomeShaderPackCard from './HomeShaderPackCard.vue'
import HomeSavesCard from './HomeSavesCard.vue'
import HomeScreenshotCard from './HomeScreenshotCard.vue'
import { GridItem } from 'vue-grid-layout'

export default {
  components: {
    HomeModCard,
    HomeResourcePacksCard,
    HomeShaderPackCard,
    HomeSavesCard,
    HomeScreenshotCard,
    GridItem,
  },
  props: ['item', 'onResized', 'modRowCount', 'resourcePackRowCount', 'saveRowCount', 'screenshotHeight', 'instance', 'isType', 'CardType'],
  functional: true,
}
&lt;/script&gt;
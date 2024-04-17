<template>
  <td :class="classNames('px-4 py-2.5', props.class)" :colspan="colSpan">
    <slot />
  </td>
</template>
<script setup>

import classNames from 'classnames'
import { injectTableContext } from './TableRoot.vue'

const props = defineProps({
  class: {
    type: String,
    default: ''
  },
  colSpan: {
    type: Number,
    default: 1,
  }
})

const rootContext = injectTableContext()

</script>
<script>
export default {
  __KOR_TABLE_CELL__: true,
}
</script>
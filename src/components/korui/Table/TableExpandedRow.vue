<template>
  <tr v-show="computedIsOpen" class="border-b" scope="row">
    <slot />
  </tr>
</template>
<script setup>

import { computed } from 'vue'
import { injectTableContext } from './TableRoot.vue'
import useId from '@/Utils/useId'

const props = defineProps({
  id: {
    type: [String, Number],
    default: () => useId(),
  },
})

const rootContext = injectTableContext('TableContext')

const computedIsOpen = computed(() => {
  return rootContext.openedRows.value.has(props.id)
})

</script>
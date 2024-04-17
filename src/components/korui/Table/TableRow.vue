<template>
  <tr @click="onClick" :class="classNames('border-b',
    {
      'hover:bg-gray-100 duration-300 ease-in-out': rootContext.hoverable,
      'cursor-pointer': rootContext.expandable,
    })" scope="row">
    <td v-if="rootContext.expandable" class="px-4 py-2.5">
      <ChevronUpIcon v-if="computedIsOpen" class="w-5 h-4 text-slate-900 stroke-2 duration-300" />
      <ChevronDownIcon v-else class="w-5 h-4 text-slate-700 duration-300" />
    </td>
    <slot />
  </tr>
</template>
<script setup>

import { ref, computed, onMounted } from 'vue'
import classNames from 'classnames'
import { injectTableContext } from './TableRoot.vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import useId from '@/Utils/useId'

const props = defineProps({
  id: {
    type: [String, Number],
    default: () => useId(),
  },
})

const rootContext = injectTableContext()

const computedIsOpen = computed(() => {
  return rootContext.openedRows.value.has(props.id)
})

function onClick() {
  if (rootContext.expandable) {
    rootContext.toggleExpanded(props.id)
  }
}

onMounted(() => {
  rootContext.addRow(props.id)
})

</script>
<script>
export default {
  __KOR_TABLE_ROW__: true,
}
</script>
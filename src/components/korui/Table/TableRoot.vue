<template>
  <table class="w-full text-left">
    <component
      :is="computedTableHeader"
      v-bind="computedTableHeader.props"
    />

    <component
      :is="computedTableBody"
      v-bind="computedTableBody.props"
    />
  </table>
</template>
<script>
import { createContext } from '@/shared/createContext'

export const [injectTableContext, provideTableContext] = createContext('TableContext')
</script>
<script setup>

import { ref, computed, useSlots } from 'vue'

const props = defineProps({
  hoverable: {
    type: Boolean,
    default: () => false,
  },
  expandable: {
    type: Boolean,
    default: () => false,
  },
})

const slots = useSlots()
const defaultSlots = slots.default()

const rows = ref(new Set())
const openedRows = ref(new Set())

const computedTableHeader = computed(() => defaultSlots.find((node) => node.type.__KOR_TABLE_HEADER__))
const computedTableBody = computed(() => defaultSlots.find((node) => node.type.__KOR_TABLE_BODY__))

provideTableContext({
  hoverable: props.hoverable,
  expandable: props.expandable,
  openedRows,
  toggleExpanded: (rowId) => {
    if (openedRows.value.has(rowId)) {
      openedRows.value.delete(rowId)
    } else {
      openedRows.value.add(rowId)
    }
  },
  addRow(id) {
    rows.value.add(id)
  }
})

</script>
<template>
  <thead class="text-sm text-gray-700 bg-gray-50">
    <tr>
      <th v-if="rootContext.expandable"></th>
      <slot />
    </tr>
  </thead>
</template>
<script setup>

import { injectTableContext } from './TableRoot.vue'

const rootContext = injectTableContext()

</script>
<script>
export default {
  __KOR_TABLE_HEADER__: true
}
</script>
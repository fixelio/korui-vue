<template>
  <div @click="handleOpen">
    <slot />
  </div>
</template>
<script setup>

import { injectDropdownMenuContext } from './DropdownMenu.vue'

const rootContext = injectDropdownMenuContext()

function handleOpen() {
  rootContext.onOpenChange(true)
}

</script>
<script>
export default {
  __KOR_DROPDOWN_TRIGGER__: true
}
</script>
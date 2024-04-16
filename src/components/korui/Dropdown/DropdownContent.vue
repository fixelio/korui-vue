<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-show="rootContext.open.value"
      class="absolute z-50 mt-2 rounded-md shadow-lg w-48 origin-top-right right-0"
      @click="rootContext.onOpenChange(false)"
    >
      <div class="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white">
        <slot />
      </div>
    </div>
  </Transition>
</template>
<script setup>

import { injectDropdownMenuContext } from './DropdownMenu.vue'

const rootContext = injectDropdownMenuContext()

</script>
<script>
export default {
  __KOR_DROPDOWN_CONTENT__: true
}
</script>
<template>
  <div class="flex justify-between items-center mb-4">
    <div>
      <slot />
    </div>
    <button @click="() => rootContext.onClose()" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Cerrar Modal</span>
    </button>
  </div>
</template>
<script setup>

import { injectModalRootContext } from "./ModalRoot.vue"

const rootContext = injectModalRootContext()

</script>
<script>
export default {
  __KOR_MODAL_HEADER__: true,
}
</script>
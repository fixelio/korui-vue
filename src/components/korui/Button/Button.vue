<template>
  <button
    :type="type"
    :class="classNames('text-white font-medium rounded-lg shadow hover:shadow-lg hover:opacity-90 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 focus:ring-4', {
      'bg-blue-500 active:bg-blue-600 ripple-bg-blue-400 focus:ring-blue-400': color === 'primary',
      'bg-gray-700 active:bg-gray-800 ripple-bg-gray-900 focus:ring-gray-700': color === 'secondary',
      'bg-red-500 active:bg-red-600 ripple-bg-red-400 focus:ring-red-400': color === 'danger',
      'bg-amber-400 active:bg-amber-500 ripple-bg-amber-300 focus:ring-amber-400': color === 'warning',
      'bg-emerald-500 active:bg-emerald-600 ripple-bg-emerald-400 focus:ring-emerald-400': color === 'success',
      'px-4 py-2 text-xs': size === 'sm',
      'px-5 py-2.5 text-sm': size === 'md',
      'px-6 py-3 text-lg': size === 'lg'
    })"
    @click="() => emit('click')"
  >
    <slot />
  </button>
</template>
<script setup>

import classNames from "classnames"

const emit = defineEmits(['click'])

defineProps({
  type: {
    type: String,
    default: () => 'button'
  },
  color: {
    type: String,
    default: () => 'primary'
  },
  size: {
    type: String,
    default: 'md',
  }
})

</script>
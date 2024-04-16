<template>
  <div class="py-1 bg-white">
    <button
      v-if="!asLink"
      @click="emit('onClick')"
      class="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 hover:text-slate-900"
    >
     <slot /> 
    </button>
    <a
      v-else
      :href="href"
      :target="target"
      class="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 hover:text-slate-900"
    >
      <slot />
    </a>
  </div>
</template>

<script setup>

const emit = defineEmits(['onClick'])

const props = defineProps({
  asLink: {
    type: Boolean,
    default: () => false,
  },
  href: {
    type: String,
    required: false,
  },
  target: {
    type: String,
    required: false,
  }
})

</script>

<script>
export default {
  __KOR_DROPDOWN_ITEM__: true
}
</script>
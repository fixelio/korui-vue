<template>
  <div class="relative">
    <component :is="computedTrigger" />
    <!-- Full Screen Dropdown Overlay -->
    <div v-show="open" class="fixed inset-0 z-40" @click="onOpenChange(false)"></div>

    <component :is="computedContent" />  
  </div>
</template>
<script>

import { createContext } from '@/shared/createContext'

export const [injectDropdownMenuContext, provideDropdownMenuContext] = createContext('DropdownMenu')

</script>
<script setup>

import { ref, computed, useSlots } from 'vue'

const slots = useSlots()
const defaultSlot = slots.default()

const open = ref(false)
const effects = ref([])

const computedTrigger = computed(() => {
  return defaultSlot.find((node) => node.type.__KOR_DROPDOWN_TRIGGER__)
})

const computedContent = computed(() => {
  return defaultSlot.find((node) => node.type.__KOR_DROPDOWN_CONTENT__)
})

function onOpenChange(value) {
  open.value = value
  effects.value.forEach(callable => callable(open.value))
}

provideDropdownMenuContext({
  open,
  onOpenChange,
  effects,
  addEffectListener: (callable) => {
    effects.value.push(callable)
  }
})

</script>
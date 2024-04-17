<template>
  <Teleport to="body">
    <Transition leave-active-class="duration-200">
      <div v-show="open" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-[9999]" scroll-region>
        <Transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-show="open" class="fixed inset-0 transform transition-all overflow-hidden" @click="onClickOutside">
            <div class="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
        </Transition>

        <Transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-show="open"
            class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto p-5"
            :class="maxWidthClass"
          >
            <component
              v-if="open"
              :is="computedModalHeader"
            />

            <component
              v-if="open"
              :is="computedModalBody"
              v-bind="computedModalBody.props"
            />

            <component
              v-if="open"
              :is="computedModalFooter"
            />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
<script>

import { createContext } from "@/shared/createContext"

export const [injectModalRootContext, provideModalRootContext] = createContext()

</script>
<script setup>

import { computed, watch, useSlots } from 'vue'

const props = defineProps({
  open: Boolean,
  maxWidth: {
    type: String,
    default: () => '2xl',
  },
  closeable: {
    type: Boolean,
    default: () => false,
  },
})

const emit = defineEmits(['close'])

const slots = useSlots()
const defaultSlot = slots.default()

const computedModalBody = computed(() => {
  return defaultSlot.find((node) => node.type.__KOR_MODAL_BODY__)
})

const computedModalHeader = computed(() => {
  return defaultSlot.find((node) => node.type.__KOR_MODAL_HEADER__)
})

const computedModalFooter = computed(() => {
  return defaultSlot.find((node) => node.type.__KOR_MODAL_FOOTER__)
})

const maxWidthClass = computed(() => {
  return {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
  }[props.maxWidth];
})

function onClickOutside() {
  if (props.closeable) {
    emit('close')
  }
}

watch(() => props.open, () => {
  if (props.open) {
    document.body.classList.add('overflow-hidden')
  }
  else {
    document.body.classList.remove('overflow-hidden')
  }
})

provideModalRootContext({
  onClose: () => {
    emit('close')
  }
})

</script>
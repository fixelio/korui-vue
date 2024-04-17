<template>
  <div>
    <div class="relative w-full mb-3" v-if="!floating">
      <label class="block text-gray-800 font-medium text-[13px] mb-1" :htmlFor="id">
        {{ title }}
      </label>
      <select
        ref="input"
        :id="id"
        :class="classNames(
          'border rounded-lg px-3 py-3 text-sm focus:outline-none w-full focus:border-blue-600 focus:ring-0 placeholder:text-[13px] select-custom',
          {
            'border-gray-300': !error,
            'placeholder-red-500': error,
            'placeholder-gray-600': !error,
            '!border-red-500': error,
            'focus:!ring-red-500': error,
            '!bg-red-50': error,
            'bg-white': !error,
            'text-red-900': error,
            'text-gray-700': !error,
          }
        )"
        :value="modelValue"
        @input="(event) => {
          emit('update:modelValue', event.target.value)
          emit('onChange', event.target.value)
        }"
        :required="required"
      >
        <slot />
      </select>

      <div v-show="error">
        <p class="text-sm text-red-600">
          {{ error }}
        </p>
      </div>
    </div>
    <div v-else>
      <div class="relative">
        <select
          ref="input"
          :id="id"
          :class="classNames(
            'border rounded-lg px-3 py-3 text-sm focus:outline-none w-full focus:border-blue-600 focus:ring-0 placeholder:text-[13px] peer select-custom',
            {
              'border-gray-300': !error,
              'placeholder-red-500': error,
              'placeholder-gray-600': !error,
              '!border-red-500': error,
              'focus:!ring-red-500': error,
              '!bg-red-50': error,
              'bg-white': !error,
              'text-red-900': error,
              'text-gray-700': !error,
            }
          )"
          :value="modelValue"
          @input="(event) => {
            emit('update:modelValue', event.target.value)
            emit('onChange', event.target.value)
          }"
          :required="required"
        >
          <slot />
        </select>
        <label
          :for="id"
          :class="classNames('block font-medium text-[13px] mb-1 absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1', {
            'text-gray-500 peer-focus:text-blue-600 bg-white': !error,
            'text-red-500 peer-focus:text-red-500 bg-red-50': error,
          })"
        >
          {{ title }}
        </label>
      </div>
      <p v-if="error" class="mt-2 text-sm text-red-600">
        {{ error }}
      </p>
    </div>
  </div>
</template>
<script setup>

import { ref, onMounted } from "vue"
import classNames from "classnames"

const input = ref(null)

const emit = defineEmits(['update:modelValue', 'onChange'])

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineProps({
  title: String,
  id: String,
  error: {
    type: String,
    required: false,
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: false,
  },
  required: {
    type: Boolean,
    default: () => true
  },
  floating: {
    type: Boolean,
    default: () => false,
  }
})

defineExpose({ focus: () => input.value.focus() })

</script>

<style scoped>

.select-custom {
  background-image: url('data:image/svg+xml,<svg data-slot="icon" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>');
  background-repeat: no-repeat;
  background-position: right center; /* Posición de la imagen de fondo */
  background-size: 16px;
  background-position-x: calc(100% - 7px);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  padding-right: 30px; /* Espacio adicional a la derecha para acomodar la imagen de fondo */
}

</style>
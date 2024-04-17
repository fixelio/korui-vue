<template>
  <div>
    <div class="relative w-full mb-3" v-if="!floating">
      <label
        class="block text-gray-800 font-medium text-[13px] mb-1"
        :htmlFor="id"
      >
        {{ title }}
      </label>
      <input
        ref="input"
        :type="type"
        :id="id"
        :name="name"
        :class="classNames(
          'border rounded-lg px-3 py-3 text-sm focus:outline-none w-full focus:border-blue-600 focus:ring-0 placeholder:text-[13px]',
          {
            'border-gray-300': !error,
            'placeholder-red-500': error,
            'placeholder-gray-500': !error,
            '!border-red-500': error,
            'focus:!ring-red-500': error,
            '!bg-red-50': error,
            'bg-white': !error,
            'text-red-900': error,
            'text-gray-800': !error,
            'disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none disabled:border disabled:border-gray-300': disabled,
          }
        )"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(event) => {
          emit('update:modelValue', event.target.value)
          emit('onChange')
        }"
        :required="required"
      />

      <div v-show="error">
        <p class="text-sm text-red-600">
          {{ error }}
        </p>
      </div>
    </div>
    <div v-else>
      <div class="relative">
        <input
          ref="input"
          :type
          :id
          :name
          placeholder=""
          :maxlength="maxlength"
          :disabled
          :readonly="disabled"
          :value="modelValue"
          :class="classNames(
            'block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer',
            {
              'border-gray-300': !error,
              'placeholder-red-500': error,
              'placeholder-gray-500': !error,
              '!border-red-500': error,
              'focus:!ring-red-500': error,
              '!bg-red-50': error,
              'bg-white': !error,
              'text-red-900': error,
              'text-gray-800': !error,
              'disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none disabled:border disabled:border-gray-300': disabled,
            }
          )"
          @input="(event) => {
            emit('update:modelValue', event.target.value)
            emit('onChange')
          }"
          :required="required"
        />
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
  name: {
    type: String,
    default: () => ''
  },
  placeholder: String,
  error: {
    type: String,
    default: () => ''
  },
  maxlength: {
    type: Number,
    default: () => 255
  },
  type: {
    type: String,
    default: () => 'text',
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  required: {
    type: Boolean,
    default: () => true
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  floating: {
    type: Boolean,
    default: () => false,
  }
})

defineExpose({ focus: () => input.value.focus() })

</script>
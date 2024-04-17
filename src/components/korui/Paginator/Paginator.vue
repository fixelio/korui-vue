<template>
  <nav aria-label="Navegación">
    <div class="mb-2">
      Mostrando
      <span class="font-semibold text-primary">{{ startItemsCount }}</span>
      hasta
      <span class="font-semibold text-primary">{{ endItemsCount }}</span>
      de
      <span class="font-semibold text-primary">{{ computedTotalItems }}</span>
    </div>
    <ul class="flex justify-end items-center -space-x-px h-10 text-base">
      <li>
        <button
          :disabled="isDecreaseDisabled"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-primary bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          @click="decreasePage"
        >
          <span class="sr-only">Anterior</span>
          <ChevronLeftIcon class="w-4 h-4 stroke-2" />
        </button>
      </li>
      <li
        v-for="index in pagesToDisplay"
        :key="index"
      >
        <button
          :class="getPageButtonClasses(index === modelValue)"
          @click="setPage(index)"
        >{{ index }}</button>
      </li>
      <li>
        <button
          :disabled="isIncreaseDisabled"
          class="flex items-center justify-center px-4 h-10 leading-tight text-primary bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          @click="increasePage"
        >
          <span class="sr-only">Siguiente</span>
          <ChevronRightIcon class="w-4 h-4 stroke-2" />
        </button>
      </li>
    </ul>
  </nav>
</template>
<script setup>

import { computed } from "vue"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline"
import classNames from "classnames"

const emit = defineEmits(['update:modelValue', 'onPageChanged'])

const props = defineProps({
  modelValue: {
    type: Number,
    default: () => 1,
  },
  totalPages: {
    type: Number,
    required: false,
  },
  totalItems: {
    type: Number,
    default: () => 10,
  },
  perPage: {
    type: Number,
    default: () => 50,
  },
  sliceLength: {
    type: Number,
    default: () => 2,
  }
})

function setPage(index) {
  emit('update:modelValue', index)
  emit('onPageChanged', index)
}

function decreasePage() {
  emit('update:modelValue', props.modelValue - 1)
  emit('onPageChanged', props.modelValue - 1)
}

function increasePage() {
  emit('update:modelValue', props.modelValue + 1)
  emit('onPageChanged', props.modelValue + 1)
}

const computedTotalPages = computed(() => {
  if (props.totalPages) return props.totalPages
  return Math.ceil(props.totalItems / props.perPage)
})

const isDecreaseDisabled = computed(() => props.modelValue <= 1)
const isIncreaseDisabled = computed(() => props.modelValue >= computedTotalPages.value)
const isSetPageDisabled = (index) => index === props.modelValue

const pagesToDisplay = computed(() => {
  if (computedTotalPages.value <= props.sliceLength * 2 + 1) {
    const pages = []
    for (let page = 1; page <= computedTotalPages.value; page++) {
      pages.push(page)
    }
    return pages
  }

  if (props.modelValue <= props.sliceLength) {
    const pages = []
    const slicedLength = Math.abs(props.modelValue - props.sliceLength) + props.modelValue + props.sliceLength + 1
    for (let page = 1; page <= slicedLength; page++) {
      pages.push(page)
    }
    return pages
  }

  if (props.modelValue >= computedTotalPages.value - props.sliceLength) {
    const pages = []
    for (let page = Math.abs(computedTotalPages.value - props.sliceLength * 2); page <= computedTotalPages.value; page++) {
      pages.push(page)
    }
    return pages
  }

  const pages = []
  const startedPage = props.modelValue - props.sliceLength > 0 ? props.modelValue - props.sliceLength : 1
  for (let page = startedPage; page < props.modelValue + props.sliceLength + 1; page++) {
    if (page >= computedTotalPages.value) break
    pages.push(page)
  }

  return pages
})

const startItemsCount = computed(() => props.modelValue * props.perPage - props.perPage + 1)
const endItemsCount = computed(() => {
  const count = props.modelValue * props.perPage
  if (!props.totalItems) return count
  if (count > props.totalItems) return props.totalItems
  return count
})
const computedTotalItems = computed(() => {
  if (props.totalItems) return props.totalItems
  return computedTotalPages.value * props.perPage
})

function getPageButtonClasses(active) {
  return classNames('flex items-center justify-center w-7 h-7 leading-tight', {
    'bg-portage-200 rounded-full text-portage-700': active,
    'hover:bg-shark-100 hover:text-gray-700 text-primary bg-white': !active,
  })
}

</script>
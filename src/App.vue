<template>
  <div class="h-screen flex justify-center items-center">
    <div class="max-w-2xl w-full">
      
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import Datatable from '@/components/korui/Datatable/Datatable.vue'

const products = ref([
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
])

const headers = ref(['Id', 'Nombre', 'Precio'])

function handleDestroy(item) {
  products.value = products.value.filter((product) => product.id !== item.id)
}

</script>
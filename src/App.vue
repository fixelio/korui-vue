<template>
  <div class="h-screen flex justify-center items-center">
    <div class="max-w-2xl w-full">
      
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const personas = ref([
  {id: 1, first_name: 'Julio', last_name: 'Molina', created_at: '2023-01-01', updated_at: '2023-01-01'},
  {id: 2, first_name: 'Domingo', last_name: 'Molina', created_at: '2023-01-01', updated_at: '2023-01-01'},
  {id: 3, first_name: 'Aris', last_name: 'Duque', created_at: '2023-01-01', updated_at: '2023-01-01'},
  {id: 4, first_name: 'Maximiliano', last_name: 'Silvera', created_at: '2023-01-01', updated_at: '2023-01-01'},
])

const headers = ref([
  {name: 'first_name', displayText: 'Nombre'},
  {name: 'last_name', displayText: 'Apellido'},
])

</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <Button color="success" @click="guardar">Guardar</Button>
  </div>
</template>

<script setup>

import Button from './components/korui/Button.vue/Button.vue'

function guardar() {
  console.log('guardando')
}

</script>
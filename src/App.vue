<template>
  <div class="h-screen flex justify-center items-center">
    <InputField
      class="w-64"
      v-model="name"
      title="Nombre *"
      id="name"
      placeholder="Enter your name"
    />
  </div>
</template>

<script setup>

import { ref } from 'vue'
import InputField from './components/korui/InputField/InputField.vue'

const name = ref('')

</script>
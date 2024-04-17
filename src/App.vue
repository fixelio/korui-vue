<template>
  <div class="h-screen flex justify-center items-center">
    <div class="max-w-2xl w-full">
      <SelectField
        id="role"
        title="Rol *"
        v-model="role"
        floating
      >
        <option value="">Escoge un rol</option>
        <option value="obrero">Obrero</option>
        <option value="secretario">Secretario</option>
        <option value="gerente">Gerente</option>
      </SelectField>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import SelectField from '@/components/korui/SelectField/SelectField.vue'

const role = ref('')

</script>

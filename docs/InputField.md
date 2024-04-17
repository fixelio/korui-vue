## InputField

Este componente es un campo de texto con un label y un mensaje de error opcional. Se puede usar en formularios para capturar información del usuario.

### Ejemplo

```vue
<template>
  <InputField
    title="Name *"
    id="name"
    placeholder="Enter your name"
    v-model="form.name"
  />
</template>
<script setup>

import { useForm } from '@inertiajs/vue3'
import InputField from '@/Components/korui/InputField/InputField'

const form = useForm({
  name: '',
})

</script>
```

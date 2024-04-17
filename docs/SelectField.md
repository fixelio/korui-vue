## SelectField

Este componente es un campo de selección personalizado.

### Ejemplo

```vue
<template>
  <SelectField
    class="w-64"
    id="country"
    title="País"
    v-model="form.country"
  >
    <option value="">Escoge un país</option>
    <option value="venezuela">Venezuela</option>
    <option value="canada">Canadá</option>
    <option value="peru">Perú</option>
  </SelectField>
</template>
<script setup>

import { useForm } from '@inertiajs/vue3'
import SelectField from '@/Components/korui/SelectField/SelectField.vue'

const form = useForm({
  country: '',
})

</script>
```

## Propiedades 

<ul>
  <li><code>title</code>: Título del campo.</li>
  <li><code>id</code>: Identificador del campo.</li>
  <li><code>error</code>: Mensaje de error.</li>
  <li><code>v-model</code>: Valor del campo.</li>
  <li><code>required</code>: Indica si el campo es requerido. Por defecto es <code>true</code></li>
  <li><code>floating</code>: Indica si el campo es flotante. Por defecto es <code>false</code></li>
</ul>

## Eventos

<ul>
  <li><code>update:modelValue</code>: Se emite cuando el valor del campo cambia.</li>
  <li><code>onChange</code>: Se emite cuando el valor del campo cambia.</li>
</ul>
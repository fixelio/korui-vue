## Datatable

El componente Datatable es una tabla que se puede personalizar con los datos que se le pasen.

### Ejemplo

```vue
<template>
  <Datatable
    :data="products"
    :headers
    title="Productos"
    editRoute="products.edit"
    entity="product"
    @onDelete
  />
</template>
<script setup>

import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import Datatable from '@/Components/korui/Datatable/Datatable.vue'

const products = ref([
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
])

const headers = ref(['Id', 'Nombre', 'Precio'])

const destroyForm = useForm()

function onDelete(product) {
  destroyForm.delete(route('products.destroy', { product: product.id }))
}

</script>
```

### Propiedades

El componente Datatable tiene las siguientes propiedades:

- __data__: Array.

Array de objetos que se mostrarán en la tabla.

- __headers__: Array

Array de objetos con los nombres de las columnas.

- __title__: String

Título de la tabla.

- __editRoute__: String

Nombre de la ruta para editar la entidad. Debe estar en el formato de las rutas de Laravel/Inertia.

- __entity__: String

Nombre de la entidad que se representa en la tabla.

### Emits

- __@onDelete(item)__
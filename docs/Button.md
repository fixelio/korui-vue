## Button

El componente Button es un componente de botón que se puede personalizar con colores y tamaños.

### Ejemplo

```vue
<template>
  <Button @click="clicked">Click Me!</Button>
</template>
<script setup>

import Button from '@/Components/korui/Button/Button.vue'

function clicked() {
  console.log('button clicked')
}

</script>
```

### Propiedades

El componente Button tiene las siguientes propiedades:

- __type__: String.

Tipo de botón. Por defecto es 'button'. Los valores que puede tomar son: __button__, __submit__

- __color__: String

Color del botón. Puede ser __primary__, __secondary__, __danger__, __warning__ o __success__. Por defecto es __primary__.

- __size__: String

Tamaño del botón. Puede ser __sm__, __md__ o __lg__. Por defecto es __md__.
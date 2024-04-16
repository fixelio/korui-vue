<template>
  <div class="h-screen flex justify-center items-center">
    <Dropdown.Menu>
      <Dropdown.Trigger>
        <Button>Dropdown</Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Item #1</Dropdown.Item>
        <Dropdown.Item>Item #2</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Menu>
  </div>
</template>

<script setup>

import * as Dropdown from './components/korui/Dropdown/Dropdown'

</script>
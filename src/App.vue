<template>
  <div class="h-screen flex justify-center items-center">
    <Button @click="handleOpen">Open Modal</Button>

    <Modal.Root
      :open="isOpen"
      @close="handleClose"
    >
      <Modal.Header>
        <h2>Modal Title</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, deleniti quos voluptate autem fuga, adipisci consequuntur obcaecati nihil aut, praesentium reiciendis! At magnam tempore quibusdam qui voluptate sint laudantium saepe?</p>
      </Modal.Body>
      <Modal.Footer>
        <div class="flex justify-end gap-x-2">
          <Button @click="handleClose" color="secondary">Cerrar</Button>
          <Button @click="handleConfirm">Confirmar</Button>
        </div>
      </Modal.Footer>
    </Modal.Root>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import Button from '@/components/korui/Button/Button.vue'
import * as Modal from '@/components/korui/Modal/Modal'

const isOpen = ref(false)

function handleOpen() {
  isOpen.value = true
}

function handleClose() {
  isOpen.value = false
}

function handleConfirm() {
  isOpen.value = false
}

</script>
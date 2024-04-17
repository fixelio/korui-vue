<template>
  <section class="p-4 pb-10 bg-white rounded-lg elevation-2">
    <div class="mx-auto w-full">
      <div class="relative overflow-visible">
        <div>
          <h3 class="text-gray-800 mt-3 mb-6 font-medium">{{ title }}</h3>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 xxs:px-0 py-4">
          <div class="xxs:w-full md:w-1/3">
            <form class="flex items-center ml-1">
              <label for="simple-search" class="sr-only">Buscar</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 stroke-2" />
                </div>
                <input
                  type="search"
                  id="simple-search"
                  v-model="search"
                  v-debounce:500ms="handleSearch"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                  placeholder="Buscar"
                  required
                >
              </div>
            </form>
          </div>
        </div>
        <div class="overflow-visible">
          <Table.Root hoverable>
            <Table.Head>
              <Table.HeadCell v-for="header in computedHeaders">{{ header }}</Table.HeadCell>
              <Table.HeadCell>
                <span class="sr-only">Acciones</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row v-for="item in computedData" :key="item.id || useId()">
                <Table.Cell v-for="key in Object.keys(item)" :key class="text-sm">{{ item[key] }}</Table.Cell>
                <Table.Cell>
                  <Dropdown.Menu>
                    <Dropdown.Trigger>
                      <button class="p-2 hover:bg-gray-200 rounded-full">
                        <EllipsisVerticalIcon class="w-5 h-5 stroke-2" />
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <Dropdown.Item asLink :href="route(editRoute, { [entity]: item.id })">
                        <div class="flex justify-start items-center gap-x-2">
                          <PencilSquareIcon class="w-5 h-5 stroke-2" />
                          <span>Editar</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item @click="() => handleDestroy(item)">
                        <div class="flex justify-start items-center gap-x-2 text-red-500">
                          <TrashIcon class="w-5 h-5 stroke-2" />
                          <span class="font-medium">Eliminar</span>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown.Menu>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </div>
        <div class="flex justify-end items-center mt-8">
          <Paginator
            v-model="currentPage"
            :total-items="data.length"
            :slice-length="3"
            :per-page="itemsPerPage"
            @onPageChanged=""
          />
        </div>
      </div>
    </div>
    <!-- Modal de confirmación -->
    <Modal.Root
      :open="openModal"
      @close="openModal = false"
    >
      <Modal.Header>
        <span class="font-medium">Confirmación</span>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar este elemento? <strong>Esta acción no se puede deshacer</strong>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div class="flex justify-end gap-x-2">
          <Button @click="openModal = false" color="secondary">Cancelar</Button>
          <Button @click="confirmDestroy" color="danger">Eliminar</Button>
        </div>
      </Modal.Footer>
    </Modal.Root>
  </section>
</template>

<script setup>

import { ref, computed } from 'vue'
import * as Table from '../Table/Table'
import * as Dropdown from '../Dropdown/Dropdown'
import * as Modal from '../Modal/Modal'
import Paginator from '../Paginator/Paginator.vue'
import Button from '../Button/Button.vue'
import { MagnifyingGlassIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import capitalizeFirstLetter from '@/Utils/capitalizeFirstLetter'
import useId from '@/Utils/useId'

const emit = defineEmits(['onDelete', 'onSearch'])

const props = defineProps({
  data: Array,
  headers: {
    type: Array,
    required: false,
  },
  title: String,
  editRoute: String,
  entity: String,
})

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const openModal = ref(false)

const tempItem = ref(null)

const computedHeaders = computed(() => {
  if (Array.isArray(props.headers)) {
    return props.headers
  }

  return Object.keys(props.data[0]).map((item) => capitalizeFirstLetter(item))
})

const computedData = computed(() => {
  return props.data.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value)
})

function handleSearch() {
  emit('onSearch', search.value)
}

function handleDestroy(item) {
  tempItem.value = item
  openModal.value = true
}

function confirmDestroy() {
  openModal.value = false
  emit('onDelete', tempItem.value)
}

</script>
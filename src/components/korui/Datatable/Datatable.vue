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
          <div class="flex justify-end gap-x-2">
            <Link
              :href="route(createRoute)"
              class="flex justify-center items-center gap-x-1 text-white font-medium rounded-lg shadow hover:shadow-lg hover:opacity-90 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 focus:ring-4 bg-blue-500 active:bg-blue-600 ripple-bg-blue-400 focus:ring-blue-400"
            >
              <PlusIcon class="w-4 h-4 stroke-2" />
              <span>Registrar</span>
            </Link>
          </div>
        </div>
        <div class="overflow-visible">
          <Table.Root hoverable>
            <Table.Head>
              <Table.HeadCell v-for="header in computedHeaders">{{ header.displayText }}</Table.HeadCell>
              <Table.HeadCell>
                <span class="sr-only">Acciones</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row v-for="item in computedData" :key="item.id || useId()">
                <Table.Cell v-for="key in Object.keys(item)" :key class="text-sm">{{ item[key] }}</Table.Cell>
                <Table.Cell class="flex justify-end">
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
        <div class="flex justify-between items-start mt-8">
          <div class="relative">
            <label for="items-per-page" class="text-sm pb-2">Elementos por página</label>
            <select
              class="w-full border px-2 py-1 rounded-lg"
              name="items-per-page"
              id="items-per-page"
              v-model="itemsPerPage"
            >
              <option value="10" selected>10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
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
import { Link } from '@inertiajs/vue3'
import * as Table from '../Table/Table'
import * as Dropdown from '../Dropdown/Dropdown'
import * as Modal from '../Modal/Modal'
import Paginator from '../Paginator/Paginator.vue'
import Button from '../Button/Button.vue'
import { MagnifyingGlassIcon, PlusIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
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
  createRoute: String,
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
  const itemsPerPageAsNumber = Number(itemsPerPage.value)
  const paginated = props.data.slice((currentPage.value - 1) * itemsPerPageAsNumber, currentPage.value * itemsPerPageAsNumber)
  return paginated.map((item) => {
    const result = {}
    for(const header of props.headers) {
      result[header.name] = item[header.name]
    }

    return result
  })
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
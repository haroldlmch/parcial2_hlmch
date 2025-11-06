<script setup lang="ts">
import NivelesAcademicoList from '@/components/NivelesAcademico/NivelesAcademicoList.vue'
import NivelesAcademicoSave from '@/components/NivelesAcademico/NivelesAcademicoSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const nivelesacademicoListRef = ref<typeof NivelesAcademicoList | null>(null)
const nivelesacademicoEdit = ref<any>(null)

function handleCreate() {
  nivelesacademicoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(nivelesacademico: any) {
  nivelesacademicoEdit.value = nivelesacademico
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  nivelesacademicoListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Niveles Academicos</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <NivelesAcademicoList ref="nivelesacademicoListRef" @edit="handleEdit" />
    <NivelesAcademicoSave
      :mostrar="mostrarDialog"
      :nivelesacademico="nivelesacademicoEdit"
      :modoEdicion="!!nivelesacademicoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>

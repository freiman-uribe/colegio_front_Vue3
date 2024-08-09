<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStudentsStore } from '../store'
const store = useStudentsStore()

const cours = ref([]);
const idCours = ref([]);
const selectOld = ref([]);
const form = reactive({
    nombre: '',
    imagen: '',
    materia_ids: []
});

const lisInit = async() => {
  await store.listCours();
  cours.value = store.cours;
}

onMounted(async () => {
  await lisInit();
  await store.listSubject();
});

const editClick = async (id) => {
    idCours.value = id
    const data = await store.editCours(id);
    form.nombre = data.nombre;
    form.imagen = data.imagen;
    form.materia_ids = data.materia_ids;
    selectOld.value = data.materia_ids;
    
    await lisInit();
};


const submitForm = async () => {
  try {
      if (idCours.value > 0) {

        const idsForm = store.subject.map(item => item.id);
        const idsDiferenciaAdd = idsForm.filter(id => form.materia_ids.includes(id));
        const idsDiferenciaRem = idsForm.filter(id => !form.materia_ids.includes(id));
        const idsAdd = idsDiferenciaAdd.filter(id => !selectOld.value.includes(id));
        const idsRemove = idsDiferenciaRem.filter(id => selectOld.value.includes(id));
        form.idsAdd = idsAdd;
        form.idsRemove = idsRemove;
        await store.updateCours(form, idCours.value);
      }
      else {
          await store.createCours(form);
      }
      await lisInit();
      await resetForm();
    } catch (error) {
        console.error('error:', error)
    }
};

const deleteClick = async (id) => {
    await store.deleteCours(id);
    await lisInit();
};
const resetForm = () => {
  idCours.value = null;
  form.nombre = '';
  form.imagen = '';
  form.materia_ids = [];
};

</script>

<template>
  <div class="container">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar Información</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="submitForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" v-model="form.nombre" required>
              </div>
              <div class="mb-3">
                <label for="urlImagen" class="form-label">URL de Imagen</label>
                <input type="text" class="form-control" id="urlImagen" v-model="form.imagen" required>
              </div>
              <div class="mb-3">
                <label for="exampleSelect" class="form-label">Selecciona una opción</label>
                <select id="exampleSelect" class="form-select" multiple v-model="form.materia_ids">
                    <option disabled value="">Seleccione un materia</option>
                    <option v-for="option in store.subject" :key="option.id" :value="option.id">
                        {{ option.nombre }}
                    </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-10">
        <h2 class="text-center mb-4">Cursos</h2>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="bi bi-file-earmark-plus"></i>
        </button> 
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="curso in cours" :key="curso.id">
            <div class="card">
            <img :src="curso.imagen" class="card-img-top" alt="Imagen del curso">
            <div class="card-body">
                <h5 class="card-title">{{ curso.nombre }}</h5>
                <router-link :to="`/curso/estudiantes/${curso.id}`" class="btn btn-primary">Ver estudiantes</router-link>
                <button class="btn btn-success mx-2" @click="editClick(curso.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger mx-1" @click="deleteClick(curso.id)">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            </div>
        </div>
    </div>
</div>

</template>

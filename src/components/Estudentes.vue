<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStudentsStore } from '../store'

const route = useRoute();
const store = useStudentsStore()

const students = ref([]);
const idStudent = ref(null)

const form = reactive({
    nombre: '',
    curso_id: route.params.idCurso,
});

const lisInit = async() => {
  await store.listStudentsCours(route.params.idCurso);
  students.value = store.studentsCours;
}

onMounted(async () => {
  await lisInit();
  await store.listSubjectCours(route.params.idCurso);
});

const editClick = async (id) => {
  idStudent.value = id
  const data = await store.editStudent(id);
  form.nombre = data.nombre;
  form.curso_id = data.curso_id;

  await lisInit();
};

const deleteClick = async (id) => {
  await store.deleteStudent(id);
  await lisInit();
};

const submitForm = async () => {
  try {
    if (idStudent.value > 0) {
      await store.updateEstudent(form, idStudent.value);
    }
    else {
      await store.createEstudent(form);
    }
    await lisInit();
    await resetForm();
  } catch (error) {
    console.error('error:', error)
  }
  
};

const resetForm = () => {
    idStudent.value = null;
    form.nombre = '';
};

</script>

<template>
  <div class="container">

    <div class="my-5 row">
      <div class="col-10">
        <h1>Estudiantes inscritos</h1>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="bi bi-person-plus"></i>
        </button> 
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Asignar nota</h5>
            <button type="button" class="btn-close" @click="resetForm()" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="submitForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input class="form-control" id="nombre" type="text" v-model="form.nombre" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
              <button type="button" class="btn btn-secondary" @click="resetForm()" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="students.length > 0" v-for="(item, index) in students" :key="item.id">
          <td>{{ ++index }}</td>
          <td>{{ item.nombre }}</td>
          <td class="row">
            <div class="col-12 col-md-6">
                <router-link :to="`/estudiante/${item.id}/curso/${route.params.idCurso}/nota`" class="btn btn-success">
                    <i class="bi bi-list-check"></i>
                </router-link>
            </div>
            <div class="col-12 col-md-6">
                <button class="btn btn-danger" @click="deleteClick(item.id)">
                    <i class="bi bi-trash3"></i>
                </button>
                <button class="btn btn-success mx-2" @click="editClick(item.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="bi bi-pencil"></i>
                </button>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="3">
            <span> No se encontraro estudiantes registrados</span>
          </td>
        </tr>
      </tbody>
      <tbody>
        
      </tbody>
    </table>
  </div>
</template>

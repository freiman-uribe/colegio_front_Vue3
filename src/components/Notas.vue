<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStudentsStore } from '../store'

const route = useRoute();
const store = useStudentsStore()
const dataStudent = {
    estudiante: route.params.idEstudiante,
    curso: route.params.idCurso
}

const grade = ref([]);
const idNota = ref(null);
const form = reactive({
    nota: '',
    descripcion: '',
    estudiante_id: route.params.idEstudiante,
    curso_id: route.params.idCurso,
    materia_id: ''
});

const lisInit = async() => {
    await store.listStudentsGrade(dataStudent);
    grade.value = store.studnetGrade;
}

onMounted(async () => {
  await lisInit();
  await store.listCours();
  await store.listSubjectCours(route.params.idCurso);
  
});

const editClick = async (id) => {
    idNota.value = id
    const data = await store.editNota(id);
    form.nota = data.nota;
    form.descripcion = data.descripcion;
    form.materia_id = data.materia_id;
    await lisInit();
};

const submitForm = async () => {
    try {
        if (idNota.value > 0) {
            await store.updateNota(form, idNota.value);
        }
        else {
            await store.createNota(form);
        }
        await lisInit();
        await resetForm();
    } catch (error) {
        console.error('error:', error)
    }
};

const deleteClick = async (id) => {
    await store.deleteNota(id);
    await lisInit();
};

const resetForm = () => {
    idNota.value = null;
    form.nota = '';
    form.descripcion = '';
    form.estudiante_id= route.params.idEstudiante,
    form.curso_id= route.params.idCurso,
    form.materia_id = '';
};
</script>

<template>
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>{{ grade.nombre_curso }}</h1>
        </div>
        <div class="col-md-10">
            <h2>{{ grade.nombre_estudiante }}</h2>
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-plus"></i>
            </button> 
        </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Asignar nota</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="submitForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nota</label>
                <input class="form-control" id="nota" type="number" step="0.1" v-model="form.nota" required>
              </div>
              <div class="mb-3">
                <label for="exampleSelect" class="form-label">Selecciona una opción</label>
                <select id="exampleSelect" class="form-select" v-model="form.materia_id">
                    <option disabled value="">Seleccione una materia</option>
                    <option v-for="option in store.subjectCours" :key="option.id" :value="option.id">
                        {{ option.nombre }}
                    </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcion" v-model="form.descripcion" required/>
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

    <div class="accordion" id="acordianMaterias">
        <div v-for="(materia, index) in grade.materias" :key="index" class="accordion-item">
            <h2 class="accordion-header" id="heading{{ materia.materia_id }}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${ materia.materia_id }`" aria-expanded="true" :aria-controls="'collapse'+materia.materia_id">
                    {{ materia.nombre_materia }}
                </button>
            </h2>
            <div :id="'collapse'+materia.materia_id" class="accordion-collapse collapse" :aria-labelledby="`heading${materia.materia_id}`" data-bs-parent="#acordianMaterias">
            <ul class="list-group">
                <li v-for="(nota, notaIndex) in materia.notas" :key="notaIndex" class="list-group-item">
                    <span>
                        {{ nota.descripcion }} - {{ nota.valor }}
                    </span>
                    <button class="btn btn-danger" @click="deleteClick(nota.id)">
                        <i class="bi bi-trash3"></i>
                    </button>
                    <button class="btn btn-success mx-2" @click="editClick(nota.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="bi bi-pencil"></i>
                    </button>
                </li>
            </ul>
            </div>
        </div>
    </div>
</div>
</template>

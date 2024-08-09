<script setup>
import { ref, onMounted } from 'vue';
import { useStudentsStore } from '../store'
const store = useStudentsStore()

const subject = ref([]);

onMounted(async () => {
  await store.listSubject();
  subject.value = store.subject;
});
</script>
<template>
<div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in subject" :key="item.id">
                <td>{{ ++index }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.curso_id }}</td>
                <td>
                    <router-link :to="`/asignaturas/estudiantes/${item.id}`" class="btn btn-primary">Ver estudiantes</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
import { defineStore } from 'pinia'
import axios from '../config/axios';

export const useStudentsStore = defineStore('main', {
  state: () => ({
    students: [],
    studentsCours: [],
    studentsCours: [],
    studnetGrade: [],
    cours: [],
    subjectCours: [],
    subject: [],
    error: ""
  }),
  actions: {
    async listStudents() {
        const { data } = await axios('estudiantes', { withCredentials: true });
        this.students = data;
    },
    async listStudentsCours(id) {
        const { data } = await axios(`cursos/estudiantes/${id}`, { withCredentials: true });
        this.studentsCours = data;
    },
    async listStudentsGrade(data) {
        const {estudiante, curso} = data;
        const response = await axios(`/estudiantes/${estudiante}/cursos/${curso}/notas`, { withCredentials: true });
        this.studnetGrade = response.data;
    },
    async listCours() {
        const { data } = await axios('cursos', { withCredentials: true });
        this.cours = data;
    },
    async listSubjectCours(id) {
        const { data } = await axios(`cursos/materia/${id}`, { withCredentials: true });
        this.subjectCours = data;
    },
    async listSubject() {
        const { data } = await axios('materias', { withCredentials: true });
        this.subject = data;
    },
    async createCours(data) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            await axios.post('cursos', data, 
                {
                    withCredentials: true,
                    headers:{
                        'X-CSRF-TOKEN': token.data.csrfToken
                    }
                }
            );
        } catch (error) {
            this.error = error;
        }
    },
    async editCours(id) {
        try {
            const response = await axios(`cursos/${id}`, {
                withCredentials: true,
            });
            return response.data
        } catch (error) {
            this.error = error;
            console.error('error>>', error);
        }
    },
    async updateCours(cours, id) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            await axios.put(`cursos/${id}`, cours, 
                {
                    withCredentials: true,
                    headers:{
                        'X-CSRF-TOKEN': token.data.csrfToken
                    }
                }
            );
        } catch (error) {
            this.error = error;
        }
    },
    async createEstudent(student) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            const data = await axios.post('estudiantes', student, 
                {
                    withCredentials: true,
                    headers:{
                        'X-CSRF-TOKEN': token.data.csrfToken
                    }
                }
            );
            this.students.push(data);
        } catch (error) {
            this.error = error;
        }
    },
    async updateEstudent(student, id) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            await axios.put(`estudiantes/${id}`, student, 
                {
                    withCredentials: true,
                    headers:{
                        'X-CSRF-TOKEN': token.data.csrfToken
                    }
                }
            );
        } catch (error) {
            this.error = error;
        }
    },
    async createNota(nota) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            const data = await axios.post('notas', nota, 
                {
                    withCredentials: true,
                    headers:{
                        'X-CSRF-TOKEN': token.data.csrfToken
                    }
                }
            );
            
            this.notas.push(data);
        } catch (error) {
            this.error = error;
        }
    },
    async updateNota(nota, id) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            await axios.put(`notas/${id}`, nota, 
                {
                    withCredentials: true,
                    headers:{
                        'X-CSRF-TOKEN': token.data.csrfToken
                    }
                }
            );
        } catch (error) {
            this.error = error;
        }
    },
    async editNota(id) {
        try {
            const response = await axios(`notas/${id}`, {
                withCredentials: true,
            });
            return response.data
        } catch (error) {
            this.error = error;
            console.error('error>>', error);
        }
    },
    async deleteCours(id) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            await axios.delete(`cursos/${id}`, {
                withCredentials: true,
                headers:{
                    'X-CSRF-TOKEN': token.data.csrfToken
                }
            });
        } catch (error) {
            this.error = error;
            console.error('error>>', error);
        }
    },
    async editStudent(id) {
        try {
            const response = await axios(`estudiantes/${id}`, {
                withCredentials: true,
               
            });
            return response.data
        } catch (error) {
            this.error = error;
            console.error('error>>', error);
        }
    },
    async deleteStudent(id) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            await axios.delete(`estudiantes/${id}`, {
                withCredentials: true,
                headers:{
                    'X-CSRF-TOKEN': token.data.csrfToken
                }
            });
        } catch (error) {
            this.error = error;
            console.error('error>>', error);
        }
    },
    async deleteNota(id) {
        try {
            const token = await axios('token/csrf',{ withCredentials: true })
            await axios.delete(`notas/${id}`, {
                withCredentials: true,
                headers:{
                    'X-CSRF-TOKEN': token.data.csrfToken
                }
            });
        } catch (error) {
            this.error = error;
            console.error('error>>', error);
        }
    }
  }
})
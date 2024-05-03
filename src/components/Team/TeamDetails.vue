<script setup>
import RemoveInstructorButton from './RemoveInstructorButton.vue';
import InstructorSelector from './InstructorSelector.vue';
</script>

<template>
  <div>
    <h1>{{ team.teamName }}</h1>

    <h3>Students</h3>
    <div v-for="(student, index) in students.get(team.id)" :key="index">
      {{ student.firstName }} {{ student.lastName }}
    </div>

    <h3>Instructor</h3>
    <div><InstructorSelector :tid="id">{{ team.instructor.firstName }} {{ team.instructor.lastName }}</InstructorSelector><RemoveInstructorButton></RemoveInstructorButton></div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "TeamDetails",
  props: ['id'],
  data() {
    return {
      team: null,
      students: new Map(),
    };
  },
  created() {
    this.getDetails()
  },
  mounted() {
    this.getAllResults()
  },
  methods: {
    async getDetails() {
      const URL = 'http://localhost:8080/teams/' + this.id
      axios.get(URL)
          .then(response => {
            console.log(response.data.data)
            this.details = response.data.data
            this.team = response.data.data
            console.log(this.team)
          })
          .catch(error => {
            console.error('There was an error.', error.response.data);
          });
    },

    async getAllResults() {
      // await this.getDetails()
        for (const studentId of this.team.studentIds) {
          await this.getStudentById(studentId)
        }
    },

    async getStudentById(id) {
      const URL = `http://localhost:8080/students/${id}`;
      try {
        await axios.get(URL).then(response => {
          let studentListPerTeam = this.students.get(this.team.id)

          if (studentListPerTeam == null) {
            // no students found yet, should add student
            studentListPerTeam = []

            studentListPerTeam.push(response.data.data)
            this.students.set(this.team.id, studentListPerTeam);
          } else {
            let isNewStudent = true;
            studentListPerTeam.forEach((student) => {
              if (student.id === response.data.data.id) {
                isNewStudent = false
              }
            })
            if (isNewStudent) {
              studentListPerTeam.push(response.data.data)
              this.students.set(this.team.id, studentListPerTeam);
            }
          }
        })
      } catch (err) {
        console.error('There was an error.', err);
      }
    }
  }
}
</script>

<style scoped>
input {
  margin: 10px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
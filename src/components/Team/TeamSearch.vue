<template>
  <div class="container">
    <h1>Team Search</h1>
    <form @submit.prevent="getAllResults">
      <input v-model="searchParams.teamName" placeholder="Team Name" type="text"/>
      <input v-model="searchParams.sectionName" placeholder="Section Name" type="text"/>
      <input v-model="searchParams.academicYear" placeholder="Academic Year" type="text"/>
      <input v-model="searchParams.instructorFirstName" placeholder="Instructor First Name" type="text"/>
      <input v-model="searchParams.instructorLastName" placeholder="Instructor Last Name" type="text"/>
      <button type="submit">Search</button>
    </form>

    <!-- Results Section -->
    <div v-if="teams === null">
      <h1></h1>
    </div>
    <div v-else-if="teams.length > 0">
      <h2>Results:</h2>
      <ul>
        <hr>
        <li v-for="team in teams" :key="team.id">
          <div>
            <RouterLink :to="`/teamDetails/${team.id}`"><h2>{{ team.teamName }}</h2></RouterLink>
            <div style="font-weight: bold">Students:</div>
            <div v-for="(student, index) in students.get(team.id)" :key="index">
              {{ student.firstName }} {{ student.lastName }}
            </div>
            <div>
              <div style="font-weight: bold">Instructor:</div>
              <div>{{ team.instructor.firstName }} {{ team.instructor.lastName }}</div>
            </div>
          </div>
          <hr>
        </li>
      </ul>
    </div>
    <div v-else class="container">
      <h1>No Teams Found</h1>
      <h2>Is there a use case here?</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TeamSearch",
  data() {
    return {
      searchParams: {
        teamName: '',
        sectionName: '',
        academicYear: '',
        instructorFirstName: '',
        instructorLastName: ''
      },
      teams: null,
      students: new Map(),
      isResults: undefined
    };
  },
  methods: {
    async searchTeams() {
      const params = new URLSearchParams(this.searchParams).toString();
      const URL = `http://localhost:8080/teams/search?${params}`;
      try {
        await axios.get(URL).then(response => {
          this.teams = response.data.data;
        })
      } catch (err) {
        console.error('There was an error.', err);
      }
    },
    async getAllResults() {
      await this.searchTeams()
      for (const team of this.teams) {
        for (const studentId of team.studentIds) {
          await this.getStudentById(studentId, team)
        }
      }
    },
    async getStudentById(id, team) {
      const URL = `http://localhost:8080/students/${id}`;
      try {
        await axios.get(URL).then(response => {
          let studentListPerTeam = this.students.get(team.id)

          if (studentListPerTeam == null) {
            // no students found yet, should add student
            studentListPerTeam = []

            studentListPerTeam.push(response.data.data)
            this.students.set(team.id, studentListPerTeam);
          } else {
            let isNewStudent = true;
            studentListPerTeam.forEach((student) => {
              if (student.id === response.data.data.id) {
                isNewStudent = false
              }
            })
            if (isNewStudent) {
              studentListPerTeam.push(response.data.data)
              this.students.set(team.id, studentListPerTeam);
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

.container {
  display: flex;
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
}
</style>
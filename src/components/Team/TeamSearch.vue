<template>
  <div class="container">
    <h1>Team Search</h1>
    <form @submit.prevent="searchTeams">
      <input v-model="searchParams.teamName" type="text" placeholder="Team Name" />
      <input v-model="searchParams.sectionName" type="text" placeholder="Section Name" />
      <input v-model="searchParams.academicYear" type="text" placeholder="Academic Year" />
      <input v-model="searchParams.instructorFirstName" type="text" placeholder="Instructor First Name" />
      <input v-model="searchParams.instructorLastName" type="text" placeholder="Instructor Last Name" />
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
            Section: {{ team.section.sectionName }} |
            Academic Year: {{ team.academicYear }} |
            Instructor: {{ team.instructor.firstName}} {{team.instructor.lastName}}
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
      isResults: undefined
    };
  },
  methods: {
    searchTeams() {
      const params = new URLSearchParams(this.searchParams).toString();
      const URL = `http://localhost:8080/teams/search?${params}`;
      axios.get(URL)
          .then(response => {
            this.teams = response.data.data;
            console.log(this.teams)
          })
          .catch(error => {
            console.error('There was an error.', error.response.data);
          });
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
<template>
  <div class="container">
    <h1>Instructor Search</h1>
    <form @submit.prevent="searchInstructors">
      <input v-model="searchParams.firstName" type="text" placeholder="First Name" />
      <input v-model="searchParams.lastName" type="text" placeholder="Last Name" />
      <input v-model="searchParams.academicYear" type="text" placeholder="Academic Year" />
      <input v-model="searchParams.teamName" type="text" placeholder="Team Name" />
      <button type="submit">Search</button>
    </form>

    <!-- Results Section -->
    <div v-if="instructors.length > 0">
      <h2>Results:</h2>
      <ul>
        <hr>
        <li v-for="instructor in instructors" :key="instructor.id">
          <div>
            <RouterLink :to="`/instructorDetails/${instructor.id}`">
              <h2>{{ instructor.firstName }} {{ instructor.lastName }}</h2>
            </RouterLink>
            Supervised Teams: {{ instructor.teamName }}
          </div>
          <hr>
        </li>
      </ul>
    </div>
    <div v-else-if="searchPerformed" class="container">
      <h1>No Instructors Found</h1>
      <h2>Would you like to invite one?</h2>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: "InstructorSearch",
  data() {
    return {
      searchParams: {
        firstName: '',
        lastName: '',
        academicYear: '',
        teamName: ''
      },
      instructors: [], // This will hold the search results
      isResults: undefined,
      searchPerformed: false
    };
  },
  methods: {
    searchInstructors() {
      this.searchPerformed = true;  // Indicate that a search has been performed
      this.instructors = [];  // Clear previous results before the new search
      const params = new URLSearchParams(this.searchParams).toString();
      const URL = `http://localhost:8080/instructors/search?${params}`;
      axios.get(URL)
        .then(response => {
          if (response.data.data.length > 0) {
            this.instructors = response.data.data;
          } else {
            this.instructors = []; // Explicitly set to empty if no results
          }
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
          this.instructors = []; // Set to empty array in case of error
        });

      // Here you would typically make an API call to fetch the data based on search criteria
      //console.log("Searching for:", this.searchParams);
      // Mock data returned from an API

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
  align-items: center;
  /* Center horizontally */
  height: 100vh;
  /* Full height of the viewport */
  flex-direction: column;
}
</style>
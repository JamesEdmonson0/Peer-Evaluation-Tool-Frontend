<template>
    <div class="container">
      <h1>Student Search</h1>
      <form @submit.prevent="searchStudents">
        <input v-model="searchParams.firstName" type="text" placeholder="First Name" />
        <input v-model="searchParams.lastName" type="text" placeholder="Last Name" />
        <input v-model="searchParams.academicYear" type="text" placeholder="Academic Year" />
        <input v-model="searchParams.teamName" type="text" placeholder="Team Name" />
        <button type="submit">Search</button>
      </form>
      
      <!-- Results Section -->
      <div v-if="instructors === null">
        <h1></h1>
      </div>
      <div v-else-if="instructors.length > 0">
        <h2>Results:</h2>
        <ul>
          <hr>
          <li v-for="instructor in instructors" :key="instructor.id">
            <div>
              <RouterLink :to="`/instructorDetails/${instructor.id}`"><h2>{{ instructor.firstName }} {{ instructor.lastName }}</h2></RouterLink> 
              Academic Year: {{ instructor.academicYear }}
              Team Name: {{ instructor.teamName }}
            </div>
            <hr>
          </li>
        </ul>
      </div>
      <div v-else class="container">
        <h1>No Instructors Found</h1>
        <h2>Would you like to create one?</h2>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "StudentSearch",
    data() {
      return {
        searchParams: {
          firstName: '',
          lastName: '',
          academicYear: '',
          teamName: ''
        },
        instructors: null, // This will hold the search results
        isResults: undefined
      };
    },
    methods: {
      searchInstructors() {
        const params = new URLSearchParams(this.searchParams).toString();
        const URL = `http://localhost:8080/instructors/search?${params}`;
        axios.get(URL)
        .then(response => {
          this.instructors = response.data.data;   
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
  
        // Here you would typically make an API call to fetch the data based on search criteria
        console.log("Searching for:", this.searchParams);
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
    align-items: center; /* Center horizontally */
    height: 100vh; /* Full height of the viewport */
    flex-direction: column;
  }
  </style>
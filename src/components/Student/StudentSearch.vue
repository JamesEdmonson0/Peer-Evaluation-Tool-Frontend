<template>
  <div class="container">
    <h1>Student Search</h1>
    <form @submit.prevent="searchStudents">
      <input v-model="searchParams.firstName" type="text" placeholder="First Name" />
      <input v-model="searchParams.lastName" type="text" placeholder="Last Name" />
      <input v-model="searchParams.section" type="text" placeholder="Section" />
      <input v-model="searchParams.academicYear" type="text" placeholder="Academic Year" />
      <input v-model="searchParams.teamName" type="text" placeholder="Team Name" />
      <button type="submit">Search</button>
    </form>
    
    <!-- Results Section -->
    <div v-if="students === null">
      <h1></h1>
    </div>
    <div v-else-if="students.length > 0">
      <h2>Results:</h2>
      <ul>
        <hr>
        <li v-for="student in students" :key="student.id">
          <div>
            <RouterLink :to="`/studentDetails/${student.id}`"><h2>{{ student.firstName }} {{ student.lastName }}</h2></RouterLink>
            Section: {{ student.section }} 
            Academic Year: {{ student.academicYear }}
            Team Name: {{ student.teamName }}
          </div>
          <hr>
        </li>
      </ul>
    </div>
    <div v-else class="container">
      <h1>No Students Found</h1>
      <h2>Would you like to invite one</h2>
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
        section: '',
        academicYear: '',
        teamName: ''
      },
      students: null, // This will hold the search results
      isResults: undefined
    };
  },
  methods: {
    searchStudents() {
      const params = new URLSearchParams(this.searchParams).toString();
      const URL = `http://localhost:8080/students/search?${params}`;
      axios.get(URL)
      .then(response => {
        this.students = response.data.data;   
      })
      .catch(error => {
        console.error('There was an error!', error.response.data);
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
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
}
</style>


<!--

while this currently works, the issue is that since the studentDtos returned
doesn't have any team data, just the team name, section and academic year aren't 
available, i think there are two possible solutions

1. Modify the studentDto 

2. create a new object to return,
  ex :
    {
      "id": id,
      "firstName": "firstName",
      "lastName": "lastName",
      "section": "section",
      "academicYear": "academicYear",
      "teamName": "teamName"
    }
-->
<template>
  <div>
    
    <h1>firstName - lastName</h1>

    <h3>teamName - academicYear</h3>
    <hr>

    <div>
      <h2>Peer Evaluations</h2>
      <div>
        <!-- unordered list -->
      </div>
    </div>
    <hr>
    <div>
      <h2>Weekly Activity Report</h2>
      <div>
        <!-- unordered list -->
      </div>
    </div>




  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "StudentDetails",
  data() {
    return {
      searchParams: {
        firstName: '',
        lastName: '',
        section: '',
        academicYear: '',
        teamName: ''
      },
      students: [] // This will hold the search results
    };
  },
  methods: {
    searchStudents() {
      const baseURl = 'http://localhost:8080/students'
      const params = new URLSearchParams(this.searchParams).toString();
      const url = `/search?${params}`;
      axios.get(baseURl + url)
      .then(response => {
          console.log(response.data.data);
          this.students = response.data.data;
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
</style>
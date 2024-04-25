<template>
    <div>
      
      <h1>{{ details.firstName}} {{ details.lastName }}</h1>
  
      <h3>Academic Year: {{ details.academicYear }}</h3>
      <h3>Team Name: {{ details.teamName }}</h3>

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: "InstructorDetails",
    props: ['id'],
    data() {
      return {
        details: {},
      };
    },
    created() {
      this.getDetails()
    },
    methods: {
      getDetails() {
        const URL = 'http://localhost:8080/instructors/' + this.id
        axios.get(URL)
        .then(response => {
            this.details = response.data.data
            //console.log(response.data.data)
          })
          .catch(error => {
            console.error('There was an error!', error.response.data);
          });
      },
    }
  }
  </script>
  
  <style scoped>
  input {
    margin: 10px;
  }
  </style>
<script setup>
import DeactivateInstructorButton from './DeactivateInstructorButton.vue';
import ReactivateInstructorButton from './ReactivateInstructorButton.vue';
</script>

<template>
    <div>
      
      <h1>{{ details.firstName}} {{ details.lastName }}</h1>
      <h3>Supervised Teams: {{ details.teamName }}</h3>
      <DeactivateInstructorButton :id="id"></DeactivateInstructorButton>
      <ReactivateInstructorButton :id="id"></ReactivateInstructorButton>
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
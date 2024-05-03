<script setup>
import RemoveInstructorButton from './RemoveInstructorButton.vue';
import InstructorSelector from './InstructorSelector.vue';
</script>

<template>
  <div>
    <h2>Team Name: {{ details.teamName }}</h2>
    <h3>Instructor: <InstructorSelector :tid="id">{{ details.instructor.firstName }} {{ details.instructor.lastName }}</InstructorSelector><RemoveInstructorButton></RemoveInstructorButton></h3>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "TeamDetails",
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
      const URL = 'http://localhost:8080/teams/' + this.id
      axios.get(URL)
          .then(response => {
            console.log(response.data.data)
            this.details = response.data.data
          })
          .catch(error => {
            console.error('There was an error.', error.response.data);
          });
    },
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
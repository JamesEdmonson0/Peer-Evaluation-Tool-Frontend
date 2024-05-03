<script setup>
import DeleteStudentButton from './DeleteStudentButton.vue';
</script>
<template>
  <div>
    
    <h1>{{ details.firstName}} {{ details.lastName }}</h1>

    <h3>Team Name: {{ details.teamName }} - Academic Year: {{ details.academicYear }}</h3>
    <DeleteStudentButton :id="id"></DeleteStudentButton>
    <hr>
    <button @click="goToStudentReport">Generate Peer Evaluation Report</button>
    <hr>
    <div>
      <h2>Peer Evaluations</h2>
      
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
      const URL = 'http://localhost:8080/students/' + this.id
      axios.get(URL)
      .then(response => {
          this.details = response.data.data
          //console.log(response.data.data)
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    },
    goToStudentReport() {
      this.$router.push(`/studentReportByInstructor/${this.id}`);
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
<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div v-for="criterion in criteria" :key="criterion.id">
        <label :for="criterion.id">{{ criterion.description }}</label>
        <input :id="criterion.id" v-model="answers[criterion.id]" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      criteria: [],
      answers: [],
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    fetchQuestions() {
      axios.get('http://localhost:8080/rubric')
        .then(response => {
          this.criteria = response.data.data.criterion;
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    },
    fetchTeamMates() {
      //make endpoint to return a list of students in the team
    },
    submitForm() {
      


      console.log(this.answers);
      // Here you can further process the form submission
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* Center horizontally */
  height: 100vh;           /* Full height of the viewport */
}
table,
th,
td {
  border: 2px solid black;
  border-collapse: collapse;
}
</style>

<!--

  need to either modifify the student dto to include team, rather than just team name,
  of need a seperate endpoint to get the team members of the current users team

-->

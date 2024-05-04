<template>
  <div class="container">
    <h1>Assign Students to Team</h1>
    <h4>All currently unassigned students are visible from the second dropdown. Select a team and a student and press submit. Once a student has been added to a team, they are removed from the student selection dropdown. Repeat this process until all students are assigned.</h4>

    <div style="margin-bottom: 10px">Select Team:</div>
    <select style="margin-bottom: 10px" v-model="selectedTeam">
      <option disabled value="">Please Select a Team</option>
      <option v-for="team in teams" :key="team.id" :value="team">{{ team.teamName }}</option>
    </select>
    <div style="margin-bottom: 10px">Select Student:</div>
    <select style="margin-bottom: 10px" v-model="selectedStudent">
      <option disabled value="">Please Select a Student</option>
      <option v-for="student in students" :key="student.id" :value="student">{{ student.firstName }} {{ student.lastName }}</option>
    </select>
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TeamSearch",
  data() {
    return {
      teams: null,
      students: null,
      selectedTeam: null,
      selectedStudent: null
    };
  },
  mounted() {
    this.getAllResults()
  },
  methods: {
    async getAllResults() {
      await this.searchTeams()
      await this.searchStudents()
    },
    async searchTeams() {
      const URL = `http://localhost:8080/teams`;
      try {
        await axios.get(URL).then(response => {
          this.teams = response.data.data;
        })
      } catch (err) {
        console.error('There was an error.', err);
      }
    },
    async searchStudents() {
      const URL = `http://localhost:8080/students`;
      try {
        await axios.get(URL).then(response => {
          this.students = response.data.data;
        })
      } catch (err) {
        console.error('There was an error.', err);
      }
    },
    submit() {
      if (this.selectedTeam == null) {
        alert("Please select a team.")
        return
      }

      if (this.selectedStudent == null) {
        alert("Please select a student.")
        return
      }

      var modifiedStudents = JSON.parse(JSON.stringify(this.selectedTeam.studentIds))
      modifiedStudents.push(this.selectedStudent.id)
      this.selectedTeam.studentIds = modifiedStudents;
      this.updateTeam()

      console.log(this.students)
      this.students = this.students.filter(item => item.id !== this.selectedStudent.id)
      console.log(this.students)

      this.selectedTeam = null
      this.selectedStudent = null
    },
    updateTeam() {
      const URL = "http://localhost:8080/teams/" + this.selectedTeam.id;
      axios.put(URL, this.selectedTeam)
          .then(response => {
            console.log(response.data)
            this.$emit('edited');
          })
          .catch(error => {
            console.error('There was an error :(', error.response.data);
          });
    },
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
<script setup>
import RemoveInstructorButton from './RemoveInstructorButton.vue';
import InstructorSelector from './InstructorSelector.vue';
</script>

<template>
  <div>
    <h1>{{ team.teamName }}</h1>

    <h3>Students</h3>
    <button v-for="(student, index) in students.get(team.id)" :key="index" @click="removeStudent(student.id,
                                          student.firstName, student.lastName)" style="margin-right: 10px">
      {{ student.firstName }} {{ student.lastName }}
    </button>

    <div v-if="team.instructor != null">
      <h3>Instructor</h3>
      <div style="margin-bottom: 10px">{{ team.instructor.firstName }} {{ team.instructor.lastName }}</div>
      <div>
        
        <RemoveInstructorButton :id="team.instructor.id" :tid="id"></RemoveInstructorButton>
      </div>
    </div>
    <div v-else>
      <h3>Instructor</h3>
      <InstructorSelector :tid="id">{{ team.instructor.firstName }} {{ team.instructor.lastName }}</InstructorSelector>
    </div>
    

    <button class="btn-primary" @click="editTeamName">Edit Team Name</button>
    <button class="btn-primary" id="delete" @click="deleteTeam">Delete Team</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "TeamDetails",
  props: ['id'],
  data() {
    return {
      team: null,
      students: new Map(),
    };
  },
  created() {
    this.getDetails()
  },
  mounted() {
    this.getAllResults()
  },
  methods: {
    async removeStudent(id, firstName, lastName) {
      let result = confirm(`Are you sure you want to remove ${firstName} ${lastName} from team ${this.team.teamName}?`);
      if (result === true) {
        var modifiedStudents = JSON.parse(JSON.stringify(this.team.studentIds))
        const idx = modifiedStudents.indexOf(id);
        modifiedStudents.splice(idx, 1);
        this.team.studentIds = modifiedStudents;

        this.students = new Map();
        await this.getAllResults();

        this.updateTeam(id);
      }
    },
    async getDetails() {
      const URL = 'http://localhost:8080/teams/' + this.id
      axios.get(URL)
          .then(response => {
            console.log(response.data.data)
            this.details = response.data.data
            this.team = response.data.data
            console.log(this.team)
          })
          .catch(error => {
            console.error('There was an error.', error.response.data);
          });
    },
    async getAllResults() {
        for (const studentId of this.team.studentIds) {
          await this.getStudentById(studentId)
        }
    },
    async getStudentById(id) {
      const URL = `http://localhost:8080/students/${id}`;
      try {
        await axios.get(URL).then(response => {
          let studentListPerTeam = this.students.get(this.team.id)

          if (studentListPerTeam == null) {
            // no students found yet, should add student
            studentListPerTeam = []

            studentListPerTeam.push(response.data.data)
            this.students.set(this.team.id, studentListPerTeam);
          } else {
            let isNewStudent = true;
            studentListPerTeam.forEach((student) => {
              if (student.id === response.data.data.id) {
                isNewStudent = false
              }
            })
            if (isNewStudent) {
              studentListPerTeam.push(response.data.data)
              this.students.set(this.team.id, studentListPerTeam);
            }
          }
        })
      } catch (err) {
        console.error('There was an error.', err);
      }
    },
    editTeamName() {
      const userInput = prompt("Please enter the new team name:", this.team.teamName);
      if (userInput !== null) {
        alert("Team name successfully changed to " + userInput + ".")
        this.team.teamName = userInput
        this.updateTeam()
      }
    },
    updateTeam() {
      const URL = "http://localhost:8080/teams/" + this.team.id;
      axios.put(URL, this.team)
          .then(response => {
            console.log(response.data)
            this.$emit('edited');
          })
          .catch(error => {
            console.error('There was an error :(', error.response.data);
          });
    },
    deleteTeam() {
      let result = confirm(`Are you sure you want to delete team ${this.team.teamName}?`);
      if (result === true) {
        const URL = "http://localhost:8080/teams/" + this.team.id;
        axios.delete(URL)
            .then(response => {
              console.log(response.data)
              this.$emit('edited');
            })
            .catch(error => {
              console.error('There was an error :(', error.response.data);
            });

        this.$router.back()
      }
    }
  }
}
</script>

<style scoped>
input {
  margin: 10px;
}

.btn-primary {
  padding: 10px 20px;
  margin-top: 15px;
  margin-right: 10px;
  margin-bottom: 30px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #45a049;
}

#delete:hover {
  background-color: red;
}
</style>
<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>Create A Student Account</h1>
      <div class="form-item">
        <label for="username">Username:</label>
        <input id="username" type="text" v-model="newStudentData.user.username" required/>
      </div>
      <div class="form-item">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="newStudentData.user.password" required/>
      </div>
      <div class="form-item">
        <label for="password2">Retype Password:</label>
        <input id="password2" type="password" v-model="password2" required/>
      </div>
      <div class="form-item">
        <label for="firstName">First name:</label>
        <input id="firstName" type="text" v-model="newStudentData.studentDto.firstName" required/>
      </div>
      <div class="form-item">
        <label for="middleInitial">Middle Initial:</label>
        <input id="middleInitial" type="text" v-model="newStudentData.studentDto.middleInitial" />
      </div>
      <div class="form-item">
        <label for="lastName">Last name:</label>
        <input id="lastName" type="text" v-model="newStudentData.studentDto.lastName" required/>
      </div>
      <button type="submit">Submit</button>
      <p v-if="passwordNotMatch">passwords are not matched</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newStudentData: {
        user: {
          username: '',
          password: '',
          enabled: true,
          roles: 'student'
        },
        studentDto: {
          firstName: '',
          middleInitial: '',
          lastName: '',
        }
      },
      password2: '',
      passwordNotMatch: undefined
    };
  },
  methods: {
    checkPassword: function () {
          

    },
    submitForm() {

      if (this.newStudentData.user.password != this.password2) {
            this.passwordNotMatch = true;
            return;
            alert('after return');
          }
        this.passwordNotMatch = false;

      axios.post('http://localhost:8080/students', this.newStudentData)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    },
  },
};
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

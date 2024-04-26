<template>
  <div v-if="!submitted" class="container">

    <div v-if="!edittingPass">
      <form @submit.prevent="submitForm">
        <h1>Edit Student Account</h1>
        <div class="form-item">
          <label for="firstName">First name:</label>
          <input id="firstName" type="text" v-model="studentDto.firstName" required/>
        </div>
        <div class="form-item">
          <label for="middleInitial">Middle Initial:</label>
          <input id="middleInitial" type="text" v-model="studentDto.middleInitial" />
        </div>
        <div class="form-item">
          <label for="lastName">Last name:</label>
          <input id="lastName" type="text" v-model="studentDto.lastName" required/>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button @click="editPass">Change Password</button>
    </div>

    <div v-else>
      <h1>Change Password</h1>
      <form @submit.prevent="changePass">
        <div class="form-item">
          <label for="password">Password:</label>
          <input id="password" type="password" v-model="password1" required/>
        </div>
        <div class="form-item">
          <label for="password2">Retype Password:</label>
          <input id="password2" type="password" v-model="password2" required/>
        </div>
        <button type="submit">Submit</button>
        <button @click="edittingPass = !edittingPass">Cancel</button>
        <p v-if="passwordNotMatch">passwords are not matched</p>
      </form>
    </div>

  </div>
  <div v-else class="container">
    <h1>Account Successfully Edited</h1>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      studentDto: {
        id: '',
        firstName: '',
        middleInitial: '',
        lastName: '',
        email: '',
      },
      password1: '',
      password2: '',
      passwordNotMatch: undefined,
      submitted: false,
      edittingPass: false,
    };
  },
  mounted() {
    this.setDetails()
  },
  methods: {
    setDetails(){
      const loggedInStudent = JSON.parse(localStorage.getItem("userInfo")).student
      this.studentDto.id = loggedInStudent.id
      this.studentDto.firstName = loggedInStudent.firstName
      this.studentDto.middleInitial = loggedInStudent.middleInitial
      this.studentDto.lastName = loggedInStudent.lastName
      this.studentDto.email = loggedInStudent.email
    },
    submitForm() {
      if (confirm('Are you sure you want to submit?')) {
        const URL = 'http://localhost:8080/students/' + this.studentDto.id
        axios.put(URL, this.studentDto)
          .then(response => {
            //console.log(response.data.data)
            this.submitted = true
          })
          .catch(error => {
            console.error('There was an error!', error.response.data);
          });
      }
    },
    editPass() {
      this.edittingPass = true
      //console.log(this.edittingPass)
    },
    changePass(){
      if (confirm('Are you sure you want to submit?')) {
        if (this.password1 != this.password2) {
          this.passwordNotMatch = true;
          return;
        }
        this.passwordNotMatch = false;


        axios.put('http://localhost:8080/students/changePassword',{
          newPass: this.password1
        })
          .then(response => {
            //console.log(response.data.data)
            this.submitted = true
          })
          .catch(error => {
            console.error('There was an error!', error.response.data);
          });
      }
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

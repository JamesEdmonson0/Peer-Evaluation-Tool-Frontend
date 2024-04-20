<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" type="text" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      const basicAuth = 'Basic ' + btoa(this.username + ":" + this.password);
      axios.post('http://localhost:8080/users/login', {}, { 
        headers: { 'Authorization': basicAuth }
      })
        .then(response => {
          console.log(response.data.data.token);
          const token = response.data.data.token; // Assuming the token is returned in response data
          localStorage.setItem('authToken', token); // Storing token in local storage
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Setting default header
          this.$router.push('/home'); // Redirecting to the home route
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    }
  }
};
</script>

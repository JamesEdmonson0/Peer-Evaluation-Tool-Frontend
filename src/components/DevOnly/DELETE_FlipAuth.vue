<template>
  
  
  <button @click="flip">Flip Auth</button>
  <div>
    <span v-if="$store.state.isAuthenticated">Logged In</span>
    <span v-if="!$store.state.isAuthenticated">Logged Out</span>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  methods: {
    flip() {
      if (this.$store.state.isAuthenticated) {
        localStorage.removeItem("authToken");
        delete axios.defaults.headers.common["Authorization"];
        this.$store.commit("setAuthentication", false);
      } else {
        const basicAuth = "Basic " + btoa('Asuri' + ":" + 'summer2024');
        const url = "http://localhost:8080/users/login"
        axios.post(url,{},
          {
            headers: { Authorization: basicAuth },
          })
          .then((response) => {
            const token = response.data.data.token; // Assuming the token is returned in response data
            localStorage.setItem("authToken", token); // Storing token in local storage
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Setting default header
            this.$store.commit("setAuthentication", true);
          })
          .catch((error) => {
            console.error("There was an error!", error.response.data);
          });
      }
      
    },
  },
};
</script>

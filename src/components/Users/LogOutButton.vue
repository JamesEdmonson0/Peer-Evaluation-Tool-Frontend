<template>
  <button @click="logout">Logout</button>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    logout() {
      localStorage.removeItem("authToken"); // Remove the token from local storage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("role")
      delete axios.defaults.headers.common["Authorization"]; // Clear the auth header
      this.$store.commit("setAuthentication", false);
      this.$router.push("/login"); // Redirect the user to the login page
    },
  },
};
</script>


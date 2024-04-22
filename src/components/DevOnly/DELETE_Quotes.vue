<template>

  <h2><i>{{ joke }}</i></h2>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      joke: '',
    };
  },
  created() {
    this.fetchAdvice();
  },
  methods: {
    fetchAdvice() {
      axios.get("https://icanhazdadjoke.com/", {
        headers: { 
          Accept: "application/json",
          Authorization: undefined
       }
      })
        .then((response) => {
          this.joke = response.data.joke;
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
  },
};
</script>

<style></style>

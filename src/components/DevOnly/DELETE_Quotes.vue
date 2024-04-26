<template>

  <h2><i>{{ advice }}</i></h2>
  <button @click="fetchAdvice">New Joke</button>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      advice: '',
      joke: '',
      funny: ''
    };
  },
  created() {
    this.fetchAdvice();
    this.fetchJoke();
    this.fetchJoke2();
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
          this.advice = response.data.joke;
          //console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
    fetchJoke() {
      axios.get("https://v2.jokeapi.dev/joke/Programming?type=single", {
        headers: { 
          Accept: "application/json",
          Authorization: undefined
       }
      })
        .then((response) => {
          this.joke = response.data.joke;
          //console.log(response);
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
    fetchJoke2() {
      
      axios.get('https://geek-jokes.sameerkumar.website/api?format=json', {
        headers: { 
          Accept: "application/json",
          Authorization: undefined
       }
      })
        .then((response) => {
          this.funny = response.data.joke;
          //console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    }
  },
};
</script>

<style></style>

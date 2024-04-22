<script setup>
import Quote from '../components/DevOnly/DELETE_Quotes.vue'
</script>

<template>
  <div class="container">
    <h1>Welcome to the Peer Evaluation Front End</h1>
    <Quote></Quote>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
}
</style>

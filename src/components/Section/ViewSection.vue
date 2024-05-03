<template>

  <div>
    <h1>{{section.sectionName}}</h1>
    <h3>{{section.academicYear}}</h3>
   <!-- <h3>{{details.firstDay}}</h3> -->
  </div>
</template>

<script setup>
</script>

<script>

import axios from "axios";

export default {
  name: "sectionDetails",
  props: ['id'],
  data() {
    return {
      section: {},
    }
    },
  created() {
    this.getDetails()
  },

  methods: {
    getDetails () {
      const URL = 'http://localhost:8080/section/' + this.id
      axios.get(URL)
          .then(response => {
            this.section = response.data.data
          })
          .catch(error => {
            console.error('There was an error!', error.response.data)
          });
    }
  }

}

</script>

<style scoped>

input{
  margin: 10px;
}

</style>
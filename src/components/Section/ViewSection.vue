<template>
  <div class="section-details">
    <div class="field">
      <label>Section Name:</label>
      <span>{{ section.sectionName }}</span>
    </div>
    <div class="field">
      <label>Academic Year:</label>
      <span>{{ section.academicYear }}</span>
    </div>
    <div class="field">
      <label>Last Day:</label>
      <span>{{ section.lastDay }}</span>
    </div>
    <div class="field">
      <label>First Day:</label>
      <span>{{ section.firstDay }}</span>
    </div>
    <div class="field">
      <label>Rubric Name:</label>
      <span>{{ section.rubricDto.rubricName }}</span>
    </div>
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
    this.getDetails();
  },
  methods: {
    getDetails() {
      const URL = 'http://localhost:8080/section/' + this.id;
      axios.get(URL)
          .then(response => {
            this.section = response.data.data;
          })
          .catch(error => {
            console.error('There was an error!', error.response.data);
          });
    }
  }
}
</script>

<style scoped>
.section-details {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.field {
  margin-bottom: 10px;
}

.field label {
  font-weight: bold;
}

.field span {
  margin-left: 10px;
}
</style>

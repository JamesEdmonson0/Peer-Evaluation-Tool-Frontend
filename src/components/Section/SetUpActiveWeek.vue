<template>
  <div v-if="!submitted" class="container">
    <form @submit.prevent="createdActiveWeekObject" class="section-form">
      <h1>Set Up Active Week for {{ section.sectionName }}</h1>

      <h2>Weeks should be between the following section limit dates</h2>
      <h3>Start date: {{ section.firstDay }} --> Last date: {{ section.lastDay }}</h3>

      <div class="form-item">
        <label for="section"> Section :</label>
        <div class="input-container">
          <input id="section" type="text" :value="section.sectionName" disabled />
        </div>
      </div>

      <div class="form-item">
        <label for="activeWeekDates">Active Week Dates:</label>
        <div class="input-container" v-for="(date, index) in activeWeek.activeWeekList" :key="index">
          <input type="date" v-model="activeWeek.activeWeekList[index]" />
          <button type="button" @click="removeDate(index)">Remove</button>
        </div>
        <button type="button" @click="addDate">Add Date</button>
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>

  <div v-else class="container">
    <h1>Successfully Set Up Active Weeks For {{ section.sectionName }} section</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "sectionDetails",
  props: ['id'],
  data() {
    return {
      section: {},
      activeWeek: {
        activeWeekName: "",
        activeWeekList: []
      },
      submitted: false,
      returnedData: {}
    };
  },

  created() {
    this.getDetails();
  },

  methods: {
    createdActiveWeekObject() {
      axios.post("http://localhost:8080/activeWeek", this.activeWeek)
          .then(response => {
            this.returnedData = response.data.data;
            this.submitted = true;
            console.log("Active week created:", response.data.data);
          })
          .catch(error => {
            console.error("Error creating active week:", error.response.data);
          });
    },

    getDetails() {
      const URL = 'http://localhost:8080/section/' + this.id;
      axios.get(URL)
          .then(response => {
            this.section = response.data.data;
            this.activeWeek.sectionDto = this.section;
            console.log('Section details retrieved:', response.data.data);
          })
          .catch(error => {
            console.error('Error retrieving section details:', error.response.data);
          });
    },

    addDate() {
      this.activeWeek.activeWeekList.push("");
    },

    removeDate(index) {
      this.activeWeek.activeWeekList.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.section-form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-item {
  margin-bottom: 10px;
}

.input-container {
  position: relative;
}

input[type="text"],
input[type="date"] {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

input[type="date"] {
  margin-right: 10px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.input-container button {
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.input-container button:hover {
  background-color: #c82333;
}
</style>


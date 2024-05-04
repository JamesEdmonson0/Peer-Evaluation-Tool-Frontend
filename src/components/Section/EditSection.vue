<template>
  <div v-if="!submitted" class="container">
    <form @submit.prevent="submitSection" class="section-form">
      <h1>Editing Section {{ section.sectionName }}</h1>
      <div class="form-item">
        <label for="sectionName">Section Name:</label>
        <div class="input-container">
          <input id="sectionName" type="text" v-model="section.sectionName" />
          <span class="input-helper">Format: "SectionYYYY-YYYY" </span>
        </div>
      </div>

      <div class="form-item">
        <label for="academicYear">Academic Year:</label>
        <div class="input-container">
          <input id="academicYear" type="text" v-model="section.academicYear" />
          <span class="input-helper">Format: "YYYY" </span>
        </div>
      </div>
      <div class="form-item">
        <label for="firstDate">First Day:</label>
        <div class="input-container">
          <input id="firstDate" type="text" v-model="section.firstDay" />
          <span class="input-helper">Format: "MM/DD/YYYY"</span>
        </div>
      </div>

      <div class="form-item">
        <label for="lastDate">Last Day:</label>
        <div class="input-container">
          <input id="lastDate" type="text" v-model="section.lastDay" />
          <span class="input-helper">Format: "MM/DD/YYYY"</span>
        </div>
      </div>


      <div class="form-item">
        <label for="rubric">Select Rubric:</label>
        <select id="rubric" v-model="selectedRubric" class="rubric-select">
          <option v-for="rubric in rubricList" :key="rubric.id" :value="rubric">{{ rubric.rubricName }}</option>
        </select>
      </div>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>

  <div v-else class="container">
    <h1>Successfully Created {{ newSectionData.sectionName }} section</h1>
    <h2>You can view it here</h2>
    <RouterLink to="/findSection">Find the created Section</RouterLink>
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
      newSectionData: {
        sectionName: "",
        academicYear: "",
        firstDay: "",
        lastDay: "",
        rubricDto: null,
      },
      submitted: false,
      rubricList: [],
      selectedRubric: null,
      returnedData: {},
    };
  },
  created() {
    this.getDetails();
  },

  mounted() {
    this.fetchRubrics();
  },


  methods: {
    getDetails() {
      const URL = 'http://localhost:8080/section/' + this.id;
      axios.get(URL)
          .then(response => {
            this.section = response.data.data;
            console.log('Section created:', response.data.data);
          })
          .catch(error => {
            console.error('There was an error!', error.response.data);
          });
    },

    fetchRubrics() {
      axios.get("http://localhost:8080/rubric/allRubrics")
          .then(response => {
            this.rubricList = response.data.data;
            console.log("Rubric list:", this.rubricList);
          })
          .catch(error => {
            console.error("Error fetching rubrics:", error);
          });
    },

    submitSection() {
      this.newSectionData.rubricDto = this.selectedRubric;
      axios.put("http://localhost:8080/section/" + this.id, this.newSectionData)
          .then(response => {
            this.returnedData = response.data.data;
            this.submitted = true;
            console.log("Section created:", response.data.data);
          })
          .catch(error => {
            console.error("Error creating section:", error.response.data);
          });
    },

  }

}
</script>



<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

.label {
  font-weight: bold;
}

.input-container {
  position: relative;
}

.input-helper {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: #666;
}

input[type="text"],
select {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.rubric-select {
  width: 100%;
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
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>


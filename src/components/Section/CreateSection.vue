<template>
  <div v-if="!submitted" class="container">
    <form @submit.prevent="submitSection">
      <h1>Create Senior Design Section</h1>
      <div class="form-item">
        <label for="sectionName">Section Name:</label>
        <input id="sectionName" type="text" v-model="newSectionData.sectionName" />
      </div>
      <div class="form-item">
        <label for="academicYear">Academic Year:</label>
        <input id="academicYear" type="text" v-model="newSectionData.academicYear" />
      </div>
      <div class="form-item">
        <label for="firstDate">First Day:</label>
        <input id="firstDate" type="text" v-model="newSectionData.firstDay" />
      </div>
      <div class="form-item">
        <label for="lastDate">Last Day:</label>
        <input id="lastDate" type="text" v-model="newSectionData.lastDay" />
      </div>
      <div class="form-item">
        <label for="rubric">Select Rubric:</label>
        <select id="rubric" v-model="selectedRubric">
          <option v-for="rubric in rubricList" :key="rubric.id" :value="rubric">{{ rubric.rubricName}}</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>

  <div v-else class = "container">
    <h1>Account Successfully Created {{newSectionData.sectionName}} section </h1>
    <h2> You can view it here</h2>
    <RouterLink to="/findSection"> Find the created Section </RouterLink>

  </div>




</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newSectionData: {
        sectionName: '',
        academicYear: '',
        firstDay: '',
        lastDay: '',
        rubricDto: null, //
      },
      submitted: false,
       rubricList: [], // Array to store fetched rubric list
      selectedRubric: null, // Store selected rubric ID
      returnedData: {},
    };
  },
  mounted() {
    this.fetchRubrics(); // Fetch rubric list when component is mounted
  },
  methods: {
    fetchRubrics() {
      axios.get('http://localhost:8080/rubric/allRubrics')
          .then(response => {

            this.rubricList = response.data.data; // Assuming response.data is an array of rubrics
            console.log('Rubric list:', this.rubricList); // Add this line to check the fetched rubric list
          })
          .catch(error => {
            console.error('Error fetching rubrics:', error);
          });
    },
    submitSection() {
      //if (confirm('Are you sure you want to submit?')) {
       this.newSectionData.rubricDto = this.selectedRubric; // Assign selected rubric object
        axios.post('http://localhost:8080/section', this.newSectionData)
            .then(response => {
              this.returnedData = response.data.data;
              this.submitted = true;
              console.log('Section created:', response.data.data);
            })
            .catch(error => {
              console.error('Error creating section:', error.response.data);
            });
    //  }
    },
  },
};
</script>

<style scoped>
input, select {
  margin: 10px;
}

.container {
  display: flex;
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
}
</style>

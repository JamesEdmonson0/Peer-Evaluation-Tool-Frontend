<template>
  <div v-if="!submitted" class="container">
    <form @submit.prevent="submitTeam" class="team-form">
      <h1>Create Senior Design Team</h1>
      <div class="form-item">
        <label for="teamName">Team Name:</label>
        <div class="input-container">
<!--          <span class="input-helper">Format: "SectionYYYY-YYYY"</span>-->
          <input id="sectionName" type="text" v-model="newTeamData.teamName" />
        </div>
      </div>
      <div class="form-item">
        <label for="academicYear">Academic Year:</label>
        <div class="input-container">
          <input id="academicYear" type="text" v-model="newTeamData.academicYear" />
        </div>
      </div>



      <div class="form-item">
        <label for="studentIds">Student ids:</label>
        <div class="input-container" v-for="(string, index) in newTeamData.studentIdsList" :key="index">
          <input type="date" v-model="newTeamData.studentIdsList[index]" />
          <button type="button" @click="removeId(index)">Remove</button>
        </div>
        <button type="button" @click="addId">Add StudentId</button>
      </div>


      <div class="form-item">
        <label for="section">Select Section:</label>
        <select id="section" v-model="selectedSection" class="rubric-select">
          <option v-for="section in sectionList" :key="section.id" :value="section">{{ section.sectionName }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="instructor">Select Instructor:</label>
        <select id="instructor" v-model="selectedInstructor" class="rubric-select">
          <option v-for="instructor in instructorList" :key="instructor.id" :value="instructor">{{ instructor.firstName}} {{ instructor.lastName}}</option>
        </select>
      </div>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
  <div v-else class="container">
    <h1>Successfully Created {{ newTeamData.teamName}} section</h1>
  </div>
</template>

<script>
import axios from "axios";
import index from "vuex";

export default {
  computed: {
    index() {
      return index
    }
  },
  data() {
    return {
      newTeamData: {
        teamName: "",
        academicYear: "",
        section: null,
        studentIdsList: [],
        instructor: null,
      },
      submitted: false,
      sectionList: [],
      selectedSection: null,
      instructorList: [],
      selectedInstructor:null,
      returnedData: {},
    };
  },
  mounted() {
    this.fetchInstructors();
    this.fetchSections();
  },
  methods: {
    async fetchInstructors() {
      axios.get("http://localhost:8080/instructors")
          .then(response => {
            this.instructorList = response.data.data;
            console.log("instructor list:", this.instructorList);
          })
          .catch(error => {
            console.error("Error fetching instructor:", error);
          });
    },

    fetchSections() {
      axios.get("http://localhost:8080/section/section_search")
          .then(response => {
            this.sectionList = response.data.data;
            console.log("instructor list:", this.sectionList);
          })
          .catch(error => {
            console.error("Error fetching instructor:", error);
          });
    },

    submitTeam() {
      this.newTeamData.section = this.selectedSection;
      this.newTeamData.instructor = this.selectedInstructor;
      axios.post("http://localhost:8080/teams", this.newTeamData)
          .then(response => {
            this.returnedData = response.data.data;
            this.submitted = true;
            console.log("Section created:", response.data.data);
          })
          .catch(error => {
            console.error("Error creating section:", error.response.data);
          });
    },

    addId() {
      this.newTeamData.studentIdsList.push("");
    },

    removeId(index) {
      this.newTeamData.studentIdsList.splice(index, 1);
    }
  },
};
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

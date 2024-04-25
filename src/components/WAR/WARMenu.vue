<script setup>
defineProps({
  week: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <div v-if="submissions.length > 0">
      <table>
        <thead>
          <tr>
            <th>Task Category</th>
            <th>Planned Task</th>
            <th>Description</th>
            <th>Planned Hours</th>
            <th>Actual Hours</th>
            <th>Status</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="submission in submissions" :key="submission.id">
            <td>{{ submission.taskCategory }}</td>
            <td>{{ submission.plannedTask }}</td>
            <td>{{ submission.description }}</td>
            <td>{{ submission.plannedHours }}</td>
            <td>{{ submission.actualHours }}</td>
            <td>{{ submission.status }}</td>
            <td>
              <button @click="editSubmission(submission.id)">Edit</button>
              <button @click="deleteSubmission(submission.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h1>No submissions for the week of {{ week }}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      submissions: {},
      //week: '',
      //weekSelected: false,
      isSubmission: false,
    };
  },
  async mounted() {
    try {
      await Promise.all([this.fetchWAR()]);
    } catch (error) {
      console.error("Error in mounted hook:", error);
    }
  },
  methods: {
    async fetchWAR() {
      console.log(this.week)
      const url = "http://localhost:8080/war/" + this.week;
      console.log(url);
      await axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.submissions = response.data.data;
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
    deleteSubmission(submissionId) {
      alert("Submission: " + submissionId);
      const url = "http://localhost:8080/war/" + submissionId;
      console.log(url);
      axios
        .delete(url)
        .then((response) => {
          console.log(response.data);
          this.submissions = this.submissions.filter(
            (item) => item.id !== submissionId
          );
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
    editSubmission(submissionId){
      this.$emit('edit', submissionId);
    }
  },
  watch: {
    week() {
      this.fetchWAR()
    }
  }
};
</script>

<style scoped>
.container {
  width: 50%;
  margin: auto;
}

table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
  text-align: center;
}
</style>

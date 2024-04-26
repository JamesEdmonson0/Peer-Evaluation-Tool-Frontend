<script setup>
defineProps({
  submissionId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="container mt-4">
    <h1>Editing WAR Task</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="taskCategory">Task Category</label>
        <select class="form-control" id="taskCategory" v-model="task.taskCategory" required>
          <option disabled value="">Please select one</option>
          <option>Research</option>
          <option>Documentation</option>
          <option>Design</option>
          <option>Development</option>
          <option>Testing</option>
          <option>Deployment</option>
          <option>Code Review</option>
          <option>Meeting</option>
        </select>
      </div>

      <div class="form-group">
        <label for="plannedTask">Planned Task</label>
        <input type="text" class="form-control" id="plannedTask" v-model="task.plannedTask" required>
      </div>

      <div class="form-group">
        <label for="description">Task Description</label>
        <input type="text" class="form-control" id="description" v-model="task.description" required>
      </div>

      <div class="form-group">
        <label for="plannedHours">Planned Hours</label>
        <input type="text" class="form-control" id="plannedHours" v-model="task.plannedHours" required>
      </div>

      <div class="form-group">
        <label for="actualHours">Actual Hours</label>
        <input type="text" class="form-control" id="actualHours" v-model="task.actualHours" required>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select class="form-control" id="status" v-model="task.status" required>
          <option>In progress</option>
          <option>Under testing</option>
          <option>Done</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
      <button class="btn btn-primary" @click="this.$router.push('/war');">Back</button>

    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      task: {
        taskCategory: '',
        plannedTask: '',
        description: '',
        plannedHours: '',
        actualHours: '',
        status: ''
      }
    };
  },
  async mounted() {
    try {
      await Promise.all([this.fetchDetails()]);
    } catch (error) {
      console.error("Error in mounted hook:", error);
    }
  },
  methods: {
    async fetchDetails() {
      const URL = 'http://localhost:8080/war/id/' + this.submissionId;
      await axios.get(URL)
      .then(response => {
          this.task = response.data.data
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });

      //console.log(this.task); // Here, you would typically handle the form submission, e.g., sending data to a server.
    },
    submitForm() {
      const URL = 'http://localhost:8080/war'
      axios.put(URL,this.task )
      .then(response => {
          //console.log(response.data)
          this.$emit('edited');
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });

      //console.log(this.task); // Here, you would typically handle the form submission, e.g., sending data to a server.
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
}
</style>

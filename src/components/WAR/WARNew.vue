<script setup>
defineProps({
  week: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="container mt-4">
    <h1>New Task for WAR of the of {{ week }}</h1>
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
  //props: ['week'],
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
  methods: {
    submitForm() {
      const URL = 'http://localhost:8080/war/' + this.week;
      axios.post(URL,this.task )
      .then(response => {
          this.$emit('submitted');
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    }
  }
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

<!-- TaskForm.vue -->
<template>
  <div class="container mt-4">
    <h2>Task Management Form</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="category">Task Category</label>
        <select class="form-control" id="category" v-model="task.category">
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
        <input type="text" class="form-control" id="plannedTask" v-model="task.plannedTask">
      </div>

      <div class="form-group">
        <label for="description">Task Description</label>
        <input type="text" class="form-control" id="description" v-model="task.description">
      </div>

      <div class="form-group">
        <label for="plannedHours">Planned Hours</label>
        <input type="text" class="form-control" id="plannedHours" v-model="task.plannedHours">
      </div>

      <div class="form-group">
        <label for="actualHours">Actual Hours</label>
        <input type="text" class="form-control" id="actualHours" v-model="task.actualHours">
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select class="form-control" id="status" v-model="task.status">
          <option>In progress</option>
          <option>Under testing</option>
          <option>Done</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      task: {
        category: '',
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
      const json = {
        "taskCategory": this.task.category,
        "plannedTask": this.task.plannedTask,
        "description": this.task.description,
        "plannedHours": this.task.plannedHours,
        "actualHours": this.task.actualHours,
        "status": this.task.status
      }
      console.log(json)
      axios.post('http://localhost:8080/war/4',this.task )
      .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });

      console.log(this.task); // Here, you would typically handle the form submission, e.g., sending data to a server.
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

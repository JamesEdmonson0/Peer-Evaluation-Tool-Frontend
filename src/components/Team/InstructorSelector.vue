<script setup>
defineProps({
    tid: {
    type: String,
    required: true,
  }
});
</script>

<template>
  <select v-model="selectedInstructor">
    <option disabled value="">Please select an instructor</option>
    <option v-for="instructor in instructors" :key="instructor.id" :value="instructor">{{ instructor.name }}</option>
  </select>
  <button @click="submit">Submit</button>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedInstructor: null,
      instructors: [
        {
          name: "Liran Ma",
          id: 1
        },
        {
          name: "Michael Scherger",
          id: 2
        }
      ]
    };
  },
  methods: {
    submit() {
      if (confirm('Are you sure you want to submit?')) {
        if (this.selectedInstructor) {
          console.log(this.selectedInstructor.name);
          const URL = 'http://localhost:8080/instructors/assign/' + this.selectedInstructor.id + '/' + this.tid;
          console.log(URL);
          // Assuming you want to make a POST request to the constructed URL
          axios.post(URL)
            .then(response => {
              // Handle success response if needed
              console.log("Assignment submitted successfully");
            })
            .catch(error => {
              // Handle error response if needed
              console.error('There was an error submitting the assignment:', error);
            });
        } else {
          console.error('No instructor selected');
        }
      }
    }
  }
};
</script>

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

<style scoped>
button {
  height: 2.8em;
  width: 8em;
  background: transparent;
  -webkit-animation: jello-horizontal 0.9s both;
  animation: jello-horizontal 0.9s both;
  border: 2px solid #016dd9;
  outline: none;
  color: #016dd9;
  cursor: pointer;
  font-size: 12px;
  margin-left: 4px;
  margin-right: 4px;
}

button:hover {
  background: #016dd9;
  color: #ffffff;
  animation: squeeze3124 0.9s both;
}

@keyframes squeeze3124 {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

</style>

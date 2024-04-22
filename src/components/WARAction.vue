<!-- TaskForm.vue -->
<template>
  <div class="container">
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
            <button>Edit</button>
            <button @click="deleteSubmission(submission.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      submissions: [
        {
          id: 1,
          teamMember: "Aliya Suri",
          taskCategory: "Backend dev",
          plannedTask: "Task1",
          description: "description of task",
          plannedHours: 5.0,
          actualHours: 6.0,
          status: "Done",
        },
        {
          id: 2,
          teamMember: "Aliya Suri",
          taskCategory: "Documentation",
          plannedTask: "Task2",
          description: "description of task",
          plannedHours: 1.0,
          actualHours: 0.5,
          status: "Done",
        },
        {
          id: 3,
          teamMember: "Aliya Suri",
          taskCategory: "Frontend dev",
          plannedTask: "Task3",
          description: "description of task",
          plannedHours: 4.0,
          actualHours: 8.0,
          status: "Not Done",
        },
      ],
      week: 4,
    };
  },
  created() {
    this.fetchWAR();
  },
  methods: {
    fetchWAR() {
      const url = 'http://localhost:8080/war/'
      axios.get(url)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });

    },
    deleteSubmission(submissionId) {
      alert("Submission: " + submissionId);
      const url = "http://localhost:8080/war/" + submissionId;
      console.log(url);
      axios.delete(url)
        .then((response) => {
          console.log(response.data);
          this.submissions = this.submissions.filter(item => item.id !== submissionId);
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
  },
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

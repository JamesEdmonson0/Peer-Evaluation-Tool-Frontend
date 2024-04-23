<template>
  <table>
    <thead>
      <tr>
        <th>Team Member</th>
        <th v-for="criterion in rubric.criterion" :key="criterion.id">
          {{ criterion.description }}
        </th>
        <th>Comments</th>
        <th>Grade</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="evalutaion in evals" :key="evalutaion.id">
        <td>{{ evalutaion.evaluator }}</td>
        <td v-for="(score, index) in evalutaion.scores" :key="index">
          {{ score }}
        </td>
        <td>{{ evalutaion.publicComments }}</td>
        <td>{{ evalutaion.totalScore }}/{{ this.totalMaxScore }} </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rubric: {

      },
      evals: [

      ],
      totalMaxScore: undefined,
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    fetchQuestions() {
      axios
        .get("http://localhost:8080/peerEval/peerEvalReportStudent/4")
        .then((response) => {
          this.rubric = response.data.data.rubric;
          this.evals = response.data.data.evals;
          this.totalMaxScore = response.data.data.totalMaxScore;
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
  display: flex;
  justify-content: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
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

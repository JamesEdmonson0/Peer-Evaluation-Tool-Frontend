<template>
  <div>
    
    <h1>{{ details.firstName}} {{ details.lastName }}</h1>

    <h3>Team Name: {{ details.teamName }} - Academic Year: {{ details.academicYear }}</h3>
    <hr>

    <div>
      <h2>Peer Evaluations</h2>
      <div v-for="peerEval in peerEvals" :key="peerEval.id">
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
            <tr v-for="evalutaion in peerEvals" :key="evalutaion.id">
              <td>{{ evalutaion.evaluator }}</td>
              <td v-for="(score, index) in evalutaion.scores" :key="index">
                {{ score }}
              </td>
              <td>{{ evalutaion.publicComments }}</td>
              <td>{{ evalutaion.totalScore }}/{{ this.totalMaxScore }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div>
      <h2>Weekly Activity Report</h2>
      <div>
        <!-- unordered list -->
      </div>
    </div>




  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "StudentDetails",
  props: ['id'],
  data() {
    return {
      details: {},
      peerEvals: {},
      rubric: {},
      totalMaxScore: undefined,
    };
  },
  created() {
    this.getDetails()
    this.getPeerEvals()
    this.fetchQuestions()
  },
  methods: {
    getDetails() {
      const URL = 'http://localhost:8080/students/' + this.id
      axios.get(URL)
      .then(response => {
          this.details = response.data.data
          //console.log(response.data.data)
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    },
    getPeerEvals() {
      const URL = 'http://localhost:8080/peerEval/getEvals/' + this.id
      axios.get(URL)
      .then(response => {
          this.peerEvals = response.data.data[0].evaluations
          //console.log(response.data.data[0].evaluations)
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    },
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
  }
}
</script>

<style scoped>
input {
  margin: 10px;
}
</style>
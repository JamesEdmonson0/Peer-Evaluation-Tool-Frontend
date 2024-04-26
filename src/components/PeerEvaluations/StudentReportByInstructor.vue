<template>

    <week-selector @week-changed="handleWeekChange" />
  
    <div v-if="evalBool">
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Grade</th>
            <th>Commented by</th>
            <th>Public comments</th>
            <th>Private comments</th>
            
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
    </div>
    <div v-else>
      <h1> {{ this.noEvalMsg }} </h1>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import WeekSelector from "../Utils/WeekSelector.vue";
  
  export default {
  
    components: {
      WeekSelector
    },
    data() {
      return {
        rubric: {
  
        },
        evals: [
  
        ],
        totalMaxScore: undefined,
        evalBool: undefined,
        noEvalMsg: '',
        week: '04/22/2024',
        activeWeeks: [],
      };
    },
    methods: {
       fetchReport() {
        const URL = 'http://localhost:8080/peerEval/peerEvalReportStudent/' + this.week
        axios
          .get(URL)
          .then((response) => {
            //console.log(response.data.data)
            this.evalBool = response.data.data.evals.length !== 0
            if(this.evalBool) {
              
              this.rubric = response.data.data.rubric;
              this.evals = response.data.data.evals;
              this.totalMaxScore = response.data.data.totalMaxScore;
            } else {
              this.noEvalMsg = 'No Evals Found for the week of: ' + this.week;
            }
          })
          .catch((error) => {
            console.error("There was an error!", error.response.data);
          });
      },
      handleWeekChange(week) {
        this.week = week;
        this.fetchReport()
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
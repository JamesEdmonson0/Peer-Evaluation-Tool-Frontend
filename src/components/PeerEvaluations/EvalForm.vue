<template>
  <div class="container" v-if="!isSubmitted">
    <div v-if="isActiveWeek">
      <h1>Evaluating for the week of {{ week }}</h1>
      <form @submit.prevent="submitForm">
        <div
          v-if="Object.keys(answers).length > 0"
          v-for="teammate in teammates"
          :key="teammate.id"
        >
          <h3>Evaluating: {{ teammate.firstName }} {{ teammate.lastName }}</h3>
          <div v-for="criterion in criteria" :key="criterion.id">
            <label :for="`input-${teammate.id}-${criterion.id}`">{{
              criterion.description
            }}</label>
            <input
              :id="`input-${teammate.id}-${criterion.id}`"
              v-model="answers[teammate.id].scores[criterion.id]"
              type="number"
              min="1"
              :max="criterion.maxScore"
              required
            />
          </div>
          <div class="textBox">
            <label :for="`private-${teammate.id}`">Private Comment:</label>
            <textarea
              :id="`private-${teammate.id}`"
              v-model="answers[teammate.id].privateComment"
              required
            ></textarea>
          </div>
          <div class="textBox">
            <label :for="`public-${teammate.id}`">Public Comment:</label>
            <textarea
              :id="`public-${teammate.id}`"
              v-model="answers[teammate.id].publicComment"
              required
            ></textarea>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-else class="container">
      <h1>The week of {{ this.week }} is not an Active Week</h1>
      <h2>There is no need to submit a Peer Evaluation this week</h2>
      <RouterLink to="/">Go Home</RouterLink>
    </div>
  </div>
  <div class="container" v-else>
    <h1>Peer Evaluation for the week of {{ this.week }} submitted</h1>
    <RouterLink to="/">Go Home</RouterLink>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      criteria: [],
      teammates: [],
      answers: {},
      week: '',
      isActiveWeek: undefined,
      notActiveWeekMsg: '',
      isSubmitted: false,
    };
  },
  async mounted() {
    try {
      await Promise.all([this.fetchTeamMates(), this.fetchQuestions(), this.fetchWeek()]);
      this.initializeAnswers();
    } catch (error) {
      console.error("Error in mounted hook:", error);
    }
  },
  methods: {
    async fetchQuestions() {
      await axios
        .get("http://localhost:8080/rubric")
        .then((response) => {
          this.criteria = response.data.data.criterion;
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
    async fetchTeamMates() {
      await axios
        .get("http://localhost:8080/students/teammates")
        .then((response) => {
          this.teammates = response.data.data;
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
    async fetchWeek(){
      const URL = 'http://localhost:8080/section/week/' + JSON.parse(localStorage.getItem("student")).section
      await axios
        .get(URL)
        .then((response) => {
          this.week = response.data.data;
          // once active weeks are set up, the response object will be updated to include a boolean
          // that boolean will be used to stop the display of the entire 
          this.isActiveWeek = true
        })
        .catch((error) => {
          console.error("There was an error!", error.response.data);
        });
    },
    initializeAnswers() {
      this.teammates.forEach((teammate) => {
        if (!this.answers[teammate.id]) {
          this.answers[teammate.id] = {
            scores: {},
            privateComment: "",
            publicComment: "",
          };
        }
        this.criteria.forEach((criterion) => {
          if (this.answers[teammate.id].scores[criterion.id] === undefined) {
            this.answers[teammate.id].scores[criterion.id] = "";
          }
        });
      });
    },
    submitForm() {
      if (confirm('Are you sure you want to submit?')) {
        const peerEval = {
          evaluator: JSON.parse(localStorage.getItem("student")),
          evaluations: this.teammates.map((teammate) => ({
            evaluated: teammate,
            scores: Object.values(this.answers[teammate.id].scores),
            privateComments: this.answers[teammate.id].privateComment,
            publicComments: this.answers[teammate.id].publicComment,
          })),
          week: this.week,
        }

        axios.post("http://localhost:8080/peerEval",peerEval)
          .then((response) => {
            console.log(response.data)
            if(response.data.flag) {
              this.isSubmitted = true
            }
          })
          .catch((error) => {
            console.error("There was an error!", error.response.data);
          });
      } else {
        console.log ("not confirmed")
      }
    },
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
.textBox {
  display: flex;
  align-items: center;
}
table,
th,
td {
  border: 2px solid black;
  border-collapse: collapse;
}
/* For Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

<!--

  need to either modifify the student dto to include team, rather than just team name,
  of need a seperate endpoint to get the team members of the current users team

-->

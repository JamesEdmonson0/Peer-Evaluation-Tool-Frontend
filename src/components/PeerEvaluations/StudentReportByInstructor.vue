<template>
  <div>
    <h1>Peer Evaluations</h1>
    <week-selector @week-changed="handleWeekChange" />
    <table>
      <thead>
        <tr>
          <th>Week</th>
          <th>Grade</th>
          <th>Commented By</th>
          <th>Public Comments</th>
          <th>Private Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in formattedEvaluations" :key="student.id">
          <td>{{ this.selectedWeek }}</td>
          <td>{{ student.averageGrade.toFixed(2) }}</td>
          <td>
            <table>
              <tr v-for="evaluator in student.evaluators" :key="`name-${evaluator.name}`">
                <td>{{ evaluator.name }}</td>
              </tr>
            </table>
          </td>
          <td>
            <table>
              <tr v-for="evaluator in student.evaluators" :key="`public-${evaluator.name}`">
                <td>{{ evaluator.publicComments }}</td>
              </tr>
            </table>
          </td>
          <td>
            <table>
              <tr v-for="evaluator in student.evaluators" :key="`private-${evaluator.name}`">
                <td>{{ evaluator.privateComments }}</td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import WeekSelector from '../Utils/WeekSelector.vue'; // Adjust the path as necessary

export default {
  props: ['id'],
  components: {
    WeekSelector,
  },
  data() {
    return {
      evaluations: [],
      formattedEvaluations: [],
      selectedWeek: "",
    };
  },
  methods: {
    handleWeekChange(week) {
      this.selectedWeek = week;
      this.fetchEvaluations(); // Refetch evaluations with the new week
    },
    fetchEvaluations() {
      const url = `http://localhost:8080/peerEval/peerEvalReportForStudent/${this.id}/${this.selectedWeek}`;
      axios
        .get(url)
        .then((response) => {
          console.log('API Response:', response);
          this.evaluations = response.data.data.evals;
          this.processData();
        })
        .catch((error) => {
          console.error("Error fetching evaluations:", error);
          console.log('Error Response:', error.response);
        });
    },
    processData() {
      const studentMap = new Map();

      this.evaluations.forEach((evaluation) => {
        const studentId = evaluation.evaluated.id;
        if (!studentMap.has(studentId)) {
          studentMap.set(studentId, {
            id: studentId,
            name: `${evaluation.evaluated.firstName} ${evaluation.evaluated.middleInitial} ${evaluation.evaluated.lastName}`,
            totalScore: 0,
            count: 0,
            evaluators: [],
          });
        }
        const studentInfo = studentMap.get(studentId);
        studentInfo.totalScore += evaluation.totalScore;
        studentInfo.count++;
        studentInfo.evaluators.push({
          name: evaluation.evaluator,
          publicComments: evaluation.publicComments,
          privateComments: evaluation.privateComments
        });
      });

      this.formattedEvaluations = Array.from(studentMap.values()).map(student => ({
        ...student,
        averageGrade: student.totalScore / student.count
      }));
    },
  },
  mounted() {
    this.fetchEvaluations();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
</style>

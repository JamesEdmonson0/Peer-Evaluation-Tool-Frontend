<template>
  <div>
    <h1>Senior Design Section Peer Evaluations</h1>
    <week-selector @week-changed="handleWeekChange" />
    <section-selector @section-changed="handleSectionChange" />
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Grade</th>
          <th>Commented By</th>
          <th>Public Comments</th>
          <th>Private Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in formattedEvaluations" :key="student.id">
          <td>{{ student.name }}</td>
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
import WeekSelector from '../Utils/WeekSelector.vue';
import SectionSelector from '../Utils/SectionSelector.vue'; // Adjust the path as necessary

export default {
  components: {
    WeekSelector,
    SectionSelector
  },
  data() {
    return {
      evaluations: [],
      formattedEvaluations: [],
      selectedWeek: "",
      selectedSection: "",
    };
  },
  methods: {
    fetchEvaluations() {
      if (!this.selectedWeek || !this.selectedSection) return; // Ensure both are selected

      const url = `http://localhost:8080/peerEval/evaluations/${this.selectedWeek}/${this.selectedSection}`;
      axios.get(url)
        .then((response) => {
          this.evaluations = response.data.data;
          this.processData();
        })
        .catch((error) => {
          console.error("Error fetching evaluations:", error);
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

      this.formattedEvaluations = Array.from(studentMap.values()).map(
        (student) => ({
          ...student,
          averageGrade: student.totalScore / student.count,
        })
      );
    },
    handleSectionChange(section) {
      this.selectedSection = section;
      this.checkAndFetchEvaluations();
    },
    checkAndFetchEvaluations() {
      if (this.selectedWeek && this.selectedSection) {
        this.fetchEvaluations();
      }
    },
    handleWeekChange(week) {
      this.selectedWeek = week;
      this.fetchEvaluations();
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
  table-layout: fixed;
  /* Helps in maintaining uniform column width */
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
  /* Light grey background for headers */
}

td {
  vertical-align: top;
  /* Aligns content to the top of the cell */
}
</style>

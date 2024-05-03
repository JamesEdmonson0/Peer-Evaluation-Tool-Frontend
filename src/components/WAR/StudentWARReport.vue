<template>
    <div>
        <h1>WAR Report Student</h1>
        <week-selector @week-changed="handleWeekChange" />
        <table class="report-table" v-if="Object.keys(groupedReportData).length">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Task Category</th>
                    <th>Planned Task</th>
                    <th>Description</th>
                    <th>Planned Hours</th>
                    <th>Actual Hours</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(tasks, student) in groupedReportData">
                    <tr v-for="(submission, index) in tasks" :key="`${student}-${index}`">
                        <td v-if="index === 0" class="student-name">{{ student }}</td>
                        <td v-else class="empty-cell no-border"></td>
                        <td>{{ submission.taskCategory }}</td>
                        <td>{{ submission.plannedTask }}</td>
                        <td>{{ submission.description }}</td>
                        <td>{{ submission.plannedHours }}</td>
                        <td>{{ submission.actualHours }}</td>
                        <td>{{ submission.status }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div v-else>No data available for the selected week.</div>
    </div>
</template>



<script>
import WeekSelector from '../Utils/WeekSelector.vue';
import axios from 'axios';
import { watch } from 'vue';

export default {
    props: ['teamName', 'studentName'],
    components: {
        WeekSelector
    },
    data() {
        return {
            selectedWeek: "",
            reportData: [],
            groupedReportData: {}
        };
    },
    methods: {
        fetchWARReport() {
            const url = `http://localhost:8080/war/${this.teamName}/${this.selectedWeek}`;
            axios.get(url)
                .then(response => {
                    if (response.data.flag && response.data.data.length > 0) {
                        this.groupReportData(response.data.data[0].submissions);
                    } else {
                        this.groupedReportData = {};
                    }
                })
                .catch(error => {
                    console.error('Error fetching WAR report:', error);
                    this.groupedReportData = {};
                });
        },
        groupReportData(submissions) {
            const grouped = {};
            submissions.forEach(submission => {
                if (submission.teamMember === this.studentName) {  // Filter by studentName
                    const key = submission.teamMember;
                    if (!grouped[key]) {
                        grouped[key] = [];
                    }
                    grouped[key].push(submission);
                }
            });
            this.groupedReportData = grouped;
        },
        handleWeekChange(week) {
            console.log("Week changed to:", week);
            this.selectedWeek = week;
            this.fetchWARReport();
        },
    },
    mounted() {
        this.fetchWARReport();
    },
    watch: {
        studentName(newName, oldName) {
            if (newName !== oldName) {
                this.fetchWARReport();
            }
        }
    }
}
</script>

<style scoped>
.report-table {
    width: 100%;
    border-collapse: collapse;
    /* Ensures that the border is neat */
}

.report-table th,
.report-table td {
    border: 1px solid black;
    /* Borders for each cell */
    padding: 8px;
    /* Padding for content inside cells */
    text-align: left;
    /* Align text to the left */
}

.report-table .no-border {
    border-left: none;
    /* Remove left border */
    border-right: none;
    /* Remove right border */
    border-top: none;
    /* Remove top border if desired */
}

.student-name {
    font-weight: bold;
    border: 1px solid black;
    /* Make student name bold */
}

.empty-cell {
    border: none;
    /* Optional: No border for empty cells if needed */
}
</style>
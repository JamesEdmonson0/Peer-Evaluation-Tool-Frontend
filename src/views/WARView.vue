<script setup>
import WeekSelector from '@/components/Utils/WeekSelector.vue';
import DisplayWeek from '@/components/Utils/DisplayWeek.vue';
import { RouterLink, RouterView } from 'vue-router'
import WARMenu from '@/components/WAR/WARMenu.vue';
import WARNew from '@/components/WAR/WARNew.vue';
import WAREdit from '@/components/WAR/WAREdit.vue'
</script>

<template>
  <div class="container">
    <WeekSelector @week-changed="updateWeek"/>
    <br>
    <div v-if="weekSelected">
      <div v-if="creatingNew">
        <WARNew :week="selectedWeek" @submitted="createdNew"></WARNew>
      </div>
      <div v-else-if="editing">
        <WAREdit :submissionId="editId" @edited="edited"></WAREdit>
      </div>
      <div v-else class="container">
        <button @click="creatingNew = !creatingNew">New</button>
        <WARMenu :week="selectedWeek" @edit="editSub"></WARMenu>
      </div>
    </div>
    <div v-else>
      <h1>Select A Week</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    WeekSelector,
    DisplayWeek,
    WARMenu,
    WAREdit,
    WARNew
  },
  data() {
    return {
      selectedWeek: '',
      weekSelected: false,
      creatingNew: false,
      editing: false,
      editId: undefined,
    };
  },
  methods: {
    updateWeek(week) {
      this.selectedWeek = week;
      this.weekSelected = true
    },
    createdNew() {
      this.creatingNew = false
    },
    editSub(submissionId) {
      console.log(submissionId)
      this.editId = submissionId
      console.log(this.editId)
      this.editing = true
    },
    edited() {
      this.editing = false
    }
  }
};
</script>

<style>
.container {
  display: flex;
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
}
</style>



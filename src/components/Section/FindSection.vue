<template>
  <div class="container">
    <h1>Find Sections</h1>
    <form @submit.prevent="findSections">
      <input v-model="searchParams.sectionName" placeholder="Section Name" type="text"/>
      <input v-model="searchParams.academicYear" placeholder="Academic Year" type="text">
      <button type="submit">Search</button> <!-- Corrected "Submit" to "submit" -->
    </form>


  <!-- Results Section -->
  <div v-if="sections === null">
    <h1>Oops</h1>
  </div>
  <div v-else-if="sections.length > 0">
    <h2>Results:</h2>
    <ul>
      <hr>
      <li v-for="section in sections" :key="section.id">
        <router-link :to="`/viewSection/${section.id}`">
          <h2>{{ section.sectionName }}</h2>
        </router-link>
        <div style="font-weight: bold">Sections:</div>
        <div>{{ section.academicYear }}</div>
      </li>
    </ul>
  </div>
  <div v-else class="container">
    <h1>No section found. Do you want to create this Section</h1>
  </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SectionSearch",
  data() {
    return {
      searchParams: {
        sectionName: '',
        academicYear: '',
      },
      sections: null,
      isResult: undefined
    };
  },
  methods: {
    async findSections() {
      const params = new URLSearchParams(this.searchParams).toString();
      const URL = `http://localhost:8080/section/section_search?${params}`;

      try {
        const response = await axios.get(URL);
        this.sections = response.data.data;
      } catch (err) {
        console.error('There was an error.', err);
      }
    },
  }
}
</script>

<style scoped>
input {
  margin: 10px;
}
.container {
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
</style>

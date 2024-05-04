<template>
  <div class="container">
    <h1>Find Sections</h1>
    <form @submit.prevent="findSections" class="search-form">
      <input v-model="searchParams.sectionName" placeholder="Section Name" type="text" class="search-input" />
      <input v-model="searchParams.academicYear" placeholder="Academic Year" type="text" class="search-input" />
      <button type="submit" class="search-btn">Search</button>
    </form>

    <div v-if="sections === null">
      <h2>No Results Found</h2>
    </div>
    <div v-else-if="sections.length > 0">
      <h2>Results:</h2>
      <ul class="section-list">
        <hr>
        <li v-for="section in sections" :key="section.id" class="section-item">
          <router-link :to="`/viewSection/${section.id}`">
            <h3>{{ section.sectionName }}</h3>
          </router-link>
          <router-link :to="`/editSection/${section.id}`">Edit Section</router-link>
          <div class="section-details">
            <div class="field">
              <label>Academic Year:</label>
              <span>{{ section.academicYear }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2>No section found. Would you like to create this Section?</h2>
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
        sectionName: "",
        academicYear: "",
      },
      sections: null,
      isResult: undefined,
    };
  },
  methods: {
    async findSections() {
      const params = new URLSearchParams(this.searchParams).toString();
      const URL = `http://localhost:8080/section/section_search?${params}`;

      try {
        const response = await axios.get(URL);
        this.sections = response.data.data;
        console.log("Sections found:", this.sections);
      } catch (err) {
        console.error("Error searching for sections:", err);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}

.search-form {
  margin-bottom: 20px;
}

.search-input {
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-btn {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #0056b3;
}

.section-list {
  list-style-type: none;
  padding: 0;
}

.section-item {
  margin-bottom: 20px;
}

.section-details {
  margin-left: 20px;
}

.field {
  margin-bottom: 5px;
}

.field label {
  font-weight: bold;
}
</style>

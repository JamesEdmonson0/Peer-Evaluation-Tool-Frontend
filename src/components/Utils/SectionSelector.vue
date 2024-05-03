<template>
    <select v-model="selectedSection">
      <option disabled value="">Please select a section</option>
      <option v-for="section in sections" :key="section">{{ section }}</option>
    </select>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSection: '',
        sections: [
          'Section2023-2024',
          'Section2022-2023',
          'Section2021-2022'
        ]
      };
    },
    watch: {
      selectedSection(newValue) {
        this.$emit('section-changed', newValue);
      }
    }
  };
  </script>
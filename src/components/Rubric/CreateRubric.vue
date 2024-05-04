<template>
    <div>
      <h2>Create a New Rubric</h2>
      <form v-if="!rubricCreated" @submit.prevent="submitRubric">
        <label for="rubricName">Rubric Name:</label>
        <input type="text" id="rubricName" v-model="rubric.name" required>
        <div v-for="(criterion, index) in rubric.criteria" :key="index">
          <h3>Criterion {{ index + 1 }}</h3>
          <label for="criterionName">Name:</label>
          <input type="text" v-model="criterion.name" required>
          <label for="criterionDescription">Description:</label>
          <textarea v-model="criterion.description" required></textarea>
          <label for="criterionMaxScore">Max Score:</label>
          <input type="number" v-model.number="criterion.maxScore" min="1" required>
          <button type="button" @click="removeCriterion(index)">Remove Criterion</button>
        </div>
        <button type="button" @click="addCriterion">Add Criterion</button>
        <button type="submit">Create Rubric</button>
        <button type="button" @click="cancel">Cancel</button>
      </form>
      <p v-if="rubricCreated">Rubric created successfully!</p>
      <router-link to="/rubrics" v-if="rubricCreated">Back to Rubrics</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rubric: {
          name: '',
          criteria: []
        },
        rubricCreated: false
      };
    },
    methods: {
      submitRubric() {
        // Validate rubric data
        if (this.validateRubric()) {
          // Save rubric data to the system (you can use axios or other methods here)
          console.log('Rubric created successfully:', this.rubric);
          // Reset form after successful submission
          this.resetForm();
          // Set rubricCreated to true to display confirmation message
          this.rubricCreated = true;
        } else {
          alert('Please fill in all fields and ensure max score is a positive integer.');
        }
      },
      addCriterion() {
        this.rubric.criteria.push({ name: '', description: '', maxScore: null });
      },
      removeCriterion(index) {
        this.rubric.criteria.splice(index, 1);
      },
      validateRubric() {
        // Check if rubric name is filled
        if (!this.rubric.name.trim()) return false;
        // Check if all criteria are filled and max score is positive integer
        for (const criterion of this.rubric.criteria) {
          if (!criterion.name.trim() || !criterion.description.trim() || criterion.maxScore === null || isNaN(criterion.maxScore) || criterion.maxScore < 1 || !Number.isInteger(criterion.maxScore)) {
            return false;
          }
        }
        return true;
      },
      resetForm() {
        this.rubric = {
          name: '',
          criteria: []
        };
      },
      cancel() {
        // Reset form
        this.resetForm();
      }
    }
  };
  </script>
  
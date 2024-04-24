<template>
  <select v-model="selectedWeek">
    <option disabled value="">Please select a week</option>
    <option v-for="week in weeks"> {{ week }} </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectedWeek: '', // Initially no week is selected
      weeks: [
        '04/22/2024',
        '04/15/2024',
        '04/08/2024',
        '04/01/2024',
        '03/25/2024'
      ]
    };
  },
  watch: {
    selectedWeek(newValue) {
      this.$emit('week-changed', newValue);
    }
  }
};
</script>

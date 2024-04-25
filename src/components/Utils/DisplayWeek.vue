<template>
  <div>
    Selected Week: <strong>{{ week }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    week: String
  }
};
</script>

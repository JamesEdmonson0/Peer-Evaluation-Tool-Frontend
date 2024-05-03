<template>
    <div>
      Selected Section: <strong>{{ section }}</strong>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      section: String
    }
  };
  </script>
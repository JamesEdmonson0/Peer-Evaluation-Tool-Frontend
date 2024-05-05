<template>
  <div class="container">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/unnamed.png" />
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/createRubric">Create Rubric</RouterLink>
          <RouterLink to="/searchStudent">Search for Students</RouterLink>
          <RouterLink to="/searchInstructor">Search for Instructors</RouterLink>
          <RouterLink to="/createSection">Create Section</RouterLink>
          <RouterLink to="/findSection">Find Section</RouterLink>
          <RouterLink to="/createTeam">Create Team</RouterLink>
          <RouterLink to="/searchTeam">Search for Teams</RouterLink>
          <RouterLink to="/assignStudents">Assign Students</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <LogOutButton></LogOutButton>
        </nav>
      </div>
    </header>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue';
import LogOutButton from '@/components/Users/LogOutButton.vue';
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0; /* Light gray background */
}

header {
  background-color: #6a0dad; /* Purple background */
  color: #fff; /* White text */
  padding: 1rem;
  display: flex;
  align-items: center;
}

.logo {
  width: 75px; /* Adjust size as needed */
  height: 75px;
  margin-right: 1rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

nav {
  margin-top: 1rem;
}

nav a {
  color: #fff; /* White text for links */
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Light transparent background on hover */
}

RouterView {
  flex-grow: 1; /* Ensure RouterView takes remaining space */
}
</style>

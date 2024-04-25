<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LogOutButton from './components/Users/LogOutButton.vue'
import FlipAuth from     './components/DevOnly/DELETE_FlipAuth.vue'
import LoginView from './views/LoginView.vue';
</script>

<template>
  <FlipAuth></FlipAuth>
  <div v-if="$store.state.isAuthenticated" class="container">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/unnamed.png" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="You did it, Aliya! Logged In" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/searchStudent">Search</RouterLink>
          <RouterLink to="/studentDetails/1">Details</RouterLink>
          <RouterLink to="/createStudent">Create</RouterLink>
          <RouterLink to="/viewStudentPeerEvalReport">Eval Report</RouterLink>
          <RouterLink to="/war">WAR</RouterLink>
          <RouterLink to="/evalForm">Submit Eval</RouterLink>
          <LogOutButton></LogOutButton>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
  <div v-if="!$store.state.isAuthenticated" class="container">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/unnamed.png" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="You did it, Aliya! Logged Out" />
      </div>
    </header>
    <LoginView></LoginView>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center; /* Center horizontally */
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

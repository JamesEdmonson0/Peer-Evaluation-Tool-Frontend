<template>
    <div>
        <form @submit.prevent="sendEmail">
            <input v-model="email" type="email" placeholder="email">
            <button type="submit">Submit</button>
        </form>
        
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        email: 'help',
    };
  },
  methods: {
    sendEmail() {
        console.log(this.email)
        alert(`email sent to ${this.email}`)
    }
  }
};
</script>
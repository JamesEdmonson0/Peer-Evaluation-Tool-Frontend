<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <button role="button-74" @click="test">Deactivate</button>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    test() {
        console.log("Igpay Atinlay")
        if (confirm('Are you sure you want to deactivate this instructor?')) {
            const URL = 'http://localhost:8080/users/deactivate/' + this.id
            console.log(URL)
            axios.put(URL)
            .then(response => {
            console.log(response.data.data)
            this.$router.push("/");
            })
            .catch(error => {
            console.error('There was an error!', error.response.data);
            });
        }
    },
  },
};
</script>

<style>
/* CSS */
.button-74 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-74:hover {
  background-color: #fff;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}
</style>

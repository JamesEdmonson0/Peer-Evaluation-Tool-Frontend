<script setup>
import DeleteStudentButton from './DeleteStudentButton.vue';
import StudentWARReport from '../WAR/StudentWARReport.vue';
</script>
<template>
  <div>

    <h1>{{ details.firstName }} {{ details.lastName }}</h1>

    <h3>Team Name: {{ details.teamName }} - Academic Year: {{ details.academicYear }}</h3>
    <DeleteStudentButton :id="id"></DeleteStudentButton>
    <hr>
    <button @click="goToStudentReport">Generate Peer Evaluation Report</button>
    <button @click="generateWARReport">Generate WAR Report</button>
    <button @click="navigateToWARReport">View WAR Report</button>
    <hr>
    <StudentWARReport :teamName="details.teamName" :studentName="`${details.firstName} ${details.lastName}`" />
    <div>
      <h2>Peer Evaluations</h2>

    </div>
    <hr>
    <div>
      <h2>Weekly Activity Report</h2>
      <div>
        <!-- unordered list -->
      </div>
    </div>




  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "StudentDetails",
  props: ['id'],
  data() {
    return {
      details: {},
    };
  },
  created() {
    this.getDetails()
  },
  methods: {
    getDetails() {
      const URL = 'http://localhost:8080/students/' + this.id
      axios.get(URL)
        .then(response => {
          this.details = response.data.data
          //console.log(response.data.data)
        })
        .catch(error => {
          console.error('There was an error!', error.response.data);
        });
    },
    goToStudentReport() {
      this.$router.push(`/studentReportByInstructor/${this.id}`);
    },
    generateWARReport() {
      this.$router.push({ name: 'WAR By Team And Week', params: { teamName: this.details.teamName } });
    },
    navigateToWARReport() {
      this.$router.push({ name: 'View War for student', params: { teamName: this.details.teamName, studentName: `${this.details.firstName} ${this.details.lastName}` }});
    }
  }
}
</script>

<style scoped>
input {
  margin: 10px;
}

.button1,
.button1::after {
 padding: 16px 20px;
 font-size: 18px;
 background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
 border: 0;
 color: #fff;
 letter-spacing: 3px;
 line-height: 1;
 box-shadow: 6px 0px 0px #00e6f6;
 outline: transparent;
 position: relative;
}

.button1::after {
 --slice-0: inset(50% 50% 50% 50%);
 --slice-1: inset(80% -6px 0 0);
 --slice-2: inset(50% -6px 30% 0);
 --slice-3: inset(10% -6px 85% 0);
 --slice-4: inset(40% -6px 43% 0);
 --slice-5: inset(80% -6px 5% 0);
 content: "HOVER ME";
 display: block;
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: linear-gradient(45deg, transparent 3%, #00e6f6 3%, #00e6f6 5%, #ff013c 5%);
 text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
 clip-path: var(--slice-0);
}

.button1:hover::after {
 animation: 1s glitch;
 animation-timing-function: steps(2, end);
}

@keyframes glitch {
 0% {
  clip-path: var(--slice-1);
  transform: translate(-20px, -10px);
 }

 10% {
  clip-path: var(--slice-3);
  transform: translate(10px, 10px);
 }

 20% {
  clip-path: var(--slice-1);
  transform: translate(-10px, 10px);
 }

 30% {
  clip-path: var(--slice-3);
  transform: translate(0px, 5px);
 }

 40% {
  clip-path: var(--slice-2);
  transform: translate(-5px, 0px);
 }

 50% {
  clip-path: var(--slice-3);
  transform: translate(5px, 0px);
 }

 60% {
  clip-path: var(--slice-4);
  transform: translate(5px, 10px);
 }

 70% {
  clip-path: var(--slice-2);
  transform: translate(-10px, 10px);
 }

 80% {
  clip-path: var(--slice-5);
  transform: translate(20px, -10px);
 }

 90% {
  clip-path: var(--slice-1);
  transform: translate(-10px, 0px);
 }

 100% {
  clip-path: var(--slice-1);
  transform: translate(0);
 }
}



.button2 {
  position: relative;
  padding: 13px 35px;
  background: #f5ddb7;
  font-size: 17px;
  font-weight: 900;
  color: #181818;
  border: none;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #18181869, inset 2px 2px 10px #ffffffb0;
  transition: all .3s ease-in-out;
}

.icon-1 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 0px;
  height: auto;
  transition: all .5s ease-in-out;
  z-index: -1;
}

.icon-2 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 0px;
  height: auto;
  transition: all .5s ease-in-out;
  z-index: -2;
}

.icon-3 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 0px;
  height: auto;
  transition: all .5s ease-in-out;
  z-index: -2;
}

.icon-4 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 0px;
  height: auto;
  transition: all .5s ease-in-out;
  z-index: -2;
}

.icon-5 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 0px;
  height: auto;
  transition: all .5s ease-in-out;
  z-index: -2;
}

.button2:hover {
  padding: 13px 25px;
  border-radius: 8px 8px 24px 24px;
}

.button2:hover .icon-1 {
  top: -250%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 50px;
  height: auto;
  animation: inIcon1 1s ease .45s forwards;
}

@keyframes inIcon1 {
  0% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }

  25% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(5deg);
  }

  50% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(1deg);
  }

  65% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(3deg);
  }

  100% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }
}

.button2:hover .icon-2 {
  position: absolute;
  top: -200%;
  left: 90%;
  transform: translate(-50%, 0);
  width: 75px;
  height: auto;
  animation: inIcon2 1s ease .45s forwards;
}

@keyframes inIcon2 {
  0% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }

  35% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(10deg);
  }

  50% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(4deg);
  }

  80% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(5deg);
  }

  100% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }
}

.button2:hover .icon-3 {
  position: absolute;
  top: -130%;
  left: 20%;
  transform: translate(-50%, 0);
  width: 60px;
  height: auto;
  animation: inIcon3 1s ease .45s forwards;
}

@keyframes inIcon3 {
  0% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }

  35% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(-2deg);
  }

  100% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }
}

.button2:hover .icon-4 {
  position: absolute;
  top: -300%;
  left: 10%;
  transform: translate(-50%, 0);
  width: 85px;
  height: auto;
  animation: inIcon4 1s ease .45s forwards;
}

@keyframes inIcon4 {
  0% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }

  40% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(-3deg);
  }

  100% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }
}

.button2:hover .icon-5 {
  position: absolute;
  top: -350%;
  left: 90%;
  transform: translate(-50%, 0);
  width: 85px;
  height: auto;
  animation: inIcon5 1s ease .45s forwards;
}

@keyframes inIcon5 {
  0% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }

  35% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(-3deg);
  }

  100% {
    transform-origin: 0 100%;
    transform: translate(-50%, 0) rotate(0deg);
  }
}

.fil-leaf-1 {
  fill: #7B9B3A
}

.fil-leaf-2 {
  fill: #556729;
  fill-rule: nonzero
}

.fil-leaf-3 {
  fill: #556729
}

.fil-leaf-4 {
  fill: #3C4819
}

.fil-leaf-5 {
  fill: #3C4819
}

</style>
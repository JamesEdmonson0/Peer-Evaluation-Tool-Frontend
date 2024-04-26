import { createStore } from 'vuex';

const store = createStore ({
  state: {
      isAuthenticated: false,
      isStudent: false,
      isInstructor: false,
      isAdmin: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setIsStudent(state, status) {
      state.isStudent = status;
    },
    setIsInstructor(state, status) {
      state.isInstructor = status;
    },
    setIsAdmin(state, status) {
      state.isAdmin = status;
    },
  }
}) 

export default store
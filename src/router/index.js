import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Users/LoginForm.vue';
import Student from '@/views/StudentView.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/student',
      name: 'Student Homepage',
      component: Student,
    },
    {
      path: '/searchStudent',
      name: 'Search Students',
      component: () => import('@/components/Student/StudentSearch.vue')
    },
    {
      path: '/studentDetails/:id',
      name: 'Student Details',
      component: () => import('@/components/Student/StudentDetails.vue'),
      props: true,
    },
    {
      path: '/createStudent',
      name: 'Create Students',
      component: () => import('@/components/Student/CreateStudent.vue')
    },
    {
      path: '/editStudent',
      name: 'Edit Student',
      component: () => import('@/components/Student/EditStudent.vue'),
    },
    {
      path: '/viewStudentPeerEvalReport',
      name: 'View Student Peer Eval Report',
      component: () => import('@/components/PeerEvaluations/StudentReportByStudent.vue')
    },
    {
      path: '/evalForm',
      name: 'Eval Form',
      component: () => import('@/components/PeerEvaluations/EvalForm.vue')
    },
    {
      path: '/menu',
      name: 'WAR Menu',
      component: () => import('@/components/WAR/WARMenu.vue'),
    },
    {
      path: '/war',
      name: 'WAR',
      component: () => import('@/views/WARView.vue'),
      //meta: { requiresAuth: true } 
    },
    {
      path: '/new',
      name: 'New War',
      component: () => import('@/components/WAR/WARNew.vue'),
    },
    {
      path: '/war/edit',
      name: 'Edit Submission',
      component: () => import('@/components/WAR/WAREdit.vue'),
    },

    {
      path: '/createSection',
      name: 'Create Section',
      component: () => import('@/components/Section/CreateSection.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isAuthenticated) {
      next({
        path: '/login'
      });
    } else {
      next(); // go to wherever the user intended to go
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});


export default router

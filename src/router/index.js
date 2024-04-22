import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/LoginForm.vue';

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
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/war',
      name: 'WAR',
      component: () => import('../views/WARView.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/searchStudent',
      name: 'Search Students',
      component: () => import('@/components/StudentSearch.vue')
    },
    {
      path: '/createStudent',
      name: 'Create Students',
      component: () => import('@/components/CreateStudent.vue')
    },
    {
      path: '/viewStudentPeerEvalReport',
      name: 'View Student Peer Eval Report',
      component: () => import('@/components/PeerEvalReportByStudent.vue')
    },
    {
      path: '/warMenu',
      name: 'WAR Menu',
      component: () => import('@/components/WARAction.vue')
    },
    {
      path: '/evalForm',
      name: 'Eval Form',
      component: () => import('@/components/EvalForm.vue')
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

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/LoginForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/war',
      component: () => import('../views/WARView.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/searchStudent',
      component: () => import('@/components/StudentSearch.vue')
    },
    {
      path: '/createStudent',
      component: () => import('@/components/CreateStudent.vue')
    },
    {
      path: '/viewStudentPeerEvalReport',
      component: () => import('@/components/PeerEvalReportByStudent.vue')
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router

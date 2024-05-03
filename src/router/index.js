import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../components/Users/LoginForm.vue";
import Student from "@/views/StudentView.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/AboutView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/student",
      name: "Student Homepage",
      component: Student,
    },
    {
      path: "/createRubric",
      name: "Create Rubric",
      component: () => import("@/components/Rubric/CreateRubric.vue"),
    },
    {
      path: "/searchStudent",
      name: "Search Students",
      component: () => import("@/components/Student/StudentSearch.vue"),
    },
    {
      path: "/studentDetails/:id",
      name: "Student Details",
      component: () => import("@/components/Student/StudentDetails.vue"),
      props: true,
    },
    {
      path: "/studentReportByInstructor/:id",
      name: "Student Report By Instructor",
      component: () => import("@/components/PeerEvaluations/StudentReportByInstructor.vue"),
      props: true,
    },
    {
      path: "/searchInstructor",
      name: "Search Instructors",
      component: () => import("@/components/Instructor/InstructorSearch.vue"),
    },
    {
      path: "/instructorDetails/:id",
      name: "Instructor Details",
      component: () => import("@/components/Instructor/InstructorDetails.vue"),
      props: true,
    },
    {
      path: "/createStudent",
      name: "Create Students",
      component: () => import("@/components/Student/CreateStudent.vue"),
    },
    {
      path: "/createInstructor",
      name: "Create Instructors",
      component: () => import("@/components/Instructor/CreateInstructor.vue"),
    },
    {
      path: "/editStudent",
      name: "Edit Student",
      component: () => import("@/components/Student/EditStudent.vue"),
    },
    {
      path: "/viewStudentPeerEvalReport",
      name: "View Student Peer Eval Report",
      component: () =>
        import("@/components/PeerEvaluations/StudentReportByStudent.vue"),
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

    {
      path: "/viewPeerEvalByWeekAndSection",
      name: "View Peer Eval Report By Week And Section",
      component: () =>
        import("@/components/PeerEvaluations/PeerEvalByWeekAndSection.vue"),
    },
    {
      path: "/studentWarReport:teamName/:studentName",
      name: "View War for student",
      component: () =>
        import("@/components/WAR/StudentWARReport.vue"),
      props: true,
    },
    {
      path: "/evalForm",
      name: "Eval Form",
      component: () => import("@/components/PeerEvaluations/EvalForm.vue"),
    },
    {
      path: "/menu",
      name: "WAR Menu",
      component: () => import("@/components/WAR/WARMenu.vue"),
    },
    {
      path: "/war",
      name: "WAR",
      component: () => import("@/views/WARView.vue"),
      //meta: { requiresAuth: true }
    },
    {
      path: "/new",
      name: "New War",
      component: () => import("@/components/WAR/WARNew.vue"),
    },
    {
      path: "/war/edit",
      name: "Edit Submission",
      component: () => import("@/components/WAR/WAREdit.vue"),
    },
    {
      path: "/warByTeamAndWeek/:teamName",
      name: "WAR By Team And Week",
      component: () => import("@/components/WAR/WARByTeamAndWeek.vue"),
      props: true
    },
    {
      path: "/searchTeam",
      name: "Search Teams",
      component: () => import("@/components/Team/TeamSearch.vue"),
    },
    {
      path: "/teamDetails/:id",
      name: "Team Details",
      component: () => import("@/components/Team/TeamDetails.vue"),
      props: true,
    },

    {

      path: "/findSection",
      name: "Find Section",
      component: () => import("@/components/Section/FindSection.vue")
    },

    {
      path: "/viewSection/:id",
      name: "View Section",
      component: () => import("@/components/Section/ViewSection.vue")


    }
  ],

});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // This route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isAuthenticated) {
      next({
        path: "/login",
      });
    } else {
      next(); // go to wherever the user intended to go
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;

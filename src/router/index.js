// router/index.js
import { createWebHashHistory, createRouter } from "vue-router";
import OnBoarding from "@/components/OnBoarding";
import Dashboard from "@/components/Dashboard";
import LoginUser from "@/components/LoginUser";
import RegisterUser from "@/components/RegisterUser";
import ManageTracker from "@/components/ManageTracker";
import MentalWellbeing from "@/components/MentalWellbeing";
import bearerAuth from "@/api/bearerAuth";
import MindfulBreathing from "@/components/MindfulBreathing.vue";
import MindfulMeditation from "@/components/MindfulMeditation.vue";
import LifestyleWellbeing from "@/components/LifestyleWellbeing";
import WellbeingChat from "@/components/WellbeingChat";
import BodyScan from "@/components/BodyScan";
import ThoughtDiary from "@/components/ThoughtDiary";
import VRMeditation from "@/components/VRMeditation";

const routes = [
  {
    path: "/onboarding",
    name: "onboarding",
    component: OnBoarding,
  },
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home",
  },
  {
    path: "/login",
    name: "login",
    component: LoginUser,
  },
  {
    path: "/register",
    name: "RegisterUser",
    component: RegisterUser,
  },
  {
    path: "/lifestyle-wellbeing",
    name: "LifestyleWellbeing",
    component: LifestyleWellbeing,
    meta: { requiresAuth: true },
  },
  {
    path: "/mental-wellbeing",
    name: "MentalWellbeing",
    component: MentalWellbeing,
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "WellbeingChat",
    component: WellbeingChat,
    meta: { requiresAuth: true },
  },
  {
    path: "/vr-meditation",
    name: "VRMeditation",
    component: VRMeditation,
  },
  {
    path: "/mindful-breathing",
    name: "MindfulBreathing",
    component: MindfulBreathing,
    meta: { requiresAuth: true },
  },
  {
    path: "/body-scan",
    name: "BodyScan",
    component: BodyScan,
    meta: { requiresAuth: true },
  },
  {
    path: "/thought-diary",
    name: "ThoughtDiary",
    component: ThoughtDiary,
    meta: { requiresAuth: true },
  },
  {
    path: "/mindful-meditation",
    name: "MindfulMeditation",
    component: MindfulMeditation,
    meta: { requiresAuth: true },
  },
  {
    path: "/manageTracker",
    name: "ManageTracker",
    component: ManageTracker,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  let requireAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (to.path === "/") {
    if (token) {
      bearerAuth
        .post("/api/verify")
        .then(() => {
          next("/dashboard");
        })
        .catch(() => {
          next("/login");
        });
    } else {
      next("/login");
    }
  }
  if (!requireAuth) {
    next();
  }

  if (requireAuth && !token) {
    next("/login");
  }

  if (to.path === "/login") {
    if (token) {
      bearerAuth
        .post("/api/verify")
        .then(() => {
          next("/dashboard");
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  }

  if (requireAuth && token) {
    bearerAuth
      .post("/api/verify")
      .then(() => {
        next();
      })
      .catch(() => {
        next("/login");
      });
  }
});

export default router;

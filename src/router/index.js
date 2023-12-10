import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PanelView from '../views/PanelView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import GenderView from '../views/GenderView.vue'
import SigninView from '../views/SigninView.vue'
import SplashView from '../views/SplashView.vue'
import ContactView from '../views/ContactView.vue'
import PaymentView from '../views/PaymentView.vue'
import PolicyView from '../views/PolicyView.vue'
import TermsView from '../views/TermsView.vue'
import SupportView from '../views/SupportView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import DisclaimerView from '../views/DisclaimerView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminSigninView from '../views/AdminSigninView.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: "Shulekicks - Home",
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: "Shulekicks - Login",
      }
    },
    {
      path: '/l-login',
      name: 'AdminLogin',
      component: AdminLoginView,
      meta: {
        title: "Shulekicks - Login",
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: PaymentView,
      meta: {
        title: "Shulekicks - Payment",
      }
    },

    {
      path: '/l-signin',
      name: 'AdminSignin',
      component: AdminSigninView,
      meta: {
        title: "Shulekicks - signin",
      }
    },
    {
      path: '/gender/:category',
      name: 'Gender',
      component: GenderView,
      meta: {
        title: "Shulekicks - gender",
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SigninView,
      meta: {
        title: "Shulekicks - signin",
      }
    },
    {
      path: '/splash',
      name: 'Splash',
      component: SplashView,
      meta: {
        title: "Shulekicks - Splash",
      }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
      meta: {
        title: "Shulekicks - About",
      }
    },
    {
      path: '/panel',
      name: 'Panel',
      component: PanelView,
      meta: {
      isAdmin: true,
      title: "Shulekicks - Panel",
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView,
      meta: {
        title: "Shulekicks - Contact",
      }
    },
    {
      path: '/policy',
      name: 'Policy',
      component: PolicyView,
      meta: {
        title: "Shulekicks - Policy",
      }
    },
    {
      path: '/support',
      name: 'Support',
      component: SupportView,
      meta: {
        title: "Shulekicks - Support",
      }
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: DisclaimerView,
      meta: {
        title: "Shulekicks - Disclaimer",
      }
    },
    {
      path: '/terms and conditions',
      name: 'Terms',
      component: TermsView,
      meta: {
        title: "Shulekicks - Terms",
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView,
      meta: {
        title: "404 - Page not found",
      }
    },
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const isAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin === 'true'; 
};


const dynamicTitleGuard = (to, from, next) => {
  document.title = to.meta.title || 'Shulekicks - Get affordable school shoes';
  next();
};

const adminGuard = (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (isAdmin()) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
};

router.beforeEach(dynamicTitleGuard);
router.beforeEach(adminGuard);

export default router;

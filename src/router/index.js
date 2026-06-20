import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../plugins/auth.js'
import { useAuthStore } from '../stores/authStore.js'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import Lifecycle from '../views/Lifecycle.vue'
import Reactivity from '../views/Reactivity.vue'
import MixinDemo from '../views/MixinDemo.vue'
import Login from '../views/Login.vue'
import TokenLogin from '../views/TokenLogin.vue'
import ProtectedPage from '../views/ProtectedPage.vue'
import ForbiddenPage from '../views/ForbiddenPage.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import UserHome from '../views/user/UserHome.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true, hideNav: true },
    },
    {
        path: '/token-login',
        name: 'TokenLogin',
        component: TokenLogin,
        meta: { tokenGuest: true, hideNav: true },
    },
    {
        path: '/protected',
        name: 'Protected',
        component: ProtectedPage,
        meta: { requiresToken: true, permission: 'view:protected', hideNav: true },
    },
    {
        path: '/forbidden',
        name: 'Forbidden',
        component: ForbiddenPage,
        meta: { hideNav: true },
    },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, role: 'admin', hideNav: true },
        children: [
            {
                path: '',
                redirect: '/admin/dashboard',
            },
            {
                path: 'dashboard',
                name: 'AdminDashboard',
                component: AdminDashboard,
            },
        ],
    },
    {
        path: '/user',
        component: UserLayout,
        meta: { requiresAuth: true, role: 'user', hideNav: true },
        children: [
            {
                path: '',
                redirect: '/user/home',
            },
            {
                path: 'home',
                name: 'UserHome',
                component: UserHome,
            },
        ],
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
    },
    {
        path: '/lifecycle',
        name: 'Lifecycle',
        component: Lifecycle,
    },
    {
        path: '/reactivity',
        name: 'Reactivity',
        component: Reactivity,
    },
    {
        path: '/mixin',
        name: 'Mixin',
        component: MixinDemo,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const { user, isAuthenticated, getDashboardPath } = useAuth()
    const authStore = useAuthStore()

    if (to.meta.requiresToken) {
        const valid = await authStore.ensureValidToken()

        if (!valid || !authStore.isAuthenticated) {
            return { path: '/token-login', query: { redirect: to.fullPath } }
        }

        if (to.meta.permission && !authStore.hasPermission(to.meta.permission)) {
            return '/forbidden'
        }
    }

    if (to.meta.tokenGuest && authStore.isAuthenticated) {
        const valid = await authStore.ensureValidToken()
        if (valid) {
            return to.query.redirect || '/protected'
        }
    }

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return '/login'
    }

    if (to.meta.role && user.value?.role !== to.meta.role) {
        if (isAuthenticated.value) {
            return getDashboardPath(user.value.role)
        }
        return '/login'
    }

    if (to.meta.guest && isAuthenticated.value) {
        return getDashboardPath(user.value.role)
    }
})

export default router

import { ref, computed } from 'vue'

const STORAGE_KEY = 'auth_user'

const user = ref(loadUser())

function loadUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

const USERS = {
    'admin@gmail.com': {
        role: 'admin',
        name: 'Admin User',
        avatar: 'A',
        stats: {
            totalUsers: 1284,
            totalOrders: 3567,
            revenue: 89420,
            pendingTasks: 12,
        },
        recentActivities: [
            { id: 1, action: 'Approved order #1024', time: '2 min ago' },
            { id: 2, action: 'Added new product "iPhone 17"', time: '15 min ago' },
            { id: 3, action: 'Banned user spam@mail.com', time: '1 hour ago' },
            { id: 4, action: 'Updated system settings', time: '3 hours ago' },
        ],
    },
    'user@gmail.com': {
        role: 'user',
        name: 'John Doe',
        avatar: 'J',
        profile: {
            memberSince: '2024-03-15',
            orders: 8,
            wishlist: 3,
        },
        recentOrders: [
            { id: 1, product: 'AirPods Pro', status: 'Delivered', date: '2025-06-10' },
            { id: 2, product: 'iPhone Case', status: 'Shipped', date: '2025-06-15' },
            { id: 3, product: 'USB-C Cable', status: 'Processing', date: '2025-06-17' },
        ],
    },
}

export function useAuth() {
    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')
    const isUser = computed(() => user.value?.role === 'user')

    function login(email, password) {
        const account = USERS[email.toLowerCase()]

        if (!account) {
            return { success: false, error: 'invalidCredentials' }
        }

        if (!password) {
            return { success: false, error: 'passwordRequired' }
        }

        user.value = { email: email.toLowerCase(), ...account }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
        return { success: true, role: account.role }
    }

    function logout() {
        user.value = null
        localStorage.removeItem(STORAGE_KEY)
    }

    function getDashboardPath(role) {
        return role === 'admin' ? '/admin/dashboard' : '/user/home'
    }

    return {
        user,
        isAuthenticated,
        isAdmin,
        isUser,
        login,
        logout,
        getDashboardPath,
    }
}

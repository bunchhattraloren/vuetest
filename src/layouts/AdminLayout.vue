<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../plugins/auth.js'

const router = useRouter()
const { user, logout } = useAuth()

function handleLogout() {
    logout()
    router.push('/login')
}
</script>

<template>
    <div class="min-h-screen flex bg-gray-100">
        <aside class="w-64 bg-gray-900 text-white flex flex-col shrink-0">
            <div class="p-6 border-b border-gray-800">
                <h1 class="text-xl font-bold">{{ $t('auth.adminPanel') }}</h1>
                <p class="text-gray-400 text-sm mt-1">{{ $t('auth.adminLayout') }}</p>
            </div>

            <nav class="flex-1 p-4 space-y-1">
                <router-link
                    to="/admin/dashboard"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
                    active-class="!bg-indigo-600 !text-white"
                >
                    <span>📊</span>
                    {{ $t('auth.dashboard') }}
                </router-link>
            </nav>

            <div class="p-4 border-t border-gray-800">
                <div class="flex items-center gap-3 px-2 mb-3">
                    <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">
                        {{ user?.avatar }}
                    </div>
                    <div>
                        <p class="font-medium text-sm">{{ user?.name }}</p>
                        <p class="text-xs text-gray-400">{{ user?.email }}</p>
                    </div>
                </div>
                <button
                    type="button"
                    class="w-full px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                    @click="handleLogout"
                >
                    {{ $t('auth.logout') }}
                </button>
            </div>
        </aside>

        <main class="flex-1 overflow-auto">
            <router-view />
        </main>
    </div>
</template>

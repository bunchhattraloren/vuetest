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
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <header class="bg-white border-b shadow-sm">
            <div class="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {{ user?.avatar }}
                    </div>
                    <div>
                        <h1 class="font-semibold text-gray-800">{{ $t('auth.userLayout') }}</h1>
                        <p class="text-sm text-gray-500">{{ user?.name }}</p>
                    </div>
                </div>
                <button
                    type="button"
                    class="px-4 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-50 transition"
                    @click="handleLogout"
                >
                    {{ $t('auth.logout') }}
                </button>
            </div>
        </header>

        <main class="max-w-3xl mx-auto px-6 py-8">
            <router-view />
        </main>
    </div>
</template>

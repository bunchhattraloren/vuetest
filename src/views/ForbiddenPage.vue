<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

function handleLogout() {
    authStore.logout()
    router.push('/token-login')
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div class="text-5xl mb-4">🚫</div>
            <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('token.deniedTitle') }}</h1>
            <p class="text-gray-500 mb-6">{{ $t('token.deniedSubtitle') }}</p>

            <p v-if="user" class="text-sm text-gray-600 mb-6 bg-yellow-50 py-3 rounded-lg">
                {{ $t('token.loggedAs', { email: user.email }) }}
            </p>

            <div class="flex gap-3 justify-center">
                <button
                    type="button"
                    class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
                    @click="handleLogout"
                >
                    {{ $t('token.logout') }}
                </button>
                <router-link
                    to="/"
                    class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900"
                >
                    {{ $t('token.goHome') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

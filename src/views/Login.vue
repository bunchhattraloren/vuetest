<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../plugins/auth.js'

const router = useRouter()
const { login, getDashboardPath } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
    error.value = ''
    loading.value = true

    await new Promise((r) => setTimeout(r, 600))

    const result = login(email.value, password.value)

    if (result.success) {
        router.push(getDashboardPath(result.role))
    } else {
        error.value = result.error
    }

    loading.value = false
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative w-full max-w-md">
            <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white text-2xl font-bold mb-4 shadow-lg">
                        V
                    </div>
                    <h1 class="text-2xl font-bold text-gray-800">{{ $t('auth.welcome') }}</h1>
                    <p class="text-gray-500 text-sm mt-1">{{ $t('auth.subtitle') }}</p>
                </div>

                <form class="space-y-5" @submit.prevent="handleSubmit">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">
                            {{ $t('auth.email') }}
                        </label>
                        <input
                            v-model="email"
                            type="email"
                            required
                            placeholder="admin@gmail.com"
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">
                            {{ $t('auth.password') }}
                        </label>
                        <input
                            v-model="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>

                    <p v-if="error" class="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                        {{ $t(`auth.${error}`) }}
                    </p>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition shadow-lg shadow-indigo-500/30 disabled:opacity-60"
                    >
                        {{ loading ? $t('auth.signingIn') : $t('auth.signIn') }}
                    </button>
                </form>

                <div class="mt-6 p-4 bg-gray-50 rounded-xl text-sm">
                    <p class="font-medium text-gray-700 mb-2">{{ $t('auth.demoAccounts') }}</p>
                    <div class="space-y-2 text-gray-600">
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">Admin</span>
                            <span>admin@gmail.com</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">User</span>
                            <span>user@gmail.com</span>
                        </div>
                        <p class="text-xs text-gray-400 mt-1">{{ $t('auth.demoPassword') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

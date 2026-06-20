<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
    error.value = ''
    loading.value = true

    try {
        await authStore.login(username.value, password.value)
        const redirect = route.query.redirect || '/protected'
        router.push(redirect)
    } catch (err) {
        error.value = err.code === 'INVALID_CREDENTIALS'
            ? 'token.invalidCredentials'
            : 'token.loginFailed'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div class="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        <div class="relative w-full max-w-md">
            <div class="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-xl text-white text-xl mb-4">
                        🔐
                    </div>
                    <h1 class="text-2xl font-bold text-white">{{ $t('token.loginTitle') }}</h1>
                    <p class="text-slate-400 text-sm mt-1">{{ $t('token.loginSubtitle') }}</p>
                </div>

                <form class="space-y-5" @submit.prevent="handleSubmit">
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-1.5">
                            {{ $t('token.username') }}
                        </label>
                        <input
                            v-model="username"
                            type="text"
                            required
                            placeholder="emilys"
                            class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-1.5">
                            {{ $t('token.password') }}
                        </label>
                        <input
                            v-model="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <p v-if="error" class="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                        {{ $t(error) }}
                    </p>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition disabled:opacity-60"
                    >
                        {{ loading ? $t('token.signingIn') : $t('token.signIn') }}
                    </button>
                </form>

                <div class="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-sm space-y-3">
                    <p class="font-medium text-slate-300">{{ $t('token.demoAccounts') }}</p>
                    <div class="text-slate-400 space-y-2 text-xs">
                        <p><span class="text-green-400">✓</span> emilys / emilyspass — {{ $t('token.hasPermission') }}</p>
                        <p><span class="text-red-400">✗</span> michaelw / michaelwpass — {{ $t('token.noPermission') }}</p>
                    </div>
                    <p class="text-slate-500 text-xs">{{ $t('token.tokenNote') }}</p>
                    <p class="text-slate-500 text-xs">{{ $t('token.apiNote') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

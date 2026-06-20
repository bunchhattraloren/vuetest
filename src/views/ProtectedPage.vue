<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()
const { accessToken, refreshToken, isAccessTokenValid, tokenExpiresAt, isRefreshing } = storeToRefs(authStore)

const profile = ref(null)
const loading = ref(true)
const countdown = ref(0)
let timer = null

const expiresInSeconds = computed(() => {
    if (!tokenExpiresAt.value) return 0
    return Math.max(0, Math.ceil((tokenExpiresAt.value - Date.now()) / 1000))
})

const maskedAccessToken = computed(() => {
    const t = accessToken.value
    if (!t) return ''
    return `${t.slice(0, 20)}...${t.slice(-10)}`
})

const maskedRefreshToken = computed(() => {
    const t = refreshToken.value
    if (!t) return ''
    return `${t.slice(0, 20)}...${t.slice(-10)}`
})

function updateCountdown() {
    countdown.value = expiresInSeconds.value
}

async function loadPage() {
    loading.value = true

    try {
        profile.value = await authStore.fetchProfile()
    } catch {
        router.push({ path: '/token-login', query: { redirect: '/protected' } })
    } finally {
        loading.value = false
    }
}

async function handleRefresh() {
    const ok = await authStore.refresh()
    if (ok) {
        await loadPage()
    } else {
        router.push({ path: '/token-login', query: { redirect: '/protected' } })
    }
}

function handleLogout() {
    authStore.logout()
    router.push('/token-login')
}

onMounted(async () => {
    await loadPage()
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div class="max-w-3xl mx-auto">
            <div v-if="loading" class="text-center py-20 text-gray-500">
                {{ $t('token.loading') }}
            </div>

            <template v-else-if="profile">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                🔒 {{ $t('token.protected') }}
                            </span>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-800">{{ $t('token.pageTitle') }}</h1>
                        <p class="text-gray-500 mt-1">{{ $t('token.pageSubtitle') }}</p>
                    </div>
                    <button
                        type="button"
                        class="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-white"
                        @click="handleLogout"
                    >
                        {{ $t('token.logout') }}
                    </button>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border p-6 mb-6">
                    <h2 class="font-semibold text-gray-800 mb-4">{{ $t('token.welcome', { name: profile.name }) }}</h2>
                    <p class="text-gray-600">{{ $t('token.content') }}</p>

                    <dl class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <dt class="text-gray-500">{{ $t('token.username') }}</dt>
                            <dd class="font-medium text-gray-800">{{ profile.username }}</dd>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <dt class="text-gray-500">{{ $t('token.email') }}</dt>
                            <dd class="font-medium text-gray-800">{{ profile.email }}</dd>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <dt class="text-gray-500">{{ $t('token.role') }}</dt>
                            <dd class="font-medium text-gray-800">{{ profile.role }}</dd>
                        </div>
                    </dl>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border p-6">
                    <h3 class="font-semibold text-gray-800 mb-4">{{ $t('token.tokenInfo') }}</h3>

                    <div class="space-y-4 text-sm">
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <p class="text-gray-500 mb-1">{{ $t('token.accessToken') }}</p>
                            <p class="font-mono text-xs text-gray-700 break-all">{{ maskedAccessToken }}</p>
                            <p class="mt-2 flex items-center gap-2">
                                <span
                                    class="px-2 py-0.5 rounded text-xs font-medium"
                                    :class="isAccessTokenValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                                >
                                    {{ isAccessTokenValid ? $t('token.valid') : $t('token.expired') }}
                                </span>
                                <span class="text-gray-500">
                                    {{ $t('token.expiresIn', { seconds: countdown }) }}
                                </span>
                            </p>
                        </div>

                        <div class="p-3 bg-gray-50 rounded-lg">
                            <p class="text-gray-500 mb-1">{{ $t('token.refreshToken') }}</p>
                            <p class="font-mono text-xs text-gray-700 break-all">{{ maskedRefreshToken }}</p>
                        </div>

                        <button
                            type="button"
                            :disabled="isRefreshing"
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:opacity-60"
                            @click="handleRefresh"
                        >
                            {{ isRefreshing ? $t('token.refreshing') : $t('token.refreshNow') }}
                        </button>

                        <p class="text-xs text-gray-400">{{ $t('token.refreshHint') }}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

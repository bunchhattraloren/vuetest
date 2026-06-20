import { defineStore } from 'pinia'
import * as authService from '../services/authService.js'

const ACCESS_KEY = 'token_access'
const REFRESH_KEY = 'token_refresh'
const USER_KEY = 'token_user'

function loadUser() {
    try {
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem(ACCESS_KEY) || '',
        refreshToken: localStorage.getItem(REFRESH_KEY) || '',
        user: loadUser(),
        isRefreshing: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.accessToken && !!state.user,

        tokenPayload: (state) => {
            if (!state.accessToken) return null
            return authService.parseAccessToken(state.accessToken)
        },

        isAccessTokenValid() {
            return !!this.tokenPayload
        },

        tokenExpiresAt() {
            return this.tokenPayload?.exp ?? null
        },
    },

    actions: {
        saveSession(tokens, userData) {
            this.accessToken = tokens.accessToken
            this.refreshToken = tokens.refreshToken
            this.user = userData

            localStorage.setItem(ACCESS_KEY, tokens.accessToken)
            localStorage.setItem(REFRESH_KEY, tokens.refreshToken)
            localStorage.setItem(USER_KEY, JSON.stringify(userData))
        },

        clearSession() {
            this.accessToken = ''
            this.refreshToken = ''
            this.user = null

            localStorage.removeItem(ACCESS_KEY)
            localStorage.removeItem(REFRESH_KEY)
            localStorage.removeItem(USER_KEY)
        },

        hasPermission(permission) {
            return this.user?.permissions?.includes(permission) ?? false
        },

        async login(username, password) {
            const result = await authService.login(username, password)
            this.saveSession(result, result.user)
            return result
        },

        async refresh() {
            if (!this.refreshToken || this.isRefreshing) {
                return false
            }

            this.isRefreshing = true

            try {
                const result = await authService.refreshToken(this.refreshToken)
                this.accessToken = result.accessToken
                this.refreshToken = result.refreshToken
                localStorage.setItem(ACCESS_KEY, result.accessToken)
                localStorage.setItem(REFRESH_KEY, result.refreshToken)
                return true
            } catch {
                this.clearSession()
                return false
            } finally {
                this.isRefreshing = false
            }
        },

        async ensureValidToken() {
            if (this.isAccessTokenValid) {
                return true
            }

            if (!this.refreshToken) {
                return false
            }

            return this.refresh()
        },

        async fetchProfile() {
            await this.ensureValidToken()

            if (!this.accessToken) {
                throw new Error('Not authenticated')
            }

            const profile = await authService.getProfile(this.accessToken)
            this.user = profile
            localStorage.setItem(USER_KEY, JSON.stringify(profile))
            return profile
        },

        logout() {
            this.clearSession()
        },
    },
})

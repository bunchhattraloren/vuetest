const API_BASE = 'https://dummyjson.com/auth'

const PERMISSIONS_MAP = {
    emilys: ['view:protected'],
    atuny0: ['view:protected', 'admin:all'],
}

function parseJwt(token) {
    try {
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload))
        return decoded
    } catch {
        return null
    }
}

function mapUser(data) {
    const username = data.username
    const permissions = PERMISSIONS_MAP[username] || []

    return {
        id: data.id,
        username,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        gender: data.gender,
        role: permissions.length ? 'member' : 'guest',
        permissions,
    }
}

function createApiError(message, code) {
    const error = new Error(message)
    error.code = code
    return error
}

async function request(url, options = {}) {
    const response = await fetch(url, {
        credentials: 'include',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        const message = data.message || 'Request failed'

        if (message === 'Invalid credentials') {
            throw createApiError(message, 'INVALID_CREDENTIALS')
        }

        if (response.status === 401) {
            throw createApiError(message, 'INVALID_ACCESS_TOKEN')
        }

        throw createApiError(message, 'API_ERROR')
    }

    return data
}

export async function login(username, password) {
    const data = await request(`${API_BASE}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
            expiresInMins: 1,
        }),
    })

    const user = mapUser(data)

    return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: 60,
        user,
    }
}

export async function refreshToken(refreshTokenValue) {
    const data = await request(`${API_BASE}/refresh`, {
        method: 'POST',
        body: JSON.stringify({
            refreshToken: refreshTokenValue,
            expiresInMins: 1,
        }),
    })

    return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    }
}

export async function getProfile(accessToken) {
    const data = await request(`${API_BASE}/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    const user = mapUser(data)
    const payload = parseAccessToken(accessToken)

    return {
        ...user,
        tokenExpiresAt: payload?.exp ?? null,
    }
}

export function parseAccessToken(accessToken) {
    const payload = parseJwt(accessToken)

    if (!payload?.exp) {
        return null
    }

    const expMs = payload.exp * 1000

    if (expMs < Date.now()) {
        return null
    }

    return {
        ...payload,
        exp: expMs,
    }
}

export const ACCESS_TOKEN_TTL = 60 * 1000

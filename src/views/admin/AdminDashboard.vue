<script setup>
import { useAuth } from '../../plugins/auth.js'

const { user } = useAuth()
const stats = user.value?.stats
const activities = user.value?.recentActivities ?? []
</script>

<template>
    <div class="p-8">
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800">{{ $t('auth.adminDashboard') }}</h2>
            <p class="text-gray-500">{{ $t('auth.adminWelcome', { name: user?.name }) }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl p-6 shadow-sm border">
                <p class="text-sm text-gray-500">{{ $t('auth.totalUsers') }}</p>
                <p class="text-3xl font-bold text-indigo-600 mt-1">{{ stats?.totalUsers?.toLocaleString() }}</p>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-sm border">
                <p class="text-sm text-gray-500">{{ $t('auth.totalOrders') }}</p>
                <p class="text-3xl font-bold text-purple-600 mt-1">{{ stats?.totalOrders?.toLocaleString() }}</p>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-sm border">
                <p class="text-sm text-gray-500">{{ $t('auth.revenue') }}</p>
                <p class="text-3xl font-bold text-green-600 mt-1">${{ stats?.revenue?.toLocaleString() }}</p>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-sm border">
                <p class="text-sm text-gray-500">{{ $t('auth.pendingTasks') }}</p>
                <p class="text-3xl font-bold text-orange-600 mt-1">{{ stats?.pendingTasks }}</p>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border">
            <div class="px-6 py-4 border-b">
                <h3 class="font-semibold text-gray-800">{{ $t('auth.recentActivities') }}</h3>
            </div>
            <ul class="divide-y">
                <li
                    v-for="item in activities"
                    :key="item.id"
                    class="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                    <span class="text-gray-700">{{ item.action }}</span>
                    <span class="text-sm text-gray-400">{{ item.time }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

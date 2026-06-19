<script setup>
import { useAuth } from '../../plugins/auth.js'

const { user } = useAuth()
const profile = user.value?.profile
const orders = user.value?.recentOrders ?? []
</script>

<template>
    <div>
        <div class="bg-white rounded-2xl shadow-sm border p-8 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('auth.userWelcome', { name: user?.name }) }}</h2>
            <p class="text-gray-500">{{ $t('auth.userSubtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="bg-white rounded-xl p-5 shadow-sm border text-center">
                <p class="text-2xl font-bold text-green-600">{{ profile?.orders }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ $t('auth.myOrders') }}</p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border text-center">
                <p class="text-2xl font-bold text-pink-600">{{ profile?.wishlist }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ $t('auth.wishlist') }}</p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border text-center">
                <p class="text-sm font-medium text-gray-700">{{ profile?.memberSince }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ $t('auth.memberSince') }}</p>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border">
            <div class="px-6 py-4 border-b">
                <h3 class="font-semibold text-gray-800">{{ $t('auth.myRecentOrders') }}</h3>
            </div>
            <ul class="divide-y">
                <li
                    v-for="order in orders"
                    :key="order.id"
                    class="px-6 py-4 flex items-center justify-between"
                >
                    <div>
                        <p class="font-medium text-gray-800">{{ order.product }}</p>
                        <p class="text-sm text-gray-400">{{ order.date }}</p>
                    </div>
                    <span
                        class="px-3 py-1 text-xs rounded-full"
                        :class="{
                            'bg-green-100 text-green-700': order.status === 'Delivered',
                            'bg-blue-100 text-blue-700': order.status === 'Shipped',
                            'bg-yellow-100 text-yellow-700': order.status === 'Processing',
                        }"
                    >
                        {{ order.status }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

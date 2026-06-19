<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { locale } = useI18n()

const showNav = computed(() => !route.meta.hideNav)

const locales = [
    { value: 'zh-CN', label: '中文' },
    { value: 'en', label: 'English' },
]

function setLocale(lang) {
    locale.value = lang
    localStorage.setItem('locale', lang)
}
</script>

<template>
    <nav v-if="showNav" class="flex items-center gap-4 p-4 border-b">
        <router-link to="/">{{ $t('nav.home') }}</router-link>
        <router-link to="/products">{{ $t('nav.products') }}</router-link>
        <router-link to="/lifecycle">{{ $t('nav.lifecycle') }}</router-link>
        <router-link to="/reactivity">{{ $t('nav.reactivity') }}</router-link>
        <router-link to="/mixin">{{ $t('nav.mixin') }}</router-link>
        <router-link to="/about">{{ $t('nav.about') }}</router-link>
        <router-link to="/login" class="ml-auto">{{ $t('nav.login') }}</router-link>
        <div class="flex gap-2">
            <button
                v-for="item in locales"
                :key="item.value"
                type="button"
                class="px-3 py-1 rounded border text-sm"
                :class="locale === item.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700'"
                @click="setLocale(item.value)"
            >
                {{ item.label }}
            </button>
        </div>
    </nav>
    <router-view></router-view>
</template>

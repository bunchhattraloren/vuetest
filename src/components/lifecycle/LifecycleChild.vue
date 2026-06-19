<script setup>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const props = defineProps({
    count: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['log'])

function log(hook, detail = '') {
    emit('log', { source: 'Child', hook, detail })
}

onBeforeMount(() => {
    log('onBeforeMount', 'lifecycle.childBeforeMount')
})

onMounted(() => {
    log('onMounted', 'lifecycle.childMounted')
})

onBeforeUpdate(() => {
    log('onBeforeUpdate', 'lifecycle.childBeforeUpdate')
})

onUpdated(() => {
    log('onUpdated', 'lifecycle.childUpdated')
})

onBeforeUnmount(() => {
    log('onBeforeUnmount', 'lifecycle.childBeforeUnmount')
})

onUnmounted(() => {
    console.log('[Lifecycle] Child onUnmounted')
})
</script>

<template>
    <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <p class="text-blue-700 font-medium">{{ $t('lifecycle.childLabel') }}</p>
        <p class="text-blue-600">{{ $t('lifecycle.childCount', { count }) }}</p>
    </div>
</template>

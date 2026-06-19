<script setup>
import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

const props = defineProps({
    tab: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['log'])

function log(hook, detail = '') {
    emit('log', { source: `KeepAlive (${props.tab})`, hook, detail })
}

onMounted(() => {
    log('onMounted', 'lifecycle.cachedMounted')
})

onUnmounted(() => {
    log('onUnmounted', 'lifecycle.cachedUnmounted')
})

onActivated(() => {
    log('onActivated', 'lifecycle.activatedDetail')
})

onDeactivated(() => {
    log('onDeactivated', 'lifecycle.deactivatedDetail')
})
</script>

<template>
    <div class="p-3 bg-purple-50 border border-purple-200 rounded text-sm">
        <p class="text-purple-700 font-medium">{{ $t('lifecycle.cachedLabel', { tab }) }}</p>
        <p class="text-purple-600">{{ $t('lifecycle.cachedHint') }}</p>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

const emit = defineEmits(['log'])

const shouldCrash = ref(false)

function log(hook, detail = '') {
    emit('log', { source: 'ErrorChild', hook, detail })
}

onBeforeMount(() => {
    log('onBeforeMount', 'lifecycle.errorChildBeforeMount')
})

onMounted(() => {
    log('onMounted', 'lifecycle.errorChildMounted')
})

onBeforeUnmount(() => {
    log('onBeforeUnmount', 'lifecycle.errorChildBeforeUnmount')
})

onUnmounted(() => {
    log('onUnmounted', 'lifecycle.errorChildUnmounted')
})

function triggerError() {
    shouldCrash.value = true
}
</script>

<template>
    <div class="p-3 bg-red-50 border border-red-200 rounded text-sm">
        <p class="text-red-700 font-medium">{{ $t('lifecycle.errorChildLabel') }}</p>
        <button
            type="button"
            class="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            @click="triggerError"
        >
            {{ $t('lifecycle.triggerError') }}
        </button>
        <p v-if="shouldCrash">{{ null.nested.value }}</p>
    </div>
</template>

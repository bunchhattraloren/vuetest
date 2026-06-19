<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from 'vue'
import LifecycleChild from '../components/lifecycle/LifecycleChild.vue'
import LifecycleCached from '../components/lifecycle/LifecycleCached.vue'
import LifecycleErrorChild from '../components/lifecycle/LifecycleErrorChild.vue'

const logs = ref([])
const count = ref(0)
const showChild = ref(true)
const activeTab = ref('tabA')
const showErrorChild = ref(true)

function addLog(source, hook, detail = '') {
    logs.value.unshift({
        id: Date.now() + Math.random(),
        time: new Date().toLocaleTimeString(),
        source,
        hook,
        detail,
    })
}

onBeforeMount(() => {
    addLog('Parent', 'onBeforeMount', 'lifecycle.beforeMountDetail')
})

onMounted(() => {
    addLog('Parent', 'onMounted', 'lifecycle.mountedDetail')
})

onBeforeUpdate(() => {
    addLog('Parent', 'onBeforeUpdate', 'lifecycle.beforeUpdateDetail')
})

onUpdated(() => {
    addLog('Parent', 'onUpdated', 'lifecycle.updatedDetail')
})

onBeforeUnmount(() => {
    addLog('Parent', 'onBeforeUnmount', 'lifecycle.beforeUnmountDetail')
})

onUnmounted(() => {
    // runs after component is torn down; log may not render
    console.log('[Lifecycle] Parent onUnmounted')
})

onErrorCaptured((err, _instance, info) => {
    addLog('Parent', 'onErrorCaptured', `${err.message} (${info})`)
    return false
})

function handleChildLog(entry) {
    addLog(entry.source, entry.hook, entry.detail)
}

function clearLogs() {
    logs.value = []
}

const hooks = [
    { hook: 'setup()', phase: 'lifecycle.phaseCreation', desc: 'lifecycle.setupDesc' },
    { hook: 'onBeforeMount', phase: 'lifecycle.phaseMount', desc: 'lifecycle.beforeMountDesc' },
    { hook: 'onMounted', phase: 'lifecycle.phaseMount', desc: 'lifecycle.mountedDesc' },
    { hook: 'onBeforeUpdate', phase: 'lifecycle.phaseUpdate', desc: 'lifecycle.beforeUpdateDesc' },
    { hook: 'onUpdated', phase: 'lifecycle.phaseUpdate', desc: 'lifecycle.updatedDesc' },
    { hook: 'onBeforeUnmount', phase: 'lifecycle.phaseUnmount', desc: 'lifecycle.beforeUnmountDesc' },
    { hook: 'onUnmounted', phase: 'lifecycle.phaseUnmount', desc: 'lifecycle.unmountedDesc' },
    { hook: 'onActivated', phase: 'lifecycle.phaseKeepAlive', desc: 'lifecycle.activatedDesc' },
    { hook: 'onDeactivated', phase: 'lifecycle.phaseKeepAlive', desc: 'lifecycle.deactivatedDesc' },
    { hook: 'onErrorCaptured', phase: 'lifecycle.phaseError', desc: 'lifecycle.errorCapturedDesc' },
]
</script>

<template>
    <div class="p-6 max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ $t('lifecycle.title') }}</h1>
        <p class="text-sm text-gray-500 mb-6">{{ $t('lifecycle.subtitle') }}</p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Controls -->
            <div class="space-y-4">
                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-3">{{ $t('lifecycle.updateDemo') }}</h2>
                    <p class="text-xs text-gray-400 mb-3">{{ $t('lifecycle.updateHint') }}</p>
                    <div class="flex items-center gap-3">
                        <button
                            type="button"
                            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            @click="count--"
                        >
                            -
                        </button>
                        <span class="text-xl font-bold w-12 text-center">{{ count }}</span>
                        <button
                            type="button"
                            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            @click="count++"
                        >
                            +
                        </button>
                    </div>
                </section>

                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-3">{{ $t('lifecycle.mountDemo') }}</h2>
                    <p class="text-xs text-gray-400 mb-3">{{ $t('lifecycle.mountHint') }}</p>
                    <button
                        type="button"
                        class="px-4 py-2 rounded text-white"
                        :class="showChild ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
                        @click="showChild = !showChild"
                    >
                        {{ showChild ? $t('lifecycle.destroyChild') : $t('lifecycle.createChild') }}
                    </button>
                    <LifecycleChild
                        v-if="showChild"
                        :count="count"
                        @log="handleChildLog"
                    />
                </section>

                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-3">{{ $t('lifecycle.keepAliveDemo') }}</h2>
                    <p class="text-xs text-gray-400 mb-3">{{ $t('lifecycle.keepAliveHint') }}</p>
                    <div class="flex gap-2 mb-3">
                        <button
                            type="button"
                            class="px-3 py-1 rounded border text-sm"
                            :class="activeTab === 'tabA' ? 'bg-blue-600 text-white border-blue-600' : ''"
                            @click="activeTab = 'tabA'"
                        >
                            Tab A
                        </button>
                        <button
                            type="button"
                            class="px-3 py-1 rounded border text-sm"
                            :class="activeTab === 'tabB' ? 'bg-blue-600 text-white border-blue-600' : ''"
                            @click="activeTab = 'tabB'"
                        >
                            Tab B
                        </button>
                    </div>
                    <KeepAlive>
                        <LifecycleCached
                            :key="activeTab"
                            :tab="activeTab"
                            @log="handleChildLog"
                        />
                    </KeepAlive>
                </section>

                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-3">{{ $t('lifecycle.errorDemo') }}</h2>
                    <p class="text-xs text-gray-400 mb-3">{{ $t('lifecycle.errorHint') }}</p>
                    <button
                        type="button"
                        class="px-3 py-1 mb-2 border rounded text-sm"
                        @click="showErrorChild = !showErrorChild"
                    >
                        {{ showErrorChild ? $t('lifecycle.hideErrorChild') : $t('lifecycle.showErrorChild') }}
                    </button>
                    <LifecycleErrorChild
                        v-if="showErrorChild"
                        @log="handleChildLog"
                    />
                </section>
            </div>

            <!-- Log panel -->
            <div class="border rounded-lg overflow-hidden flex flex-col h-[600px]">
                <div class="flex items-center justify-between px-4 py-3 bg-gray-100 border-b">
                    <h2 class="font-semibold text-gray-700">{{ $t('lifecycle.logTitle') }}</h2>
                    <button
                        type="button"
                        class="px-3 py-1 text-sm border rounded hover:bg-white"
                        @click="clearLogs"
                    >
                        {{ $t('lifecycle.clearLog') }}
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-900 font-mono text-sm">
                    <p v-if="logs.length === 0" class="text-gray-500 text-center py-8">
                        {{ $t('lifecycle.logEmpty') }}
                    </p>
                    <div
                        v-for="entry in logs"
                        :key="entry.id"
                        class="px-3 py-2 rounded bg-gray-800 text-gray-200"
                    >
                        <span class="text-gray-500">{{ entry.time }}</span>
                        <span class="text-yellow-400 ml-2">[{{ entry.source }}]</span>
                        <span class="text-green-400 ml-2">{{ entry.hook }}</span>
                        <span v-if="entry.detail" class="text-gray-400 ml-2">
                            — {{ entry.detail.startsWith('lifecycle.') ? $t(entry.detail) : entry.detail }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reference table -->
        <section class="border rounded-lg overflow-hidden">
            <h2 class="px-4 py-3 bg-gray-100 font-semibold text-gray-700">
                {{ $t('lifecycle.referenceTitle') }}
            </h2>
            <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 border-b">
                    <tr>
                        <th class="px-4 py-3 font-semibold text-gray-600">{{ $t('lifecycle.colHook') }}</th>
                        <th class="px-4 py-3 font-semibold text-gray-600">{{ $t('lifecycle.colPhase') }}</th>
                        <th class="px-4 py-3 font-semibold text-gray-600">{{ $t('lifecycle.colDesc') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in hooks"
                        :key="item.hook"
                        class="border-t hover:bg-gray-50"
                    >
                        <td class="px-4 py-3 font-mono text-blue-600">{{ item.hook }}</td>
                        <td class="px-4 py-3">{{ $t(item.phase) }}</td>
                        <td class="px-4 py-3 text-gray-600">{{ $t(item.desc) }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
import counterMixin from '../mixins/counterMixin.js'
import loggerMixin from '../mixins/loggerMixin.js'
import MixinChild from '../components/mixin/MixinChild.vue'

export default {
    components: { MixinChild },
    mixins: [counterMixin, loggerMixin],
    mounted() {
        this.addLog(this.$t('mixin.logMounted'))
    },
    methods: {
        handleIncrement() {
            this.increment()
            this.addLog(this.$t('mixin.logIncrement', { count: this.count }))
        },
        handleDecrement() {
            this.decrement()
            this.addLog(this.$t('mixin.logDecrement', { count: this.count }))
        },
        handleReset() {
            this.resetCount()
            this.addLog(this.$t('mixin.logReset'))
        },
        handleChildLog(message) {
            this.addLog(message)
        },
    },
}
</script>

<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ $t('mixin.title') }}</h1>
        <p class="text-sm text-gray-500 mb-6">{{ $t('mixin.subtitle') }}</p>

        <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            {{ $t('mixin.note') }}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-1">{{ $t('mixin.parentTitle') }}</h2>
                    <p class="text-xs text-gray-400 mb-4">{{ $t('mixin.parentHint') }}</p>

                    <div class="flex items-center gap-3 mb-4">
                        <button
                            type="button"
                            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            @click="handleDecrement"
                        >
                            -
                        </button>
                        <span class="text-2xl font-bold w-12 text-center">{{ count }}</span>
                        <button
                            type="button"
                            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            @click="handleIncrement"
                        >
                            +
                        </button>
                        <button
                            type="button"
                            class="px-3 py-1 border rounded text-sm hover:bg-gray-50"
                            @click="handleReset"
                        >
                            {{ $t('mixin.reset') }}
                        </button>
                    </div>

                    <MixinChild @log="handleChildLog" />
                </section>

                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-3">{{ $t('mixin.codeTitle') }}</h2>

                    <div class="space-y-3 text-sm">
                        <div>
                            <p class="font-mono text-blue-600 mb-1">counterMixin.js</p>
                            <pre class="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto text-xs">data() { return { count: 0 } }
methods: { increment(), decrement(), resetCount() }</pre>
                        </div>
                        <div>
                            <p class="font-mono text-blue-600 mb-1">loggerMixin.js</p>
                            <pre class="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto text-xs">data() { return { logs: [] } }
methods: { addLog(message), clearLogs() }</pre>
                        </div>
                        <div>
                            <p class="font-mono text-blue-600 mb-1">MixinDemo.vue</p>
                            <pre class="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto text-xs">mixins: [counterMixin, loggerMixin]
// count, increment, addLog all available as this.count, this.increment...</pre>
                        </div>
                    </div>
                </section>
            </div>

            <section class="border rounded-lg overflow-hidden flex flex-col h-[480px]">
                <div class="flex items-center justify-between px-4 py-3 bg-gray-100 border-b">
                    <div>
                        <h2 class="font-semibold text-gray-700">{{ $t('mixin.logTitle') }}</h2>
                        <p class="text-xs text-gray-400">{{ $t('mixin.logHint') }}</p>
                    </div>
                    <button
                        type="button"
                        class="px-3 py-1 text-sm border rounded hover:bg-white"
                        @click="clearLogs"
                    >
                        {{ $t('mixin.clearLog') }}
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-900 font-mono text-sm">
                    <p v-if="logs.length === 0" class="text-gray-500 text-center py-8">
                        {{ $t('mixin.logEmpty') }}
                    </p>
                    <div
                        v-for="log in logs"
                        :key="log.id"
                        class="px-3 py-2 rounded bg-gray-800 text-gray-200"
                    >
                        <span class="text-gray-500">{{ log.time }}</span>
                        <span class="ml-2 text-green-400">{{ log.message }}</span>
                    </div>
                </div>
            </section>
        </div>

        <section class="border rounded-lg overflow-hidden">
            <h2 class="px-4 py-3 bg-gray-100 font-semibold text-gray-700">
                {{ $t('mixin.referenceTitle') }}
            </h2>
            <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 border-b">
                    <tr>
                        <th class="px-4 py-3 font-semibold text-gray-600">{{ $t('mixin.colOption') }}</th>
                        <th class="px-4 py-3 font-semibold text-gray-600">{{ $t('mixin.colMerge') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-t">
                        <td class="px-4 py-3 font-mono text-blue-600">data</td>
                        <td class="px-4 py-3 text-gray-600">{{ $t('mixin.mergeData') }}</td>
                    </tr>
                    <tr class="border-t">
                        <td class="px-4 py-3 font-mono text-blue-600">methods</td>
                        <td class="px-4 py-3 text-gray-600">{{ $t('mixin.mergeMethods') }}</td>
                    </tr>
                    <tr class="border-t">
                        <td class="px-4 py-3 font-mono text-blue-600">mounted / hooks</td>
                        <td class="px-4 py-3 text-gray-600">{{ $t('mixin.mergeHooks') }}</td>
                    </tr>
                    <tr class="border-t">
                        <td class="px-4 py-3 font-mono text-blue-600">computed</td>
                        <td class="px-4 py-3 text-gray-600">{{ $t('mixin.mergeComputed') }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

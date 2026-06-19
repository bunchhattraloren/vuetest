<script>
import counterMixin from '../../mixins/counterMixin.js'

export default {
    mixins: [counterMixin],
    methods: {
        logAction() {
            this.$emit('log', this.$t('mixin.childLog', { count: this.count }))
        },
        handleIncrement() {
            this.increment()
            this.logAction()
        },
        handleDecrement() {
            this.decrement()
            this.logAction()
        },
    },
}
</script>

<template>
    <div class="p-3 bg-green-50 border border-green-200 rounded text-sm">
        <p class="text-green-700 font-medium mb-2">{{ $t('mixin.childTitle') }}</p>
        <p class="text-green-600 mb-3">{{ $t('mixin.childHint') }}</p>
        <div class="flex items-center gap-3">
            <button
                type="button"
                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                @click="handleDecrement"
            >
                -
            </button>
            <span class="font-bold w-8 text-center">{{ count }}</span>
            <button
                type="button"
                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                @click="handleIncrement"
            >
                +
            </button>
        </div>
    </div>
</template>

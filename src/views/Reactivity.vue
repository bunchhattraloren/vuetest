<script setup>
import { ref, computed, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')
const quantity = ref(1)
const unitPrice = ref(50)
const discountEnabled = ref(false)

const watchLogs = ref([])

const fullName = computed(() => `${firstName.value} ${lastName.value}`.trim())

const subtotal = computed(() => quantity.value * unitPrice.value)

const total = computed(() => {
    if (discountEnabled.value) {
        return (subtotal.value * 0.9).toFixed(2)
    }
    return subtotal.value.toFixed(2)
})

const orderType = computed(() => {
    if (quantity.value >= 10) return 'reactivity.bulkOrder'
    if (quantity.value >= 5) return 'reactivity.mediumOrder'
    return 'reactivity.smallOrder'
})

watch(quantity, (newVal, oldVal) => {
    watchLogs.value.unshift({
        id: Date.now(),
        message: 'reactivity.watchQuantity',
        params: { oldVal, newVal },
    })
})

watch(fullName, (newVal) => {
    watchLogs.value.unshift({
        id: Date.now() + 1,
        message: 'reactivity.watchFullName',
        params: { name: newVal },
    })
})

function increment() {
    quantity.value++
}

function decrement() {
    if (quantity.value > 1) {
        quantity.value--
    }
}

function toggleDiscount() {
    discountEnabled.value = !discountEnabled.value
}

function resetForm() {
    firstName.value = 'John'
    lastName.value = 'Doe'
    quantity.value = 1
    unitPrice.value = 50
    discountEnabled.value = false
}

function clearLogs() {
    watchLogs.value = []
}
</script>

<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ $t('reactivity.title') }}</h1>
        <p class="text-sm text-gray-500 mb-6">{{ $t('reactivity.subtitle') }}</p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Data + Methods -->
            <div class="space-y-4">
                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-1">{{ $t('reactivity.dataTitle') }}</h2>
                    <p class="text-xs text-gray-400 mb-4">{{ $t('reactivity.dataHint') }}</p>

                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                {{ $t('reactivity.firstName') }}
                            </label>
                            <input
                                v-model="firstName"
                                type="text"
                                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                {{ $t('reactivity.lastName') }}
                            </label>
                            <input
                                v-model="lastName"
                                type="text"
                                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                {{ $t('reactivity.unitPrice') }}
                            </label>
                            <input
                                v-model.number="unitPrice"
                                type="number"
                                min="0"
                                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-1">{{ $t('reactivity.methodTitle') }}</h2>
                    <p class="text-xs text-gray-400 mb-4">{{ $t('reactivity.methodHint') }}</p>

                    <div class="flex items-center gap-3 mb-4">
                        <span class="text-sm text-gray-600">{{ $t('reactivity.quantity') }}:</span>
                        <button
                            type="button"
                            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            @click="decrement"
                        >
                            -
                        </button>
                        <span class="font-bold w-8 text-center">{{ quantity }}</span>
                        <button
                            type="button"
                            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            @click="increment"
                        >
                            +
                        </button>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <button
                            type="button"
                            class="px-4 py-2 rounded text-white text-sm"
                            :class="discountEnabled ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'"
                            @click="toggleDiscount"
                        >
                            {{ discountEnabled ? $t('reactivity.removeDiscount') : $t('reactivity.applyDiscount') }}
                        </button>
                        <button
                            type="button"
                            class="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-50"
                            @click="resetForm"
                        >
                            {{ $t('reactivity.reset') }}
                        </button>
                    </div>
                </section>

                <section class="border rounded-lg p-4">
                    <h2 class="font-semibold text-gray-700 mb-1">{{ $t('reactivity.computedTitle') }}</h2>
                    <p class="text-xs text-gray-400 mb-4">{{ $t('reactivity.computedHint') }}</p>

                    <dl class="space-y-2 text-sm">
                        <div class="flex justify-between py-2 border-b">
                            <dt class="text-gray-500">{{ $t('reactivity.fullName') }}</dt>
                            <dd class="font-mono text-blue-600">{{ fullName }}</dd>
                        </div>
                        <div class="flex justify-between py-2 border-b">
                            <dt class="text-gray-500">{{ $t('reactivity.subtotal') }}</dt>
                            <dd class="font-mono text-blue-600">${{ subtotal.toFixed(2) }}</dd>
                        </div>
                        <div class="flex justify-between py-2 border-b">
                            <dt class="text-gray-500">{{ $t('reactivity.total') }}</dt>
                            <dd class="font-mono font-bold text-blue-600">${{ total }}</dd>
                        </div>
                        <div class="flex justify-between py-2">
                            <dt class="text-gray-500">{{ $t('reactivity.orderType') }}</dt>
                            <dd class="font-mono text-blue-600">{{ $t(orderType) }}</dd>
                        </div>
                    </dl>
                </section>
            </div>

            <!-- Watch log -->
            <section class="border rounded-lg overflow-hidden flex flex-col h-[500px]">
                <div class="flex items-center justify-between px-4 py-3 bg-gray-100 border-b">
                    <div>
                        <h2 class="font-semibold text-gray-700">{{ $t('reactivity.watchTitle') }}</h2>
                        <p class="text-xs text-gray-400">{{ $t('reactivity.watchHint') }}</p>
                    </div>
                    <button
                        type="button"
                        class="px-3 py-1 text-sm border rounded hover:bg-white"
                        @click="clearLogs"
                    >
                        {{ $t('reactivity.clearLog') }}
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-900 font-mono text-sm">
                    <p v-if="watchLogs.length === 0" class="text-gray-500 text-center py-8">
                        {{ $t('reactivity.logEmpty') }}
                    </p>
                    <div
                        v-for="log in watchLogs"
                        :key="log.id"
                        class="px-3 py-2 rounded bg-gray-800 text-green-400"
                    >
                        {{ $t(log.message, log.params) }}
                    </div>
                </div>
            </section>
        </div>

        <!-- Code reference -->
        <section class="mt-6 border rounded-lg overflow-hidden">
            <h2 class="px-4 py-3 bg-gray-100 font-semibold text-gray-700">
                {{ $t('reactivity.referenceTitle') }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x">
                <div class="p-4">
                    <h3 class="font-mono text-sm text-blue-600 mb-2">computed</h3>
                    <p class="text-sm text-gray-600">{{ $t('reactivity.computedDesc') }}</p>
                </div>
                <div class="p-4">
                    <h3 class="font-mono text-sm text-blue-600 mb-2">watch</h3>
                    <p class="text-sm text-gray-600">{{ $t('reactivity.watchDesc') }}</p>
                </div>
                <div class="p-4">
                    <h3 class="font-mono text-sm text-blue-600 mb-2">methods</h3>
                    <p class="text-sm text-gray-600">{{ $t('reactivity.methodDesc') }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

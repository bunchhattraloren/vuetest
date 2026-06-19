<script setup>
const props = defineProps({
    filters: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['filter-change'])

const stockOptions = [
    { value: 'all', labelKey: 'product.stockAll' },
    { value: 'inStock', labelKey: 'product.stockIn' },
    { value: 'lowStock', labelKey: 'product.stockLow' },
    { value: 'outOfStock', labelKey: 'product.stockOut' },
]

function updateField(field, value) {
    emit('filter-change', { ...props.filters, [field]: value })
}

function handleReset() {
    emit('filter-change', {
        keyword: '',
        minPrice: '',
        maxPrice: '',
        stockStatus: 'all',
    })
}
</script>

<template>
    <div class="p-4 bg-gray-50 border-b">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('product.search') }}
                </label>
                <input
                    :value="filters.keyword"
                    type="text"
                    :placeholder="$t('product.searchPlaceholder')"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="updateField('keyword', $event.target.value)"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('product.minPrice') }}
                </label>
                <input
                    :value="filters.minPrice"
                    type="number"
                    min="0"
                    :placeholder="$t('product.minPricePlaceholder')"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="updateField('minPrice', $event.target.value)"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('product.maxPrice') }}
                </label>
                <input
                    :value="filters.maxPrice"
                    type="number"
                    min="0"
                    :placeholder="$t('product.maxPricePlaceholder')"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="updateField('maxPrice', $event.target.value)"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('product.stockFilter') }}
                </label>
                <select
                    :value="filters.stockStatus"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @change="updateField('stockStatus', $event.target.value)"
                >
                    <option
                        v-for="option in stockOptions"
                        :key="option.value"
                        :value="option.value"
                    >
                        {{ $t(option.labelKey) }}
                    </option>
                </select>
            </div>
        </div>

        <div class="flex items-center justify-between mt-3">
            <p class="text-xs text-gray-400">{{ $t('product.filterHint') }}</p>
            <button
                type="button"
                class="px-3 py-1 text-sm border rounded text-gray-600 hover:bg-white"
                @click="handleReset"
            >
                {{ $t('product.resetFilter') }}
            </button>
        </div>
    </div>
</template>

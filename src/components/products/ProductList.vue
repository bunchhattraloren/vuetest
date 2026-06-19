<script setup>
defineProps({
    products: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
    <div>
        <table class="w-full text-left">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-600">{{ $t('product.name') }}</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-600">{{ $t('product.price') }}</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-600">{{ $t('product.stock') }}</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-600">{{ $t('product.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="product in products"
                    :key="product.id"
                    class="border-t hover:bg-gray-50"
                >
                    <td class="px-4 py-3">{{ product.name }}</td>
                    <td class="px-4 py-3">${{ product.price }}</td>
                    <td class="px-4 py-3">{{ product.stock }}</td>
                    <td class="px-4 py-3 flex gap-2">
                        <button
                            type="button"
                            class="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            @click="emit('edit', product)"
                        >
                            {{ $t('product.edit') }}
                        </button>
                        <button
                            type="button"
                            class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            @click="emit('delete', product.id)"
                        >
                            {{ $t('product.delete') }}
                        </button>
                    </td>
                </tr>
                <tr v-if="products.length === 0">
                    <td colspan="4" class="px-4 py-6 text-center text-gray-400">
                        {{ $t('product.empty') }}
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="px-4 py-2 text-xs text-gray-400 bg-gray-50 border-t">
            {{ $t('product.listHint') }}
        </p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    product: {
        type: Object,
        default: null,
    },
    isEditing: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
    name: '',
    price: 0,
    stock: 0,
})

watch(
    () => props.product,
    (product) => {
        if (product) {
            form.value = { ...product }
        } else {
            form.value = { name: '', price: 0, stock: 0 }
        }
    },
    { immediate: true },
)

function handleSubmit() {
    emit('save', { ...form.value })
}

function handleCancel() {
    emit('cancel')
}
</script>

<template>
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
        <form
            class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            @submit.prevent="handleSubmit"
        >
            <h2 class="text-xl font-bold mb-4 text-gray-800">
                {{ isEditing ? $t('product.editTitle') : $t('product.createTitle') }}
            </h2>

            <p class="mb-4 text-xs text-gray-400">{{ $t('product.formHint') }}</p>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('product.name') }}
                </label>
                <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('product.price') }}
                </label>
                <input
                    v-model.number="form.price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('product.stock') }}
                </label>
                <input
                    v-model.number="form.stock"
                    type="number"
                    min="0"
                    required
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div class="flex gap-3 justify-end">
                <button
                    type="button"
                    class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
                    @click="handleCancel"
                >
                    {{ $t('product.cancel') }}
                </button>
                <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {{ $t('product.save') }}
                </button>
            </div>
        </form>
    </div>
</template>

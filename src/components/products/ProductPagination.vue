<script setup>
import { computed } from 'vue'

const props = defineProps({
    total: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
    pageSize: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['page-change'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const pageNumbers = computed(() => {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
})

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
        emit('page-change', page)
    }
}
</script>

<template>
    <div class="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
        <p class="text-sm text-gray-600">
            {{ $t('product.paginationInfo', { total, currentPage, totalPages }) }}
        </p>
        <div class="flex items-center gap-1">
            <button
                type="button"
                class="px-3 py-1 text-sm border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
                :disabled="currentPage <= 1"
                @click="goToPage(currentPage - 1)"
            >
                {{ $t('product.prev') }}
            </button>
            <button
                v-for="page in pageNumbers"
                :key="page"
                type="button"
                class="px-3 py-1 text-sm border rounded"
                :class="page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-white'"
                @click="goToPage(page)"
            >
                {{ page }}
            </button>
            <button
                type="button"
                class="px-3 py-1 text-sm border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
                :disabled="currentPage >= totalPages"
                @click="goToPage(currentPage + 1)"
            >
                {{ $t('product.next') }}
            </button>
        </div>
        <p class="text-xs text-gray-400">{{ $t('product.paginationHint') }}</p>
    </div>
</template>

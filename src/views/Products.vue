<script setup>
import { ref, computed, watch } from 'vue'
import ProductList from '../components/products/ProductList.vue'
import ProductForm from '../components/products/ProductForm.vue'
import ProductPagination from '../components/products/ProductPagination.vue'
import ProductFilter from '../components/products/ProductFilter.vue'

let nextId = 13

const pageSize = 5
const currentPage = ref(1)

const filters = ref({
    keyword: '',
    minPrice: '',
    maxPrice: '',
    stockStatus: 'all',
})

const products = ref([
    { id: 1, name: 'iPhone 16', price: 999, stock: 50 },
    { id: 2, name: 'MacBook Pro', price: 2499, stock: 20 },
    { id: 3, name: 'AirPods Pro', price: 249, stock: 100 },
    { id: 4, name: 'iPad Air', price: 599, stock: 35 },
    { id: 5, name: 'Apple Watch', price: 399, stock: 60 },
    { id: 6, name: 'Magic Keyboard', price: 149, stock: 80 },
    { id: 7, name: 'Studio Display', price: 1599, stock: 15 },
    { id: 8, name: 'HomePod', price: 299, stock: 40 },
    { id: 9, name: 'AirTag 4-Pack', price: 99, stock: 200 },
    { id: 10, name: 'Mac Mini', price: 599, stock: 25 },
    { id: 11, name: 'Vision Pro', price: 3499, stock: 10 },
    { id: 12, name: 'Apple Pencil', price: 129, stock: 90 },
])

const editingProduct = ref(null)
const showForm = ref(false)

const filteredProducts = computed(() => {
    const { keyword, minPrice, maxPrice, stockStatus } = filters.value

    return products.value.filter((product) => {
        if (keyword && !product.name.toLowerCase().includes(keyword.toLowerCase())) {
            return false
        }
        if (minPrice !== '' && product.price < Number(minPrice)) {
            return false
        }
        if (maxPrice !== '' && product.price > Number(maxPrice)) {
            return false
        }
        if (stockStatus === 'inStock' && product.stock <= 0) {
            return false
        }
        if (stockStatus === 'lowStock' && (product.stock >= 20 || product.stock <= 0)) {
            return false
        }
        if (stockStatus === 'outOfStock' && product.stock > 0) {
            return false
        }
        return true
    })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / pageSize)))

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredProducts.value.slice(start, start + pageSize)
})

watch(totalPages, (pages) => {
    if (currentPage.value > pages) {
        currentPage.value = pages
    }
})

function openCreate() {
    editingProduct.value = null
    showForm.value = true
}

function handleEdit(product) {
    editingProduct.value = { ...product }
    showForm.value = true
}

function handleDelete(id) {
    products.value = products.value.filter((p) => p.id !== id)
}

function handleSave(product) {
    if (product.id) {
        const index = products.value.findIndex((p) => p.id === product.id)
        if (index !== -1) {
            products.value[index] = product
        }
    } else {
        products.value.push({ ...product, id: nextId++ })
        currentPage.value = totalPages.value
    }
    showForm.value = false
    editingProduct.value = null
}

function handleCancel() {
    showForm.value = false
    editingProduct.value = null
}

function handlePageChange(page) {
    currentPage.value = page
}

function handleFilterChange(newFilters) {
    filters.value = newFilters
    currentPage.value = 1
}
</script>

<template>
    <div class="p-6 max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-800">{{ $t('product.title') }}</h1>
            <button
                type="button"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                @click="openCreate"
            >
                {{ $t('product.add') }}
            </button>
        </div>

        <p class="mb-4 text-sm text-gray-500">{{ $t('product.parentHint') }}</p>

        <div class="border rounded-lg overflow-hidden">
            <ProductFilter
                :filters="filters"
                @filter-change="handleFilterChange"
            />

            <ProductList
                :products="paginatedProducts"
                @edit="handleEdit"
                @delete="handleDelete"
            />

            <ProductPagination
                :total="filteredProducts.length"
                :current-page="currentPage"
                :page-size="pageSize"
                @page-change="handlePageChange"
            />
        </div>

        <ProductForm
            v-if="showForm"
            :product="editingProduct"
            :is-editing="!!editingProduct"
            @save="handleSave"
            @cancel="handleCancel"
        />
    </div>
</template>

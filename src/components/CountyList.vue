<script setup>
import { defineProps } from 'vue';
import CountryItem from "./CountryItem.vue"

const props = defineProps({
    countries: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div v-for="country in countries" class="border border-gray-500 rounded p-3">
            <CountryItem :country="country" />
        </div>
    </div>
</template>

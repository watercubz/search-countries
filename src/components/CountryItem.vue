<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    country: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="h-56 sm:h-36">
        <img class="h-56 sm:h-36 w-full" :src="country.flags.png" :alt="country.flags.alt">
    </div>
    <h4 class="text-xl font-bold text-gray-500">{{ country.name.common }}</h4>
    <p class="text-sm text-gray-400">
        Population:
        <span>{{ country.population?.toLocaleString() }}</span>
    </p>
    <p class="text-sm text-gray-400">Region:
        <span>{{ country.region }}</span>
    </p>
    <p class="text-sm text-gray-400">
        Timezones:
        <span class="font-bold">{{ country.timezones[0] }}</span>
    </p>
    <p v-for="capital in country.capital" class="text-sm text-gray-400">
        Capital:
        <span class="font-bold">{{ capital }}</span>
    </p>
</template>

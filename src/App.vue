<script setup>
import { onMounted, ref, watch } from 'vue'
import axiosClient from "./utils/axios"

import PageHeader from './components/PageHeader.vue';
import CountyList from './components/CountyList.vue';

const countries = ref([])

const Search = ref("")
const filterdCountries = ref([])
const page = ref(1)
const items = ref(12)
const pagenatedCountries = ref([])
const totalItem = ref(0)

const fetchCountry = async () => {
  try {
    const { data } = await axiosClient.get('/all')
    countries.value = data
    totalItem.value = countries.value.length
  } catch (error) {
    console.log(error)
  }
}

const filterCountries = () => {
  filterdCountries.value = countries.value.filter((country) =>
    country.name.common.toLowerCase().includes(Search.value.toLowerCase()))
}

const slideCountries = (currentCountries) => {
  const start = (page.value - 1) * items.value
  const end = page.value * items.value
  pagenatedCountries.value = currentCountries.slice(start, end)
}

const changePage = (newPage) => {
  page.value = newPage
}
onMounted(() => {
  fetchCountry();
})

watch([countries, page, filterdCountries], () => {
  slideCountries(
    filterdCountries.value.length <= 0 ? countries.value : filterdCountries.value
  )
})
</script>

<template>
  <PageHeader />
  <div class="container max-w-screen-lg mx-auto px-6">
    <div class="mb-8">
      <input type="text" class="border border-gray-400 rounded w-full p-3 px-6 outline-none"
        placeholder="Search by country name" v-model="Search" @input="filterCountries">
    </div>
    <div class="mb-8 flex justify-center space-x-6">
      <button :disable="page <= 1" :class="{ 'opacity-50': page <= 1 }" @click="changePage(page - 1)"
        class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200">
        Previous
      </button>
      <button :disable="page >= totalItem / items" :class="{ 'opacity-50': page >= totalItem / items }"
        @click="changePage(page + 1)" class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200">
        Next
      </button>
    </div>
  </div>
  <div class="container max-w-screen-lg mx-auto px-6">
    <CountyList :countries="pagenatedCountries" />
  </div>
</template>

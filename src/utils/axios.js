import axios from "axios";

const instances = axios.create({
    baseURL: 'https://restcountries.com/v3.1/'
})

export default instances;
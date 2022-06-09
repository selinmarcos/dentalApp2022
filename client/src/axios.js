import axios from 'axios'
const BASE_URL = 'http://localhost:8000';
// const BASE_URL = 'https://dental.webmasterbolivia.com/';


//<PRUEBA>
// axios.defaults.headers.common['Authorization'] = 'Bearer';
// axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
// axios.defaults.withCredentials = true;
//</PRUEBA>
export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
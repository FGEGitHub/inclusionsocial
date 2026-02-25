import axios from "axios"
const url =import.meta.env.VITE_API_URL;
const baseUrl = url+'signin2/'



const login= async  (credentials) => {
 console.log(baseUrl)
  const {data } = await axios.post(baseUrl,credentials)
  if (data ==='Sin Exito'){
   alert(data)}
    return data 
}   

const guardar= async  credentials => {
    const {data } = await axios.post(baseUrl,credentials)
    return data 
} 
export default {login, guardar}

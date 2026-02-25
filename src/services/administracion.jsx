import axios from "axios"
const url =import.meta.env.VITE_API_URL;



const baseUrl = url.database+'administracion/'

//const baseUrl = 'http://esme.cuquicalvano.com:4000/administracion/'
//const  baseUrl ='http://localhost:4000/administracion/'



const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
/////loggedUserJSON Recupera lasesion el tokeny lo envia mediante la constante config. el back lo filtra 
 let config = ''
 if (loggedUserJSON) {
     const userContext = JSON.parse(loggedUserJSON)
  
 
      config = {
         headers:{
  
             Authorization:`Bearer ${userContext.token}`
         }
     }
 
     
 }else{
      config = {
         headers:{
             Authorization:`Bearer `
         }
     }
 }


 
 
 const contactos = async () => {
  console.log('sistemas/')
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'contactos/', config)
    console.log(data)
    if(data=== 'error login'){
     
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    }
return data

}
 const traertodoelcursado = async () => {
  console.log('sistemas/')
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traertodoelcursado/', config)
    console.log(data)
    if(data=== 'error login'){
     
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    }
return data
     
}
 const sistemas = async (usuario) => {
  console.log('sistemas/')
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'sistemas/', config)
    console.log(data)
    if(data=== 'error login'){
     
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    }
return data
     
}

 const todos = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'todos/', config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }

  
  
  const todoscadia = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'todoscadia/', config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }
  const todosdtc = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'todosdtc/', config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }




  const registronivel3 = async (datos) => {
    console.log(datos)
  
 
      const {data} = await axios.post(baseUrl+'signupp', datos,config)
 
        
    return(data)
 
       
  }

  const modificarusuario = async (datos) => {
    console.log(datos)
  
 
      const {data} = await axios.post(baseUrl+'modificarusuario', datos,config)
 
         alert(data)
    
 
       
  }
  

  const borrarusuario = async (datos) => {
    console.log(datos)
  
 
      const {data} = await axios.post(baseUrl+'borrarusuario', datos,config)
 
         alert(data)
    
 
       
  }
 export default {todoscadia,todos,registronivel3,traertodoelcursado,sistemas,modificarusuario,borrarusuario,contactos,todosdtc }
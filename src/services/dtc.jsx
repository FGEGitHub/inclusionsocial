import axios from "axios"
const url =import.meta.env.VITE_API_URL;


const baseUrl = url.database+'dtc/'
//const  baseUrl ='http://localhost:4000/tareas/'



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




 
 const listaprofs = async () => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'listaprofs/', config)
return data
     
}
  //////desde el id usaurio coordinador
  const listachiques = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listachiques/', config)
return data
       
  }
  
  const listachiquesparainscribir = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'listachiquesparainscribir/',id, config)
return data
       
  }
  const listachiquesmomentaneo = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listachiquesmomentaneo/', config)
return data
       
  }


  const listadepersonasgim = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadepersonasgim/', config)
return data
       
  }
  
  const listachicoscadia = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listachicoscadia/', config)
return data
       
  }
  
  const listachicoscadiaespera = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listachicoscadiaespera/', config)
return data
       
  }



    //////desde el id usaurio coordinador
    const listadepersonaspsiq = async () => {
  
      // const data = await axios.post('http://localhost:4000/signupp', datos)
        const {data} = await axios.get(baseUrl+'listadepersonaspsiq/', config)
  return data
         
    }
    
    const datosdepersonapsi = async (id) => {
  
      // const data = await axios.post('http://localhost:4000/signupp', datos)
        const {data} = await axios.get(baseUrl+'datosdepersonapsi/'+id, config)
  return data
         
    }
  const datosdechique = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosdechique/'+id, config)
return data
       
  }
  
  const datosdechiquecadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosdechiquecadia/'+id, config)
return data
       
  }
  const listadelegajos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadelegajos/'+id, config)
return data
       
  }
  
  const listaexpedientes = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listaexpedientes/', config)
return data
       
  }

  const traerfoto = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerfoto/'+id, config)
return data
       
  }
  const traerasistencia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerasistencia/'+id, config)
return data
       
  }
  
  const clasesdetaller = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'clasesdetaller/'+id, config)
return data
       
  }


  const restar1 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'restar1/'+id, config)
return data
       
  }

  const restar1p = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'restar1p/'+id, config)
return data
       
  }

  const sumar1 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'sumar1/'+id, config)
return data
       
  }
  const sumar1p = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'sumar1p/'+id, config)
return data
       
  }
  const traertalleres = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traertalleres/', config)
return data
       
  }
  
  const traterpsicologos2 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traterpsicologos2/', config)
return data
       
  }
  const traerprofesionales = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerprofesionales/', config)
return data
       
  }
  
  const traerpsicologos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerpsicologos/', config)
return data
       
  }
  const traeretapacocina = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traeretapacocina/'+id, config)
return data
       
  }
  
  const traeretapacocinacadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traeretapacocinacadia/', config)
return data
       
  }
  const traerclasestaller = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerclasestaller/'+id, config)
return data
       
  }
  
  const traerclasestaller2 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerclasestaller2/'+id, config)
return data
       
  }
  const traerclasestallercadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerclasestallercadia/'+id, config)
return data
       
  }
  const traerclasesprof = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerclasesprof/'+id, config)
return data
       
  }
  const traerintervenciones = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerintervenciones/', config)
return data
       
  }
  
  const traerpresentesdeclaseprof = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerpresentesdeclaseprof/'+id, config)
return data
       
  }


  const traerpresentesdeclase = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerpresentesdeclase/'+id, config)
return data
       
  }
  
  const traerpresentesfines = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerpresentesfines/'+id, config)
return data
       
  }

  const traerpresentesdeclase2 = async (datos) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'traerpresentesdeclase2/',datos, config)
return data
       
  }

  const traertodoslosturnosaprobac = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traertodoslosturnosaprobac/', config)
return data
       
  }
  
  const obtenerdetalle = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'obtenerdetalle/'+id, config)
return data
       
  }
  
  const traercitas = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercitas/'+id, config)
return data
       
  }
  
  const traercitascadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercitascadia/'+id, config)
return data
       
  }

  const traercitastodos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercitastodos/', config)
return data
       
  }
  
  const traercitastodoscadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercitastodoscadia/', config)
return data
       
  }
  const traerpresentes = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'traerpresentes/',{fecha:id.fecha,id:id.id}, config)
return data
       
  }
  

  
  const traerpresentescocina = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'traerpresentescocina/',{fecha:id.fecha,id:id.id}, config)
return data
       
  }



  const borrarturno = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'borrarturno/',id, config)
return data
       
  }
  
  
    
  const eliminarhorario = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'eliminarhorario/',id, config)
return data
       
  }
  const borrarturnocadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'borrarturnocadia/',id, config)
return data
       
  }

  const traerparaturnos = async (fecha) => {
  console.log(fecha)
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'traerparaturnos/',fecha, config)
return data
       
  }
  
  const traerparaturnoscadia = async (fecha) => {
    console.log(fecha)
      // const data = await axios.post('http://localhost:4000/signupp', datos)
        const {data} = await axios.post(baseUrl+'traerparaturnoscadia/',fecha, config)
  return data
         
    }
  const ponerpresente = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresente/',id, config)
return data
       
  }
  
    
  const ponerpresenteclaseprofs = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresenteclaseprofs/',id, config)
return data
       
  }
  const ponerpresenteclase = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresenteclase/',id, config)
return data
       
  }
  
  const ponerpresenteclase2 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresenteclase2/',id, config)
return data
       
  }

  const sacarturno = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'sacarturno/',id, config)
return data
       
  }
  const agendarturno = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'agendarturno/',id, config)
return data
       
  }
  
  const agendarturnocadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'agendarturnocadia/',id, config)
return data
       
  }

  const subirlegajo= async  (datos) => {

    const {data } = await axios.post(baseUrl+'subirlegajo',datos,config)
     
    return data  
 } 

 

 const enviarconsumomerienda= async  (datos) => {

  const {data } = await axios.post(baseUrl+'enviarconsumomerienda',datos,config)
   
  return data  
} 

const enviarconsumocolacion= async  (datos) => {

  const {data } = await axios.post(baseUrl+'enviarconsumocolacion',datos,config)
   
  return data  
} 
 const subirfotoperfil= async  (datos) => {

  const {data } = await axios.post(baseUrl+'subirfotoperfil',datos,config)
   
  return data  
} 
 
  const nuevochique= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'nuevochique',datos,config)
     
     return data   
 } 
 
 const nuevapersonagim= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevapersonagim',datos,config)
   
   return data   
} 
 const nuevochiquecadia= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevochiquecadia',datos,config)
   
   return data   
} 
 const nuevapersonapsiq= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevapersonapsiq',datos,config)
   
   return data   
} 
 const traeractividades= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'traeractividades',datos,config)
   
   return data   
} 

 const modificarusuario= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarusuario',datos,config)
   
   return data   
}

const modificarusuariocadia= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarusuariocadia',datos,config)
   
   return data   
}
const modificarusuariopsiq= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarusuariopsiq',datos,config)
   
   return data   
}

const traeractividadeschico= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'traeractividadeschico',datos,config)
   
   return data   
}

 const borrarlegajo= async  (datos) => {
console.log(datos)
  const {data } = await axios.post(baseUrl+'borrarlegajo',datos,config)
   
   return data  
}
 

const nuevaactividad= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaactividad',datos,config)
   
   return data  
}

const traerestadisticas= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traerestadisticas',{fecha:datos},config)
   
   return data  
}
const borraractividad= async  (datos) => {
console.log(datos)
  const {data } = await axios.post(baseUrl+'borraractividad',datos,config)
   
   return data  
}


const borrarinformeps= async  (datos) => {
  console.log(datos)
    const {data } = await axios.post(baseUrl+'borrarinformeps',datos,config)
     
     return data  
  }
  
  const borrarracion= async  (datos) => {
    console.log(datos)
      const {data } = await axios.post(baseUrl+'borrarracion',datos,config)
       
       return data  
    }
      const borrarcolacion= async  (datos) => {
    console.log(datos)
      const {data } = await axios.post(baseUrl+'borrarcolacion',datos,config)
       
       return data  
    }

const borraractividadsocial= async  (datos) => {
  console.log(datos)
    const {data } = await axios.post(baseUrl+'borraractividadsocial',datos,config)
     
     return data  
  }
  
  const borrarcosa= async  (datos) => {
    console.log(datos)
      const {data } = await axios.post(baseUrl+'borrarcosa',datos,config)
       
       return data  
    }

const borraractividadchico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borraractividadchico',datos,config)
   
   return data  
}

const borraractividadchicocadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borraractividadchicocadia',datos,config)
   
   return data  
}
const traertodaslasactividades= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traertodaslasactividades',datos,config)
   
   return data  
}

const nuevaactividadchico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaactividadchico',datos,config)
   
   return data  
}

const nuevaintervencion= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaintervencion',datos,config)
   
   return data  
}

const nuevoinformepsiq= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevoinformepsiq',datos,config)
   
   return data  
}
const nuevoinformepsiqcadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevoinformepsiqcadia',datos,config)
   
   return data  
}

const traerasistenciasdetaller= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traerasistenciasdetaller',datos,config)
   
   return data  
}
const borrarusuariodtc= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarusuariodtc',datos,config)
   
   return data  
}

const borrarusuariocadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarusuariocadia',datos,config)
   
   return data  
}
const borrarusuariodtcpsiq= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarusuariodtcpsiq',datos,config)
   
   return data  
}
const traercumples= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traercumples',datos,config)
   
   return data  
}


const traerracionesmes= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traerracionesmes',datos,config)
   
   return data  
}

const determinarvinculo= async  (datos) => {

  const {data } = await axios.post(baseUrl+'determinarvinculo',datos,config)
   
   return data  
}

const determinaprofesional= async  (datos) => {

  const {data } = await axios.post(baseUrl+'determinaprofesional',datos,config)
   
   return data  
}
const establecerretiro= async  (datos) => {

  const {data } = await axios.post(baseUrl+'establecerretiro',datos,config)
   
   return data  
}

const establecerregreso= async  (datos) => {

  const {data } = await axios.post(baseUrl+'establecerregreso',datos,config)
   
   return data  
}

const agregarturno= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarturno',datos,config)
   
   return data  
}

const agregarturnocadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarturnocadia',datos,config)
   
   return data  
}
const traertodoslosturnosfecha= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traertodoslosturnosfecha',datos,config)
  
   return data  
}

const traertodoslosturnosfechacadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traertodoslosturnosfechacadia',datos,config)
   
   return data  
}
const nuevaetapa= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaetapa',datos,config)
   
   return data  
}

const ponerausenteclase= async  (datos) => {

  const {data } = await axios.post(baseUrl+'ponerausenteclase',datos,config)
   
   return data  
}
const nuevaclasetaller= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaclasetaller',datos,config)
   
   return data  
}

const nuevaclaseprof= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaclaseprof',datos,config)
   
   return data  
}
const consultarasitencias= async  (datos) => {

  const {data } = await axios.post(baseUrl+'consultarasitencias',datos,config)
   
   return data  
}



const borrarclasee= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarclasee',datos,config)
   
   return data  
}

const borraretapa= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borraretapa',datos,config)
   
   return data  
}

const modificarclase= async  (datos) => {

  const {data } = await axios.post(baseUrl+'modificarclase',datos,config)
   
   return data  
}

const nuevaetapacadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaetapacadia',datos,config)
   
   return data  
}

const nuevoexpediente= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevoexpediente',datos,config)
   
   return data  
}

const agregarhorariochico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarhorariochico',datos,config)
   
   return data  
}

const modificarasist= async  (datos) => {

  const {data } = await axios.post(baseUrl+'modificarasist',datos,config)
   
   return data  
}

const modificarinformeps= async  (datos) => {

  const {data } = await axios.post(baseUrl+'modificarinformeps',datos,config)
   
   return data  
}

const nuevaprestacioninv= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaprestacioninv',datos,config)
   
   return data  
}
const agregarhorario= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarhorario',datos,config)
   
   return data  
}

const clasificarturno= async  (datos) => {

  const {data } = await axios.post(baseUrl+'clasificarturno',datos,config)
   
   return data  
}
const clasificarturnocadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'clasificarturnocadia',datos,config)
   
   return data  
}


const traerhorariosprofesionales = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorariosprofesionales', config)
return data
     
}
const traerhorariosprofesional = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorariosprofesional/'+id, config)
return data
     
}


const traerhorarioschicos = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorarioschicos', config)
return data
     
}
const traerhorarioschico = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorarioschico/'+id, config)
return data
     
}
const verArchivo = async (id) => {
  const response = await axios.get(`${baseUrl}verarchivo/${id}`, {
    responseType: 'blob', // Asegúrate de obtener el archivo como un blob
  });
  return response;
};

const verarchivopsiq = async (id) => {
  const response = await axios.get(`${baseUrl}verarchivopsiq/${id}`, {
    responseType: 'blob', // Asegúrate de obtener el archivo como un blob
  });
  return response;
};
const traerasitenciasociales = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerasitenciasociales/', config)
return data
     
}


const traerinformes = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerinformes/', config)
return data
     
}


const listainventario = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'listainventario/', config)
return data
     
}

const tablaprestacionesa = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'tablaprestacionesa/'+id, config)
return data
     
}

const traerhorariosdisponiblescadia = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorariosdisponiblescadia/'+id, config)
return data
     
}

const traeractividadesprofcadiaadmin = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traeractividadesprofcadiaadmin/', config)
return data
     
}
const traeractividadesprofcadia = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traeractividadesprofcadia/'+id, config)
return data
     
}

const traercosassole = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traercosassole/'+id, config)
return data
     
}

const obtenerinfodecursos = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'obtenerinfodecursos/'+id, config)
return data
     
}

const obtenerinfodecursostodos = async () => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'obtenerinfodecursostodos/', config)
return data
     
}
const traerarcchivoo = async (id) => {
  try {
      console.log(id);

      // Realizar la solicitud GET con axios para obtener el archivo como blob
      const response = await axios.get(`${baseUrl}traerarcchivoo/${id}`, {
          ...config,
          responseType: 'blob' // Para manejar archivos binarios
      });

      console.log(response);

      return response;
  } catch (error) {
      console.error('Error al traer el archivo:', error);
      throw error;
  }
};

const agregarvariasfechas= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarvariasfechas',datos,config)
   
   return data  
}
const agregarvariasfechasdtc= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarvariasfechasdtc',datos,config)
   
   return data  
}
const nuevacosa= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevacosa',datos,config)
   
   return data  
}
const enviarhorariosdlchico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'enviarhorariosdlchico',datos,config)
   
   return data  
}


const modificarinterv= async  (datos) => {

  const {data } = await axios.post(baseUrl+'modificarinterv',datos,config)
   
   return data  
}


const traermapa = async () => {
  const response = await axios.get(`${baseUrl}traermapa`);
    return response.data;
};


const guardarMapa = async (updatedKml) => {
  const {data} = await axios.post(`${baseUrl}actualizarmapa`, { updatedKml });
  return data;
};

const borrarpuntoenmapa = async (point) => {
  const {data }= await axios.post(baseUrl+'borrarpuntoenmapa', {
    lat: point.latlng.lat, lng: point.latlng.lng 
  });
  return data;
};


const traermapaentregas = async () => {
  const {data} = await axios.get(`${baseUrl}traermapaentregas`);
  return data;
};

const traerstock = async () => {
  const {data} = await axios.get(`${baseUrl}traerstock`);
  return data;
};

const traerparasumar = async () => {
  const {data} = await axios.get(`${baseUrl}traerparasumar`);
  return data;
};


const guardarmapaentregas = async (updatedKml) => {
  const {data} = await axios.post(`${baseUrl}actualizarmapaentregas`, { updatedKml });
    return data
};

const borrarpuntoenmapaentregas = async (point) => {
  console.log(point.latlng.lat);
  const {data} = await axios.post(baseUrl + 'borrarpuntoenmapentregas', {
    lat: point.latlng.lat,
    lng: point.latlng.lng,
    name: point.name // Solo si es necesario
  });
 
  return data.message;
};


const modificaretapa = async (datos) => {
  const {data } = await axios.post(baseUrl+'modificaretapa',datos,config)
  
    return data
};


const nuevoproducto = async (datos) => {
  const {data } = await axios.post(baseUrl+'nuevoproducto',datos,config)
  
    return data
};



const sumarstock = async (datos) => {
  const {data } = await axios.post(baseUrl+'sumarstock',datos,config)
  
    return data
};

const inscribiracurso = async (datos) => {
  const {data } = await axios.post(baseUrl+'inscribiracurso',datos,config)
  console.log(data)
    return data.message
};
const agregarConsumo = async (datos) => {
  const {data } = await axios.post(baseUrl+'agregarconsumo',datos,config)
  
    return data
};

const informaciondeinscriptos = async () => {
  const {data} = await axios.get(`${baseUrl}informaciondeinscriptos`);
  return data;
};

const traermeriendas = async () => {
  const {data} = await axios.get(`${baseUrl}traermeriendas`);
  return data;
};

const traercolaciones = async () => {
  const {data} = await axios.get(`${baseUrl}traercolaciones`);
  return data;
};
const verimagendemerienda = async (id) => {
  const {data} = await axios.get(`${baseUrl}verimagendemerienda/`+id);
  
  return data;
};

const traerproximosturnos = async (id) => {
  const {data} = await axios.get(`${baseUrl}traerproximosturnos/`+id);
  
  return data;
};
const verusosdeproducto = async (id) => {
  const {data} = await axios.get(`${baseUrl}verusosdeproducto/`+id);
  
  return data;
};


const traertodoslosturnospsiq = async () => {
  const {data} = await axios.get(`${baseUrl}traertodoslosturnospsiq`);

  return data;
};



const traerdatosdeclasehorausuario = async (datos) => {
  const {data } = await axios.post(baseUrl+'traerdatosdeclasehorausuario',datos,config)
  
    return data
};

const borrarrecepcion = async (datos) => {
  
  const {data } = await axios.post(baseUrl+'borrarrecepcion',datos,config)
  
    return data
};
const cambiarestadopsico = async (datos) => {
  
  const {data } = await axios.post(baseUrl+'cambiarestadopsico',datos,config)
  
    return data
};

const borrarusoconsumo = async (datos) => {
  const {data } = await axios.post(baseUrl+'borrarusoconsumo',datos,config)
  
    return data
};

const nuevooficio = async (datos) => {
  const data= await axios.post(baseUrl+'nuevooficio',datos,config)
  console.log(data)
    return data
};


const borraroficio = async (datos) => {
  const data= await axios.post(baseUrl+'borraroficio',{id:datos},config)
  console.log(data)
    return data
};

const borrarexpediente = async (datos) => {
  const data= await axios.post(baseUrl+'borrarexpediente',{id:datos},config)
  console.log(data)
    return data
};
const agregarAlumnoFines = async (datos) => {
  console.log(datos)
  const {data } = await axios.post(baseUrl+'agregarAlumnoFines',datos,config)
  console.log(data)
    return data
};


const modificar_alumno_fines = async (datos) => {
  console.log(datos)
  const {data } = await axios.post(baseUrl+'modificar_alumno_fines',datos,config)
  console.log(data)
    return data
};



const ponerpresenteingreso = async (datos) => {
  console.log(datos)
  const {data } = await axios.post(baseUrl+'ponerpresenteingreso',datos,config)
  console.log(data)
    return data
};

const actualizarOficio = async (datos) => {
  console.log(datos)
  const {data } = await axios.post(baseUrl+'actualizaroficio',datos,config)
  alert (data.message)
    return data
};



const asignarOficioAChico = async (datos) => {
  console.log(datos)
  const {data } = await axios.post(baseUrl+'asignarOficioAChico',datos,config)
  console.log(data)
    return data
};


const relacionar = async (datos) => {
  console.log(datos)
  const {data } = await axios.post(baseUrl+'relacionar',datos,config)
  console.log(data)
    return data
};



const subirExpediente = async (FormData) => {

  const { data } = await axios.post(baseUrl + 'subirexpediente', FormData, { 
    headers: { "Content-Type": "multipart/form-data" } 
  }, config);
  
    return data
};

const traaeroficios = async (id) => {
  const {data} = await axios.get(`${baseUrl}traaeroficios/`);
  
  return data;
};

const traerturnosdepsico = async (id) => {
  const {data} = await axios.get(`${baseUrl}traerturnosdepsico/`+id);
  
  return data;
};

const listatodosdeldtc = async (id) => {
  const {data} = await axios.get(`${baseUrl}listatodosdeldtc/`);
  
  return data;
};


const eliminartodosloshorariosdeusuario = async (id) => {
  const {data} = await axios.get(`${baseUrl}eliminartodosloshorariosdeusuario/`+id);
  
  return data;
};
const obtenerExpediente = async (idExpediente) => {
  return await axios.get(baseUrl + `obtenerexpediente/${idExpediente}`, {
      responseType: 'blob'  // Importante para recibir archivos binarios
  });
};

const traeralumnosfines = async () => {
  const {data} = await axios.get(`${baseUrl}traeralumnosfines/`);
  
  return data;
};


const traerestadisticastaller = async (id) => {
  const {data} = await axios.get(`${baseUrl}traerestadisticastaller/`+id,config);
  
  return data;
};

const traerestadisticastodas = async () => {
  const {data} = await axios.get(`${baseUrl}traerestadisticastodas/`,config);
  
  return data;
};


export default {relacionar, borrarexpediente, borraroficio, asignarOficioAChico,  traertodoslosturnospsiq, cambiarestadopsico, traerestadisticastodas, ponerpresenteingreso, traerestadisticastaller,borrarcolacion, modificar_alumno_fines, agregarAlumnoFines, traeralumnosfines, traerpresentesfines, traerturnosdepsico, traterpsicologos2, ponerpresenteclase2,traerclasestaller2,enviarconsumocolacion,traercolaciones,traerpresentescocina,eliminartodosloshorariosdeusuario,listatodosdeldtc,traerproximosturnos,actualizarOficio,obtenerExpediente,subirExpediente,nuevooficio,traaeroficios,borrarusoconsumo,borrarrecepcion,verusosdeproducto,borrarracion,traerpresentesdeclase2,verimagendemerienda,traermeriendas,enviarconsumomerienda,traerdatosdeclasehorausuario,listachiquesparainscribir,verarchivopsiq,agregarvariasfechasdtc,informaciondeinscriptos,obtenerinfodecursostodos,eliminarhorario,obtenerinfodecursos,inscribiracurso,agregarConsumo,sumarstock,traerparasumar,nuevoproducto,traerstock,modificaretapa,traermapaentregas,borrarpuntoenmapaentregas,guardarmapaentregas,borrarpuntoenmapa,guardarMapa,traermapa,listachiquesmomentaneo,listachicoscadiaespera,modificarinterv,traerarcchivoo,borrarcosa,traercosassole,nuevacosa,traeractividadesprofcadiaadmin,borraractividadchicocadia,nuevoinformepsiqcadia,traeractividadesprofcadia,enviarhorariosdlchico,traerhorariosdisponiblescadia,agregarvariasfechas, traerclasestallercadia,clasificarturno,clasificarturnocadia,traercitascadia,traerpsicologos,agendarturnocadia,traercitastodoscadia,traerparaturnoscadia,borrarturnocadia,agregarturnocadia,traertodoslosturnosfechacadia,tablaprestacionesa,nuevaprestacioninv,listainventario,borrarinformeps,modificarinformeps,nuevoinformepsiq,traerinformes,modificarasist,traercosassole,borraractividadsocial,verArchivo,nuevaintervencion,traerasitenciasociales,determinaprofesional,listaprofs,traerhorarioschicos,traerhorariosprofesionales,agregarhorariochico,traerhorarioschico,agregarhorario,traerhorariosprofesional,ponerpresenteclaseprofs,traerpresentesdeclaseprof,nuevaclaseprof,traerclasesprof,traerprofesionales,traercitastodos,traercitas,nuevapersonagim,listadepersonasgim,nuevoexpediente,listaexpedientes,modificarusuariocadia,borrarusuariocadia,datosdechiquecadia,nuevochiquecadia,listachicoscadia,obtenerdetalle,traerintervenciones,traeretapacocinacadia,nuevaetapacadia,modificarclase,borraretapa,borrarclasee,consultarasitencias,ponerausenteclase,ponerpresenteclase,traerpresentesdeclase,nuevaclasetaller,traerclasestaller,nuevaetapa,traeretapacocina,traertodoslosturnosfecha,agregarturno,establecerregreso,establecerretiro,restar1p,sumar1p,determinarvinculo,traerracionesmes,restar1,sumar1,traertodoslosturnosaprobac,borrarturno,traerparaturnos,sacarturno,agendarturno,borrarusuariodtcpsiq,modificarusuariopsiq,listadepersonaspsiq,datosdepersonapsi,nuevapersonapsiq,borrarusuariodtc,traercumples,listachiques,traerestadisticas,traerasistencia,traerasistenciasdetaller,clasesdetaller,traertalleres,nuevochique,traerfoto,nuevaactividadchico,subirfotoperfil,borraractividadchico,traertodaslasactividades,traeractividadeschico,traeractividades,nuevaactividad,borraractividad,datosdechique,subirlegajo,listadelegajos,borrarlegajo,modificarusuario,traerpresentes,ponerpresente}

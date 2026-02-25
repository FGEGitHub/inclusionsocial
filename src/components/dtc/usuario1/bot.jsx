import React, { useState, useEffect } from "react";
import "./ChatBot.css"; // Estilos CSS
import logo from "../../../Assets/dtcito.png"; // Ruta de tu imagen
import servicioDtc from "../../../services/dtc";

const ChatBot = () => {
  const [conversation, setConversation] = useState("inicio");
  const [showDialog, setShowDialog] = useState(false); // Cambiado a false inicialmente
  const [showOptions, setShowOptions] = useState(false);
  const [cumple, setCumple] = useState([]);

  useEffect(() => {
    traerCumples();
  }, []);

  const traerCumples = async () => {
    try {
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      console.log(formattedDate);
      const historial = await servicioDtc.traercumples({ fecha: formattedDate });

      setCumple(historial[0]); // Guardamos todos los cumpleaños
    } catch (error) {
      console.error("Error al traer cumpleaños", error);
    }
  };

  const questions = {
    inicio: {
      message: `Hola, bienvenido!<br/>Mi nombre es Dtcito, primero que nada<br/>   ${
        cumple.length > 0
          ? `Hoy hay cumple! Saluda a  ${cumple
              .map((c) => `<b>${c.nombre}</b>`)
              .join(", ")}`
          : "Hoy no hay cumples :( pero a la izquierda podes ver los del mes"
      }`,
      options: ["¿Como tomar asistencia?","¿Como ver los horarios de las inscipciones?",  "¿Que actividades hubieron hoy?", "¿Quien soy?"],
    },
    comotomarasistencia: {
      message:
        "En realidad la asistencia los toman los talleristas en sus clases, paralelo a esto, puedes tomarlo desde aqui donde dice Selecione una opcion y luego poner presente, también puedes seleccionar el día preciso y te listará",
      options: ["Volver"],
    },
    queactividadeshubieronhoy: {
      message: "Estamos trabajando en eso, todavia no puedo responder pero la idea es decirte que talleres funcionaron hoy",
      options: ["Volver"],
    },
    comoverloshorariosdelasinscipciones: {
      message: "En el menu de la izquierda podras ver la pestaña inscripciones donde tendras 2 modos, vista detallada de cda horario o la vista semanal que se veran el numero de inscriptos de cada taller. Tambien puedes ir a talleres figuran los de cada actividad por separado",
      options: ["¿Cómo buscar por nombre?", "¿Cómo filtrar por fecha?", "Volver"],
    },
    comobuscarpornombre: {
      message: "Para buscar por nombre, usa la barra de búsqueda en la sección 'Personas'.",
      options: ["Volver"],
    },
    comofiltrarporfecha: {
      message: "Para filtrar por fecha, selecciona un rango en el filtro de la tabla.",
      options: ["Volver"],
    },
    quiensoy: {
      message: "Soy Dtcito, naci en este 2025, la idea es aprender a contestar todas las preguntas rapidas cuando no comprendas el sistema. Proxiammente tambien ayudare a los talleristas",
      options: ["Volver"],
    },
  };

  useEffect(() => {
    // Mostrar opciones después de 10 segundos si no hay interacción
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 10000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar o cambiar de conversación
  }, [conversation]);

  const handleOptionClick = (option) => {
    const nextConversation = option
      .toLowerCase()
      .replace(/[^\w\s]/gi, "") // Elimina caracteres especiales
      .replace(/ /g, ""); // Elimina espacios
  
    if (questions[nextConversation]) {
      setConversation(nextConversation);
    } else {
      console.warn(`Conversación no encontrada: ${nextConversation}`);
      setConversation("inicio"); // Vuelve al inicio si no encuentra la conversación
    }
    setShowOptions(false);
  };

  const toggleDialog = () => setShowDialog(!showDialog); // Alternar el estado del diálogo

  // Verificamos que la conversación actual exista y tenga opciones
  const currentQuestion = questions[conversation] || questions["inicio"];
  const options = currentQuestion.options || []; // Aseguramos que siempre sea un array

  return (
    <div className="chat-container">
      {!showDialog && (
        <img
          src={logo}
          alt="Chat Logo"
          className="chat-logo floating-logo"
          onClick={toggleDialog} // Abre el diálogo al hacer clic en el logo
        />
      )}
      {showDialog && (
        <div className="chat-box">
          <div className="chat-message speech-bubble">
            <button className="close-button" onClick={toggleDialog}>
              ✖
            </button>
            <p dangerouslySetInnerHTML={{ __html: currentQuestion.message }}></p>
            {options.length > 0 && (
              <ul>
                {options.map((option, index) => (
                  <li key={index} onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

import React, { useState, useEffect } from "react";
import "../../usuario1/ChatBot.css"; // Estilos CSS
import logo from "../../../../Assets/dtcito.png"; // Ruta de tu imagen
import servicioDtc from "../../../../services/dtc";

const ChatBot = () => {
  const [conversation, setConversation] = useState("inicio");
  const [showDialog, setShowDialog] = useState(true);
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
      message: `Hola, bienvenido!<br/>Mi nombre es Dtcito, estoy aquipara ayudarte, primero que nada<br/>   ${
        cumple.length > 0
          ? `Hoy hay cumple! Saluda a  ${cumple
              .map((c) => `<b>${c.nombre}</b>`)
              .join(", ")}`
          : "Hoy no hay cumples :( pero a la izquierda podes ver los del mes"
      }`,
      options: ["¿Como agrego un producto?","¿Como agrego stock?",  "¿como guardo el consumo?", "¿como agrego expedientes?"],
    },
    comoagregounproducto: {
      message:
        "Para agregar un producto debes hacer click en nuevo, cuando agregues apaecera en la lista de los mismos. IMPORTANTE: los productos se agregan UNA SOLA VEZ. Luego se suma el stock ",
      options: ["Volver"],
    },
    comoagregostock: {
        message:
          "Para agregar Stock es importante haber AGREGADO el mismo, Se debe seleciconar Sumar stock, se abre un desplegable donde se selecciona donde sumar, de que expediente llego y la cantidad",
        options: ["Volver"],
      },
      comoguardoelconsumo: {
        message:
          "Para agregar el consumo tiene que existir ya cargado el producto y aparecera en la lista, seleciconando Agregar consumo se ponela  fecha que se uso y cuanto",
        options: ["Volver"],
      },
      comoagregoexpedientes: {
        message:
          "En un futuro te explicare. Recien estoy aprendiendo el sistema",
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
  

  if (!showDialog) return null; // Oculta el componente si showDialog es false

  // Verificamos que la conversación actual exista y tenga opciones
  const currentQuestion = questions[conversation] || questions["inicio"];
  const options = currentQuestion.options || []; // Aseguramos que siempre sea un array

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-message speech-bubble">
          <button className="close-button" onClick={() => setShowDialog(false)}>
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
          {conversation === "inicio" && !showOptions && (
            <button className="chat-button" onClick={() => setShowOptions(true)}>
              Tengo una pregunta
            </button>
          )}
        </div>
        <img src={logo} alt="Chat Logo" className="chat-logo animated-logo" />
      </div>
    </div>
  );
};

export default ChatBot;

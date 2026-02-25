import React, { useState, useEffect } from "react";
import "../usuario1/ChatBot.css"; // Estilos CSS
import logo from "../../../Assets/dtcito.png"; // Ruta de tu imagen

const ChatBot = () => {
  const [conversation, setConversation] = useState("inicio");
  const [showDialog, setShowDialog] = useState(false); // Inicialmente minimizado
  const [randomOption, setRandomOption] = useState(null);

  const questions = {
    inicio: {
      message: `Hola, bienvenido!`,
      options: [
        "¿Quieres DESINSCRIBIR A un usuario?",
        "¿Ya viste el modo semanal?",
        "¿Estas aburrido?",
      ],
    },
    quieresdesinscribiraunusuario: {
      message:
        "Como seguridad para DESINSCRIBIR debes ir a usuarios, buscarlo y ver el perfil. Allí tienes la opción para desinscribir.",
      options: ["Volver"],
    },
    yavisteelmodosemanal: {
      message:
        "El modo semanal es para ver por día la cantidad de ocupación de cada taller. No brinda detalles, pero es útil para ver qué tanta actividad tienen.",
      options: ["Volver"],
    },
    estasaburrido: {
      message: "No naciste millonario/a, papu. ¡Ponte a trabajar!",
      options: ["Volver"],
    },
  };

  // Mostrar una opción aleatoria automáticamente después de 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showDialog) {
        const randomIndex = Math.floor(
          Math.random() * questions.inicio.options.length
        );
        const randomOption = questions.inicio.options[randomIndex];
        setRandomOption(randomOption); // Guardar opción aleatoria
        setShowDialog(true); // Desplegar el diálogo automáticamente
      }
    }, 10000); // 10 segundos

    return () => clearTimeout(timer); // Limpiar temporizador
  }, [showDialog]);

  const handleOptionClick = (option) => {
    const nextConversation = option
      .toLowerCase()
      .replace(/[^\w\s]/gi, "") // Elimina caracteres especiales
      .replace(/ /g, ""); // Elimina espacios

    if (questions[nextConversation]) {
      setConversation(nextConversation); // Cambia la conversación automáticamente
    } else {
      setConversation("inicio"); // Reinicia si no encuentra la opción
    }

    setRandomOption(null); // Limpiar la opción aleatoria
    setShowDialog(true); // Mantener el diálogo abierto
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
    setRandomOption(null); // Limpiar cualquier opción aleatoria
  };

  // Determinar qué mostrar (mensaje y opciones)
  const currentQuestion = questions[conversation];
  const options =
    randomOption && !showDialog ? [randomOption] : currentQuestion.options;

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
            <p>{currentQuestion.message}</p>
            {options.length > 0 && (
              <ul>
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)} // Manejar clic en opción
                  >
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

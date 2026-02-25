import React, { useState, useEffect } from "react";

const BotonCambioColor = (props) => {
  const [color, setColor] = useState("bg-blue-500");
  const [destello, setDestello] = useState("");

  const handleMouseEnter = () => setColor("bg-green-500");
  const handleMouseLeave = () => setColor("bg-blue-500");
  const handleClick = () => {
    props.accion()
  };

  useEffect(() => {
    setDestello("animate-ping");
    const timer = setTimeout(() => setDestello(""), 500);
    return () => clearTimeout(timer);
  }, [color]);

  return (
    <button
      className={`${color} ${destello} text-white px-4 py-2 rounded-lg transition-all duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {props.texto}
    </button>
  );
};

export default BotonCambioColor;

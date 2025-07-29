import React from "react";
import PropTypes from "prop-types";
import "./../styles/Devs.css";

function Devs({ onFlip }) {
  const devList = [
    {
      name: "John Herbert",
      imgSrc: "public/imgs/john.jpg",
      github: "https://github.com/JohnHerbert1",
    },
    {
      name: "Jadson Anderson",
      imgSrc: "public/imgs/Jadson.jpg",
      github: "https://github.com/JadsonAnderson",
    },
    {
      name: "Carlos",
      imgSrc: "public/imgs/foto.jpg",
      github: "https://github.com/Carlos-Academico",
    },
    {
      name: "EmanuelJnr",
      imgSrc: "public/imgs/emanuel.jpg",
      github: "https://github.com/EmanuelJnr",
    },
  ];

  return (
    <div className="devs-wrapper">
      {/* Título */}
      <h1 className="devs-title">Sobre os Devs</h1>

      {/* Grid de 2 colunas */}
      <div className="devs-grid">
        {devList.map((dev) => (
          <div key={dev.name} className="devs-item">
            <a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="devs-avatar-link"
            >
              <img
                src={dev.imgSrc}
                alt={dev.name}
                className="devs-avatar-img"
              />
            </a>
            <p className="devs-name">{dev.name}</p>
          </div>
        ))}
      </div>

      {/* Botão Voltar */}
      <button onClick={onFlip} className="devs-back-btn">
        Voltar
      </button>
    </div>
  );
}

Devs.propTypes = {
  onFlip: PropTypes.func.isRequired,
};

export default Devs;

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Lista de IDs de videos HD para la reproducción continua
  const trailerPlaylist = [
    "73_1biulkYk", // Deadpool & Wolverine
    "U2Qp5pL3ovA", // Dune: Parte Dos
    "_OKAwz2jBI0", // Joker: Folie à Deux
    "qqrpMRDuPpg", // Godzilla x Kong
    "giXco2jaZ_4", // Top Gun: Maverick
    "hR1-S223e5k", // Bad Boys 4
  ];

  // Construimos la URL de la playlist para YouTube
  // autoplay=1: Inicia solo
  // controls=0: Interfaz limpia
  // playlist: IDs separados por coma para que sigan uno tras otro
  // mute=0: Con audio activado
  const firstVideo = trailerPlaylist[0];
  const remainingPlaylist = trailerPlaylist.slice(1).join(",");
  const cinematicUrl = `https://www.youtube.com/embed/${firstVideo}?autoplay=1&controls=1&loop=1&playlist=${remainingPlaylist},${firstVideo}&mute=0&vq=hd1080&rel=0`;

  return (
    <div style={{ 
      background: "#000", 
      height: "100vh", 
      width: "100vw", 
      position: "fixed", 
      top: 0, 
      left: 0, 
      zIndex: 99999,
      overflow: "hidden" 
    }}>
      
      {/* BOTÓN REGRESAR AL HOME */}
      <button 
        onClick={() => navigate("/")}
        style={{ 
          position: "absolute", 
          top: "30px", 
          left: "30px", 
          zIndex: 10, 
          background: "rgba(0,0,0,0.5)", 
          color: "#fff", 
          border: "2px solid #fff", 
          padding: "10px 25px", 
          borderRadius: "30px", 
          fontSize: "1rem", 
          fontWeight: "bold", 
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
        onMouseOver={(e) => { e.target.style.background = "#fff"; e.target.style.color = "#000"; }}
        onMouseOut={(e) => { e.target.style.background = "rgba(0,0,0,0.5)"; e.target.style.color = "#fff"; }}
      >
        <span>←</span> Volver al Inicio
      </button>

      {/* REPRODUCTOR FULLSCREEN */}
      <div style={{ 
        width: "100%", 
        height: "100%", 
        pointerEvents: "auto" 
      }}>
        <iframe 
          width="100%" 
          height="100%" 
          src={cinematicUrl} 
          title="Netflix Trailers Cinematic" 
          frameBorder="0" 
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
          style={{ 
            width: "100vw", 
            height: "100vh", 
            objectFit: "cover" 
          }}
        ></iframe>
      </div>
    </div>
  );
}
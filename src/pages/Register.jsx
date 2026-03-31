import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Lista de IDs de videos HD para la reproducción continua
  const trailerPlaylist = [
    "73_1biulkYk", // Deadpool 3
    "U2Qp5pL3ovA", // Dune 2 (ID Corregido para asegurar disponibilidad)
    "XtFI7SNtVpY", // Planet of the Apes
    "j7jPnwVGdZ8", // The Fall Guy
    "giXco2jaZ_4"  // Top Gun Maverick
  ];

  const firstVideo = trailerPlaylist[0];
  // URL ultra-limpia: autoplay, sin controles, sin logos y en HD
  const cinematicUrl = `https://www.youtube.com/embed/${firstVideo}?playlist=${trailerPlaylist.join(",")}&autoplay=1&mute=0&controls=0&loop=1&modestbranding=1&rel=0&vq=hd1080&iv_load_policy=3&disablekb=1&autohide=1`;

  return (
    <div style={{ 
      backgroundColor: "#000",
      position: "fixed",
      // Usamos dimensiones exageradas para compensar el zoom del 0.85 y cubrir todo
      top: "-10vh",
      left: "-10vw",
      width: "120vw",
      height: "120vh",
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
        position: "relative",
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Evita interactuar con YouTube (no pausa, no links)
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <iframe 
          width="100%" 
          height="100%" 
          src={cinematicUrl} 
          title="Syspelis Trailers" 
          frameBorder="0" 
          allow="autoplay; fullscreen"
          style={{ 
            width: "100%", 
            height: "100%", 
            transform: "scale(1.5)", // Escala para ocultar los bordes negros y la interfaz de YouTube
            border: "none" 
          }}
        ></iframe>
      </div>
    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Lista de IDs de videos HD para la reproducción continua
  const trailerPlaylist = [
    "73_1biulkYk", // Deadpool 3
    "way9Dexny3w", // Dune 2
    "XtFI7SNtVpY", // Planet of the Apes
    "j7jPnwVGdZ8", // The Fall Guy
    "giXco2jaZ_4"  // Top Gun Maverick
  ];

  const firstVideo = trailerPlaylist[0];
  // Construcción de URL ultra-limpia para evitar errores de disponibilidad
  const cinematicUrl = `https://www.youtube.com/embed/${firstVideo}?playlist=${trailerPlaylist.join(",")}&autoplay=1&mute=0&controls=0&loop=1&modestbranding=1&rel=0&vq=hd1080&iv_load_policy=3`;

  return (
    <div style={{ 
      background: "#000", 
      height: "100vh", 
      width: "100vw", 
      position: "fixed", 
      top: 0, 
      left: 0, 
      zIndex: 99999, 
      overflow: "hidden",
      // Eliminamos cualquier rastro de zoom del index.css para este componente
      transform: "scale(1)",
      zoom: "normal"
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
        pointerEvents: "none", // Bloquea clics para que no se pause ni abra YouTube
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
            width: "115vw",  // Más ancho para ocultar UI de YT
            height: "115vh", // Más alto para ocultar UI de YT
            transform: "scale(1.2)", // Escala épica para cubrir todo sin bordes
            filter: "contrast(1.05) brightness(1.1)"
          }}
        ></iframe>
      </div>
    </div>
  );
}
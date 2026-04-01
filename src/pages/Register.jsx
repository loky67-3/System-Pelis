import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Lista de IDs de videos HD para la reproducción continua
  const trailerPlaylist = [
    "d9My665987w", // Avatar: El Camino del Agua (Épico en HD)
    "U2Qp5pL3ovA", // Dune: Part Two (Calidad máxima)
    "mqqft2x_Aa4", // The Batman (Nitidez extrema)
    "YoHD9XEInc0", // Inception (Clásico 4K)
    "zSWdZVtXT7E"  // Interstellar (Visuales de impacto)
  ];

  const firstVideo = trailerPlaylist[0];
  // URL ultra-limpia: autoplay, sin controles, sin logos y en HD
  const cinematicUrl = `https://www.youtube.com/embed/${firstVideo}?playlist=${trailerPlaylist.join(",")}&autoplay=1&mute=0&controls=0&loop=1&modestbranding=1&rel=0&vq=hd1080&iv_load_policy=3&disablekb=1&fs=0&autohide=1`;

  return (
    <div style={{ 
      position: "fixed",
      // Compensación matemática para zoom 0.85 (100 / 0.85 = 117.7)
      top: 0,
      left: 0,
      width: "118vw", 
      height: "118vh",
      zIndex: 99999,
      overflow: "hidden",
      backgroundColor: "#000",
      // Forzamos zoom 1 para eliminar lo borroso
      zoom: 1,
      transform: "scale(1)",
      transformOrigin: "top left",
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased"
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
            transform: "scale(1.3)", // Escala optimizada para ocultar UI sin pixelar
            border: "none" 
          }}
        ></iframe>
      </div>
    </div>
  );
}
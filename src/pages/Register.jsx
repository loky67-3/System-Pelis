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
  // URL optimizada: evitamos parámetros conflictivos para asegurar disponibilidad y HD
  const cinematicUrl = `https://www.youtube.com/embed/${firstVideo}?playlist=${trailerPlaylist.join(",")}&autoplay=1&mute=0&controls=0&loop=1&modestbranding=1&rel=0&vq=hd1080&iv_load_policy=3&showinfo=0&disablekb=1`;

  return (
    <div style={{ 
      backgroundColor: "#000", 
      height: "100vh", 
      width: "100vw", 
      position: "fixed", 
      top: 0, 
      left: 0, 
      zIndex: 99999, 
      overflow: "hidden",
      // Reset absoluto del zoom para evitar borrosidad y asegurar 100% de cobertura
      zoom: 1,
      transform: "scale(1)"
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
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1.35)", // Escala para ocultar UI de YouTube
        width: "max(100vw, 177.78vh)", // Mantiene proporción 16:9 cubriendo todo el ancho
        height: "max(100vh, 56.25vw)", // Mantiene proporción 16:9 cubriendo todo el alto
        pointerEvents: "none",
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
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}
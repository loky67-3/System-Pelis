import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  // Estado para controlar si el video de fondo está silenciado.
  // Inicia con sonido (false), pero se silenciará cuando se abra un modal.
  const [isBgMuted, setIsBgMuted] = useState(false);

  // Efecto para silenciar/activar el sonido del video de fondo
  useEffect(() => {
    if (selectedTrailer) {
      setIsBgMuted(true); // Silencia el fondo cuando se abre un trailer
    } else {
      // Cuando se cierra el modal, espera un poco y restaura el sonido
      // para evitar que se solapen los audios.
      const timer = setTimeout(() => {
        setIsBgMuted(false);
      }, 300);
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [selectedTrailer]);

  const trailers = [
    { id: 1, title: "Deadpool & Wolverine", img: "https://tse1.mm.bing.net/th/id/OIP.SfxTJtRJCVs23MjYS-lWqwHaK-?rs=1&pid=ImgDetMain&o=7&rm=3", video: "73_1biulkYk" },
    { id: 2, title: "Intensamente 2", img: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", video: "LhYI7vF606k" },
    { id: 3, title: "Dune: Parte Dos", img: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", video: "U2Qp5pL3ovA" },
    { id: 4, title: "Godzilla y Kong", img: "https://th.bing.com/th/id/R.874576ccc682d8b4922f79dbc48a05f6?rik=LWRYtZyLW5Uzzg&pid=ImgRaw&r=0", video: "qqrpMRDuPpg" },
    { id: 5, title: "Kung Fu Panda 4", img: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg", video: "_inKs4eeHiI" },
    { id: 6, title: "Civil War", img: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg", video: "aDyQxtgKWPo" },
    { id: 7, title: "Profesión Peligro", img: "https://tse3.mm.bing.net/th/id/OIP.ndMpKIM4YyCsrxwjsN6m4gHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3", video: "j7jPnwVGdZ8" },
    { id: 8, title: "El Planeta de los Simios", img: "https://image.tmdb.org/t/p/w500/v5Xy6eL9g9UaI1Pq73gI4iAatit.jpg", video: "XtFI7SNtVpY" },
    { id: 9, title: "Bad Boys: Hasta la Muerte", img: "https://image.tmdb.org/t/p/w500/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg", video: "hR1-S223e5k" },
    { id: 10, title: "Un Lugar en Silencio: Día Uno", img: "https://www.cartelerasdecine.info/wp-content/uploads/2024/07/Poster-Un-Lugar-en-Silencio-Dia-Uno.jpg", video: "YPY7J-flzE8" },
    { id: 11, title: "Oppenheimer", img: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", video: "uYPbbksJxIg" },
    { id: 12, title: "Barbie", img: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", video: "pBk4NYhWNMM" },
    { id: 13, title: "Guardianes de la Galaxia 3", img: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg", video: "u3V5KDHRQvk" },
    { id: 14, title: "Super Mario Bros", img: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", video: "TnGl01FkMMo" },
    { id: 15, title: "Avatar: El Camino del Agua", img: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", video: "d9My665987w" },
    { id: 16, title: "Top Gun: Maverick", img: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", video: "giXco2jaZ_4" },
    { id: 17, title: "Spider-Man: No Way Home", img: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", video: "JfVOs4VSpmA" },
    { id: 18, title: "The Batman", img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", video: "mqqft2x_Aa4" },
  ];

  // URL dinámica para el video de fondo
  const backgroundVideoUrl = `https://www.youtube.com/embed/Way9Dexny3w?autoplay=1&controls=0&loop=1&playlist=Way9Dexny3w&mute=${isBgMuted ? 1 : 0}&vq=hd1080`;

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>
      
      {/* === HERO SECTION CON VIDEO DE FONDO === */}
      <div style={{ position: "relative", height: "85vh", width: "100%", overflow: "hidden" }}>
        {/* Capa oscura para que el texto se lea bien */}
        <div style={{ 
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
          background: "rgba(0,0,0,0.5)", zIndex: 2 
        }}></div>

        {/* Video de fondo (YouTube Embed simulado como background) */}
        <div style={{ 
          position: "absolute", top: "50%", left: "50%", 
          width: "100vw", height: "100vh", 
          transform: "translate(-50%, -50%) scale(1.35)", 
          pointerEvents: "none", zIndex: 1 
        }}>
          <iframe 
            width="100%" height="100%" 
            src={backgroundVideoUrl} 
            title="Background Video" 
            frameBorder="0" 
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
            style={{ objectFit: "cover" }}
          ></iframe>
        </div>

        {/* Contenido del Hero */}
        <div style={{ 
          position: "relative", zIndex: 3, height: "100%", 
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", 
          textAlign: "center", padding: "0 20px" 
        }}>
          <h1 style={{ 
            fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: "900", textTransform: "uppercase", 
            letterSpacing: "2px", marginBottom: "10px", 
            textShadow: "0 0 30px rgba(229, 9, 20, 0.8)" 
          }}>
            Estrenos Exclusivos
          </h1>
          <p style={{ fontSize: "1.5rem", maxWidth: "700px", marginBottom: "30px", textShadow: "2px 2px 4px #000" }}>
            Disfruta de los estrenos más esperados, trailers exclusivos y contenido que no verás en ningún otro lugar.
          </p>
          <button 
            onClick={() => navigate("/login")}
            style={{ 
              padding: "16px 50px", fontSize: "1.5rem", fontWeight: "bold", 
              background: "#e50914", color: "white", border: "none", borderRadius: "5px", 
              cursor: "pointer", boxShadow: "0 0 20px rgba(229, 9, 20, 0.6)",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Únete Ahora
          </button>
        </div>
      </div>

      {/* === SECCIÓN DE TRAILERS === */}
      <div style={{ padding: "60px 5%" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "40px", borderLeft: "6px solid #e50914", paddingLeft: "20px" }}>
          Trailers Tendencia
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
          {trailers.map((movie) => (
            <div key={movie.id} 
              onClick={() => setSelectedTrailer(movie.video)}
              style={{ 
                position: "relative", borderRadius: "10px", overflow: "hidden", 
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)", cursor: "pointer", transition: "transform 0.3s" 
              }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <img src={movie.img} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ 
                position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", 
                display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" 
              }}>
                <div style={{ 
                  width: "60px", height: "60px", background: "rgba(229, 9, 20, 0.9)", 
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "30px", paddingLeft: "5px", boxShadow: "0 0 15px rgba(229,9,20,0.8)"
                }}>▶</div>
                <h3 style={{ marginTop: "15px", textShadow: "2px 2px 4px #000" }}>{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === GALERÍA DE IMÁGENES === */}
      <div style={{ background: "#141414", padding: "60px 0" }}>
        <h2 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px", color: "#fff" }}>
          Galería <span style={{ color: "#e50914" }}>VIP</span>
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(5, 1fr)",
          width: "100%",
        }}>
          {[
            "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
            "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
            "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
            "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            "https://image.tmdb.org/t/p/original/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
            "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            "https://image.tmdb.org/t/p/original/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg"
          ].map((img, index) => (
            <div key={index} style={{ 
              width: "100%",
              height: "450px", 
              cursor: "pointer",
              overflow: "hidden",
              position: "relative"
            }}>
              <img 
                src={img} 
                alt={`Gallery ${index}`} 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  display: "block"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* === MODAL DE VIDEO === */}
      {selectedTrailer && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
        }} onClick={() => setSelectedTrailer(null)}>
          <div style={{ width: "100%", maxWidth: "1000px", aspectRatio: "16/9", position: "relative", boxShadow: "0 0 50px rgba(229,9,20,0.3)" }}>
            <button onClick={() => setSelectedTrailer(null)} style={{
              position: "absolute", top: "-50px", right: "0", background: "none", border: "none",
              color: "#fff", fontSize: "40px", cursor: "pointer", zIndex: 10000
            }}>✕</button>
            <iframe 
              width="100%" height="100%" 
              src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1&rel=0`} 
              title="Trailer" frameBorder="0" allow="autoplay; encrypted-media; fullscreen" allowFullScreen
              style={{ borderRadius: "10px" }}
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
}
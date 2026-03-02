import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Datos simulados (Mock Data)
const featuredMovie = {
  title: "System: Peliculas y mas",
  description: "Historias que te harán cuestionar la realidad, personajes que desafían los límites y mundos que existen más allá de la imaginación.",
  image: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
};

const trendingNow = [
  { id: 101, title: "Venom: Carnage Liberado", image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg" },
  { id: 102, title: "Intensamente 2", image: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg" },
  { id: 103, title: "Dune: Parte Dos", image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
  { id: 104, title: "Godzilla Minus One", image: "https://image.tmdb.org/t/p/original/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg" },
  { id: 105, title: "Kung Fu Panda 4", image: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg" },
  { id: 106, title: "Civil War", image: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg" },
  { id: 107, title: "Profesión Peligro", image: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg" },
  { id: 108, title: "El Planeta de los Simios", image: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg" },
  { id: 109, title: "Bad Boys: Hasta la Muerte", image: "https://image.tmdb.org/t/p/w500/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg" },
  { id: 110, title: "Un Lugar en Silencio: Día Uno", image: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg" }
];

const categories = [
  {
    title: "Tendencias Ahora",
    movies: [
      { id: 1, title: "Venom: Carnage Liberado", image: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg", match: "99%" },
      { id: 2, title: "Intensamente 2", image: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", match: "98%" },
      { id: 3, title: "Oppenheimer", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", match: "97%" },
      { id: 4, title: "Barbie", image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", match: "95%" },
      { id: 5, title: "Guardianes de la Galaxia 3", image: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg", match: "96%" },
      { id: 6, title: "Super Mario Bros", image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", match: "94%" },
      { id: 13, title: "Avatar: El Camino del Agua", image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", match: "99%" },
      { id: 14, title: "Top Gun: Maverick", image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", match: "98%" },
    ]
  },
  {
    title: "Nuevos Lanzamientos",
    movies: [
      { id: 7, title: "Mad Max: Furia en el Camino", image: "https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg", match: "95%" },
      { id: 8, title: "Sonic 2: La Película", image: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg", match: "90%" },
      { id: 9, title: "Amigos Imaginarios", image: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg", match: "90%" },
      { id: 10, title: "Creed III", image: "https://image.tmdb.org/t/p/original/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg", match: "88%" },
      { id: 11, title: "Godzilla Minus One", image: "https://image.tmdb.org/t/p/original/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg", match: "98%" },
      { id: 12, title: "Black Widow", image: "https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg", match: "85%" },
      { id: 15, title: "The Marvels", image: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg", match: "80%" },
      { id: 16, title: "Aquaman 2", image: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg", match: "89%" },
    ]
  }
];

const plans = [
  { name: "Básico", price: "$99", quality: "Buena", resolution: "720p", devices: "1 dispositivo", color: "#e50914" },
  { name: "Estándar", price: "$169", quality: "Mejor", resolution: "1080p", devices: "2 dispositivos", color: "#223366" },
  { name: "Premium", price: "$229", quality: "Óptima", resolution: "4K+HDR", devices: "4 dispositivos", color: "#b81d24" },
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const wideCarouselRef = useRef(null);

  // Efecto de scroll automático para el carrusel panorámico
  useEffect(() => {
    const carousel = wideCarouselRef.current;
    if (!carousel) return;

    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        // Si llega al final de la primera mitad, resetea al inicio para un bucle infinito
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1; // Ajusta este valor para cambiar la velocidad
        }
      }, 25); // Ajusta este valor para un movimiento más suave o rápido
    };

    const stopAutoScroll = () => clearInterval(scrollInterval);

    // Pausa el scroll cuando el mouse está encima
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();

    return () => {
      stopAutoScroll();
      carousel.removeEventListener('mouseenter', stopAutoScroll);
      carousel.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);

  return (
    <div className="netflix-page" style={{ overflowX: 'hidden' }}>
      {/* === HERO SECTION === */}
      <section 
        className="hero-netflix" 
        style={{ 
          backgroundImage: `url("${featuredMovie.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        <div className="hero-overlay">
          <h1 className="netflix-logo" style={{ marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            {featuredMovie.title}
          </h1>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', fontSize: '16px', fontWeight: 'bold', color: '#46d369' }}>
            <span>98% Coincidencia</span>
            <span style={{ color: '#fff' }}>2026</span>
            <span style={{ border: '1px solid #fff', padding: '0 5px', color: '#fff', fontSize: '12px' }}>TV-MA</span>
          </div>
          <p style={{ maxWidth: '600px', fontSize: '18px', lineHeight: '1.4', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            {featuredMovie.description}
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <button 
              className="hero-btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 25px' }}
              onClick={() => navigate('/register')}
            >
              <span>▶</span> Reproducir
            </button>
            <button className="hero-btn" style={{ background: 'rgba(109, 109, 110, 0.7)', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 25px' }}>
              <span>ℹ️</span> Más Información
            </button>
          </div>
        </div>
      </section>

      {/* === CATEGORÍAS DE PELÍCULAS === */}
      <div className="content-overlap">
        
        {categories.map((cat, index) => (
          <section key={index} className="movies-section" style={{ padding: '20px 4%', boxSizing: 'border-box' }}>
            <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold', color: '#e5e5e5' }}>
              {cat.title}
            </h2>

            <div className="movie-row" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px', scrollbarWidth: 'none' }}>
              {cat.movies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => setSelectedMovie(movie)}
                  style={{ minWidth: '150px', transition: 'transform 0.3s' }}
                >
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    style={{ width: '100%', borderRadius: '4px', objectFit: 'cover' }} 
                    loading="lazy"
                  />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p style={{ color: '#46d369', fontSize: '12px', fontWeight: 'bold' }}>{movie.match} para ti</p>
                    <div className="icons" style={{ marginTop: '5px' }}>
                      <span style={{ width: '25px', height: '25px', fontSize: '10px' }}>▶</span>
                      <span style={{ width: '25px', height: '25px', fontSize: '10px' }}>＋</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* === SECCIÓN DE PLANES === */}
      <section style={{ background: 'linear-gradient(to bottom, #141414, #000)', padding: '60px 20px', textAlign: 'center', borderTop: '4px solid #222' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Selecciona tu Plan</h2>
        <p style={{ color: '#999', marginBottom: '40px' }}>Disfruta de la mejor calidad sin límites.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ 
              background: 'linear-gradient(145deg, #1f1f1f, #141414)', 
              padding: '30px', 
              borderRadius: '12px', 
              width: '100%', 
              maxWidth: '280px',
              border: `1px solid ${plan.color}`,
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ background: plan.color, color: 'white', padding: '5px 10px', position: 'absolute', top: 0, right: 0, fontSize: '12px', fontWeight: 'bold', borderBottomLeftRadius: '8px' }}>
                {plan.resolution}
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{plan.name}</h3>
              <h4 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>{plan.price}<span style={{ fontSize: '14px', fontWeight: 'normal' }}>/mes</span></h4>
              
              <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '30px', color: '#ccc', lineHeight: '2' }}>
                <li>✓ Calidad de video: <span style={{ color: '#fff' }}>{plan.quality}</span></li>
                <li>✓ Resolución: <span style={{ color: '#fff' }}>{plan.resolution}</span></li>
                <li>✓ Dispositivos: <span style={{ color: '#fff' }}>{plan.devices}</span></li>
                <li>✓ Sin anuncios</li>
              </ul>

              <button style={{ 
                width: '100%', 
                padding: '12px', 
                background: plan.color, 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                Elegir Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* === CARRUSEL AUTOMÁTICO WIDE (RECTANGULAR) - AL FINAL === */}
      <section style={{ padding: '20px 0', overflow: 'hidden' }}>
        <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold', color: '#e5e5e5', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', padding: '0 4%' }}>
          Originales de Cloneflix
        </h2>
        <div
          ref={wideCarouselRef}
          className="movie-row"
          style={{
            display: 'flex',
            gap: '15px',
            overflowX: 'auto',
            padding: '20px 4%',
            scrollbarWidth: 'none', // Oculta la barra de scroll
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          {[...trendingNow, ...trendingNow].map((movie, index) => ( // Duplicamos para el efecto de bucle infinito
            <div
              key={`${movie.id}-${index}`}
              onClick={() => setSelectedMovie(movie)}
              style={{
                minWidth: '300px',
                height: '170px',
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease',
                flexShrink: 0,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '15px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === SECCIÓN DE AYUDA / CONTACTO === */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(to top, #000, #111)', borderTop: '1px solid #222' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>¿Tienes preguntas? Estamos aquí.</h2>
        <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '30px' }}>Encuentra respuestas, contacta soporte y más.</p>
        <button 
          onClick={() => navigate('/contact')}
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.2rem', 
            background: '#333', 
            color: '#fff', 
            border: '1px solid #666', 
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => { e.target.style.background = '#555'; e.target.style.borderColor = '#fff'; }}
          onMouseOut={(e) => { e.target.style.background = '#333'; e.target.style.borderColor = '#666'; }}
        >
          Ir al Centro de Ayuda
        </button>
      </section>

      {/* === MODAL DE DETALLES === */}
      {selectedMovie && (
        <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedMovie.image} alt={selectedMovie.title} />
            <div className="modal-content">
              <h2>{selectedMovie.title}</h2>
              <div className="movie-details">
                <span style={{ color: '#46d369' }}>{selectedMovie.match || "95%"} Coincidencia</span>
                <span>2024</span>
                <span>HD</span>
              </div>
              <p className="description">Esta es una película increíble que no te puedes perder. Acción, drama y suspenso en una sola producción.</p>
              <button className="hero-btn" onClick={() => setSelectedMovie(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
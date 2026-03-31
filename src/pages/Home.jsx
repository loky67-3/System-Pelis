import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Datos simulados (Mock Data)
const featuredMovie = {
  title: "DUNA: PARTE DOS",
  description: "Paul Atreides se une a Chani y a los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia. Al enfrentarse a una elección entre el amor de su vida y el destino del universo, lucha por evitar un futuro terrible.",
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
  { id: 110, title: "Un Lugar en Silencio: Día Uno", image: "https://image.tmdb.org/t/p/w500/YPY7J-flzE8.jpg" }
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

// Componente para los números del Top 10
const Top10Item = ({ movie, index, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative', 
        minWidth: '280px', 
        height: '220px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        marginRight: '30px',
        userSelect: 'none'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* El Número Gigante */}
      <span style={{ 
        fontSize: '300px', /* Aumentado ligeramente para compensar el zoom 0.75 */
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: '900', 
        color: '#000', 
        WebkitTextStroke: '6px #595959',
        textShadow: '0 0 20px rgba(0,0,0,0.5)',
        lineHeight: '0.85',
        position: 'absolute',
        left: '-25px',
        bottom: '-15px',
        zIndex: 1,
        letterSpacing: '-25px'
      }}>{index + 1}</span>
      
      {/* Poster que solapa al número */}
      <img 
        src={movie.image} 
        alt={movie.title} 
        style={{ 
          width: '140px', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '4px', 
          marginLeft: '85px',
          zIndex: 2,
          boxShadow: '10px 0 20px rgba(0,0,0,0.5)'
        }} 
      />
    </div>
  );
};

// Iconos SVG para los planes
const PlanIcons = {
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#46d369" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  Screen: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
  ),
  Quality: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  ),
  Devices: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="10" rx="2" ry="2"></rect><rect x="11" y="14" width="7" height="5" rx="1" ry="1"></rect><path d="M8 18h.01"></path></svg>
  )
};

const plans = [
  { 
    name: "Básico", 
    price: "99", 
    quality: "Buena calidad", 
    resolution: "720p (HD)", 
    devices: "1 pantalla", 
    color: "#60a5fa" 
  },
  { 
    name: "Estándar", 
    price: "169", 
    quality: "Gran calidad", 
    resolution: "1080p (Full HD)", 
    devices: "2 pantallas", 
    color: "#e50914",
    popular: true 
  },
  { 
    name: "Premium", 
    price: "229", 
    quality: "Cine en casa", 
    resolution: "4K + HDR / Dolby Atmos", 
    devices: "4 pantallas", 
    color: "#fbbf24" 
  },
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
    <div className="netflix-page" style={{ overflowX: 'hidden', marginTop: '0' }}>
      {/* === HERO SECTION === */}
      <section
        className="hero-netflix"
        style={{
          height: '100vh',
          background: `linear-gradient(to right, #020617 15%, rgba(2, 6, 23, 0.2) 50%, rgba(2, 6, 23, 0) 100%), 
                       linear-gradient(to top, #020617 5%, rgba(2, 6, 23, 0) 30%), 
                       url("${featuredMovie.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <div className="hero-overlay" style={{ paddingLeft: '60px', paddingTop: '280px', background: 'none', maxWidth: '850px', zIndex: 25 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png" alt="N" style={{ height: '50px' }} />
            <span style={{ letterSpacing: '5px', fontWeight: '800', color: '#e5e5e5', fontSize: '18px' }}>PELÍCULA</span>
          </div>
          <h1 className="netflix-logo" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', marginBottom: '15px', color: '#fff', textShadow: '4px 4px 15px rgba(0,0,0,0.5)' }}>
            {featuredMovie.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Number_10_in_red_rounded_square.svg/200px-Number_10_in_red_rounded_square.svg.png" alt="10" style={{ height: '30px' }} />
              <span style={{ color: '#fff' }}>N.º 1 en películas hoy</span>
            </div>
          </div>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.4', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.4)', marginBottom: '30px' }}>
            {featuredMovie.description}
          </p>
        </div>
      </section>

      {/* === CATEGORÍAS DE PELÍCULAS === */}
      <div className="content-overlap" style={{ marginTop: '20px', background: 'transparent', position: 'relative', zIndex: '20' }}>
        
        {/* SECCIÓN TOP 10 (NÚMEROS) */}
        <section style={{ padding: '20px 4%', marginBottom: '20px' }}>
          <h2 className="section-title" style={{ fontSize: '26px', marginBottom: '15px', fontWeight: 'bold', color: '#e5e5e5', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Las 10 más populares en System hoy
          </h2>
          <div className="no-scrollbar" style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {trendingNow.slice(0, 10).map((movie, index) => (
              <Top10Item key={movie.id} movie={movie} index={index} onClick={() => setSelectedMovie(movie)} />
            ))}
          </div>
        </section>

        {categories.map((cat, index) => (
          <section key={index} className="movies-section" style={{ padding: '20px 4%', boxSizing: 'border-box' }}>
            <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold', color: '#e5e5e5' }}>
              {cat.title}
            </h2>

            <div className="movie-row" style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
              {cat.movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="movie-card" 
                  style={{ minWidth: '150px', transition: 'transform 0.3s' }} 
                  onClick={() => setSelectedMovie(movie)}
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
      <section style={{ padding: '100px 4%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '15px', letterSpacing: '-1px' }}>Elige el plan ideal para ti</h2>
        <p style={{ color: '#aaa', fontSize: '1.3rem', marginBottom: '60px' }}>Cambia o cancela tu plan en cualquier momento.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ 
              background: 'rgba(15, 23, 42, 0.6)', 
              backdropFilter: 'blur(12px)',
              padding: '40px 30px', 
              borderRadius: '24px', 
              width: '100%', 
              maxWidth: '320px',
              border: `2px solid ${plan.popular ? plan.color : 'rgba(255,255,255,0.1)'}`,
              boxShadow: plan.popular ? `0 0 40px ${plan.color}33` : '0 20px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              transition: 'transform 0.3s ease, border-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'default'
            }}>
              {plan.popular && (
                <div style={{ background: plan.color, color: '#fff', padding: '6px 20px', position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', fontWeight: '800', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Más Popular
                </div>
              )}
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px', color: plan.color }}>{plan.name}</h3>
              <div style={{ marginBottom: '30px' }}>
                <span style={{ fontSize: '48px', fontWeight: '900' }}>${plan.price}</span>
                <span style={{ color: '#aaa', fontSize: '18px' }}>/mes</span>
              </div>
              
              <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '40px', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', fontSize: '15px' }}><PlanIcons.Quality /> {plan.quality}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', fontSize: '15px' }}><PlanIcons.Screen /> {plan.resolution}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', fontSize: '15px' }}><PlanIcons.Devices /> {plan.devices}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#46d369' }}><PlanIcons.Check /> Sin anuncios</li>
              </ul>

              <button style={{ 
                width: '100%', 
                padding: '16px', 
                background: plan.popular ? plan.color : 'rgba(255,255,255,0.1)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '12px', 
                fontWeight: '800', 
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'filter 0.3s'
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
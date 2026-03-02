import { useAuth } from "../context/AuthContext";

export default function DashboardUser() {
  const { user } = useAuth();

  // Datos simulados para el ejemplo (Mock Data)
  const continueWatching = [
    { id: 1, title: "Stranger Things", img: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", progress: 70 },
    { id: 2, title: "The Mandalorian", img: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg", progress: 30 },
    { id: 3, title: "Peaky Blinders", img: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg", progress: 90 },
  ];

  const myList = [
    { id: 4, title: "Inception", img: "https://image.tmdb.org/t/p/w500/9gk7admal4zl604ZEfOgixzzMaZ.jpg" },
    { id: 5, title: "Interstellar", img: "https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHtMY4kHKDmGVf0.jpg" },
    { id: 6, title: "The Dark Knight", img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { id: 7, title: "Avengers: Endgame", img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
  ];

  return (
    <div className="dashboard-container">
      
      {/* === HEADER DEL PERFIL === */}
      <div className="dashboard-header">
        <img 
          src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
          alt="Avatar" 
          style={{ width: "100px", height: "100px", borderRadius: "50%", border: "4px solid #e50914" }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "5px", fontWeight: "bold" }}>
            Hola, {user?.displayName || "Cinéfilo"}
          </h1>
          <p style={{ color: "#aaa", fontSize: "1.1rem" }}>Miembro Premium • {user?.email}</p>
        </div>
        
        {/* Estadísticas */}
        <div className="dashboard-stats">
          <div>
            <h3 style={{ fontSize: "2rem", color: "#e50914", margin: 0 }}>124</h3>
            <span style={{ fontSize: "0.9rem", color: "#aaa", textTransform: "uppercase" }}>Horas Vistas</span>
          </div>
          <div>
            <h3 style={{ fontSize: "2rem", color: "#e50914", margin: 0 }}>28</h3>
            <span style={{ fontSize: "0.9rem", color: "#aaa", textTransform: "uppercase" }}>Películas</span>
          </div>
          <div>
            <h3 style={{ fontSize: "2rem", color: "#e50914", margin: 0 }}>12</h3>
            <span style={{ fontSize: "0.9rem", color: "#aaa", textTransform: "uppercase" }}>Reseñas</span>
          </div>
        </div>
      </div>

      {/* === CONTINUAR VIENDO === */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ borderLeft: "6px solid #e50914", paddingLeft: "15px", marginBottom: "25px", fontSize: "1.8rem" }}>
          Continuar Viendo
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
          {continueWatching.map(item => (
            <div key={item.id} style={{ position: "relative", cursor: "pointer", transition: "transform 0.3s", borderRadius: "10px", overflow: "hidden" }} 
                 onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"} 
                 onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
              <img src={item.img} alt={item.title} style={{ width: "100%", display: "block", opacity: "0.8" }} />
              
              {/* Barra de Progreso */}
              <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", background: "rgba(0,0,0,0.8)", padding: "15px" }}>
                <h4 style={{ marginBottom: "8px", fontSize: "1rem" }}>{item.title}</h4>
                <div style={{ background: "#555", height: "4px", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${item.progress}%`, background: "#e50914", height: "100%" }}></div>
                </div>
              </div>
              
              {/* Icono Play Hover */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s", background: "rgba(0,0,0,0.4)" }} 
                   onMouseOver={e => e.currentTarget.style.opacity = 1}>
                <span style={{ fontSize: "50px", filter: "drop-shadow(0 0 10px rgba(0,0,0,0.8))" }}>▶</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === MI LISTA Y TRAILERS === */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
        
        {/* Mi Lista */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <h2 style={{ borderLeft: "6px solid #e50914", paddingLeft: "15px", fontSize: "1.8rem" }}>Mi Lista</h2>
            <button style={{ background: "transparent", border: "1px solid #aaa", color: "#fff", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}>Ver todo</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "15px" }}>
            {myList.map(item => (
              <div key={item.id} style={{ borderRadius: "8px", overflow: "hidden", transition: "transform 0.2s", cursor: "pointer" }}
                   onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                   onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
            <div style={{ border: "2px dashed #333", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#555", cursor: "pointer", minHeight: "200px" }}>
              <span style={{ fontSize: "40px" }}>+</span>
              <span>Añadir</span>
            </div>
          </div>
        </section>

        {/* Trailer Destacado */}
        <section>
          <h2 style={{ borderLeft: "6px solid #e50914", paddingLeft: "15px", marginBottom: "25px", fontSize: "1.8rem" }}>Recomendado</h2>
          <div style={{ position: "relative", paddingTop: "150%", borderRadius: "15px", overflow: "hidden", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}>
             <iframe 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              src="https://www.youtube.com/embed/d9My665987w?autoplay=0&controls=1" 
              title="Trailer Recomendado" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

      </div>
    </div>
  );
}
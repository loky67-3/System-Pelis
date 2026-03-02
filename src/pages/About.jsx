import React, { useState } from 'react';

export default function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("movies");

  // Helper para obtener imágenes de pósters (usando Bing Images como fuente dinámica para el ejemplo)
  const getImage = (query, type) => `https://tse4.mm.bing.net/th?q=${encodeURIComponent(query + " " + type + " vertical")}&w=300&h=450&c=7&rs=1&p=0`;

  // Lista de 20 películas variadas: Cristianas, Historia, Tesla, Biblia y Épicas
  const allMovies = [
    { title: "La Pasión de Cristo", category: "Cristiana" },
    { title: "Dios no está muerto", category: "Cristiana" },
    { title: "Cuarto de Guerra", category: "Cristiana" },
    { title: "El Cielo es Real", category: "Cristiana" },
    { title: "Milagros del Cielo", category: "Cristiana" },
    { title: "La Cabaña", category: "Cristiana" },
    { title: "Vencedor", category: "Cristiana" },
    { title: "A Prueba de Fuego", category: "Cristiana" },
    { title: "Tesla: Master of Lightning", category: "Documental" },
    { title: "La Biblia: La Miniserie", category: "Documental" },
    { title: "Misterios de la Biblia", category: "Documental" },
    { title: "Nikola Tesla: El Genio", category: "Documental" },
    { title: "Afirmaciones de la Biblia", category: "Relax/Fe" },
    { title: "Gladiador", category: "Épica" },
    { title: "Corazón Valiente", category: "Épica" },
    { title: "Hasta el Último Hombre", category: "Bélica/Fe" },
    { title: "Inquebrantable", category: "Inspiradora" },
    { title: "Sonido de Libertad", category: "Drama" },
    { title: "Ben-Hur (2016)", category: "Clásica" },
    { title: "Los Diez Mandamientos", category: "Clásica" }
  ].map((m, i) => ({
    id: i,
    title: m.title,
    category: m.category,
    img: getImage(m.title, "pelicula poster"),
    // Genera un link de búsqueda en YouTube para "Ver Gratis"
    link: `https://www.youtube.com/results?search_query=${encodeURIComponent(m.title + " pelicula completa español")}`
  }));

  // Lista de Libros
  const allBooks = [
    { title: "El Caso de Cristo", category: "Evidencia/Legal", author: "Lee Strobel" },
    { title: "Mero Cristianismo", category: "Cristiana", author: "C.S. Lewis" },
    { title: "El Caso del Creador", category: "Evidencia", author: "Lee Strobel" },
    { title: "Mis Invenciones", category: "Tesla/Ciencia", author: "Nikola Tesla" },
    { title: "Evidencia que Exige un Veredicto", category: "Apologética", author: "Josh McDowell" },
    { title: "Darwin en el Banquillo", category: "Legal/Creación", author: "Phillip E. Johnson" },
    { title: "La Firma en la Célula", category: "Ciencia/Creación", author: "Stephen Meyer" },
    { title: "El Progreso del Peregrino", category: "Clásica", author: "John Bunyan" },
    { title: "Cartas del Diablo a su Sobrino", category: "Filosofía", author: "C.S. Lewis" },
    { title: "Una Vida con Propósito", category: "Crecimiento", author: "Rick Warren" },
    { title: "Fe Razonable", category: "Filosofía", author: "William Lane Craig" },
    { title: "El Arrepentimiento", category: "Teología", author: "Thomas Watson" },
    { title: "Levítico: Santidad", category: "Estudio Bíblico", author: "Varios" },
    { title: "Tesla: Hombre fuera de tiempo", category: "Biografía", author: "Margaret Cheney" }
  ].map((b, i) => ({
    id: i + 100,
    title: b.title,
    category: b.category,
    author: b.author,
    img: getImage(b.title, "libro portada"),
    link: `https://www.google.com/search?q=${encodeURIComponent(b.title + " libro leer online gratis pdf")}`
  }));

  const currentList = activeTab === "movies" ? allMovies : allBooks;

  // Filtrar películas según la búsqueda
  const filteredContent = currentList.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#141414', minHeight: '100vh', padding: '40px 5%', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header y Buscador */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#e50914', fontWeight: 'bold' }}>Catálogo Especial</h1>
          <p style={{ color: '#ccc', marginBottom: '30px', fontSize: '1.2rem' }}>
            Explora nuestra colección de películas y libros seleccionados para ti.
          </p>
          
          <input 
            type="text" 
            placeholder="Buscar película, documental o categoría..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '15px 25px',
              width: '100%',
              maxWidth: '600px',
              borderRadius: '30px',
              border: '1px solid #333',
              background: '#1f1f1f',
              color: '#fff',
              fontSize: '1.1rem',
              outline: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
          />

          {/* Tabs de Navegación */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            <button 
              onClick={() => setActiveTab("movies")}
              style={{
                padding: '10px 30px',
                background: activeTab === "movies" ? '#e50914' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                transition: 'all 0.3s'
              }}
            >
              Películas
            </button>
            <button 
              onClick={() => setActiveTab("books")}
              style={{
                padding: '10px 30px',
                background: activeTab === "books" ? '#e50914' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                transition: 'all 0.3s'
              }}
            >
              Libros
            </button>
          </div>
        </div>

        {/* Grid de Películas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '30px' 
        }}>
          {filteredContent.map((item) => (
            <div key={item.id} style={{ 
              background: '#1f1f1f', 
              borderRadius: '10px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ height: '320px', overflow: 'hidden' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#46d369', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.category}</span>
                  <h3 style={{ fontSize: '1.1rem', margin: '5px 0 5px', lineHeight: '1.3' }}>{item.title}</h3>
                  {item.author && <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '15px' }}>{item.author}</p>}
                </div>
                
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    background: '#e50914',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    marginTop: 'auto'
                  }}
                >
                  {activeTab === "movies" ? "Ver Gratis" : "Buscar Libro"}
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#777' }}>
            <h2>No se encontraron resultados</h2>
            <p>Intenta buscar por otro nombre, autor o categoría.</p>
          </div>
        )}

      </div>
    </div>
  );
}
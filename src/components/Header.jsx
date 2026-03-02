import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Asegúrate que coincida con el nombre del archivo
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role } = useAuth(); // Usamos el usuario y rol desde el contexto global
  const navigate = useNavigate();

  // Efecto para cambiar el fondo del header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="header-container">
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(15px, 4vw, 50px)" }}>
          {/* LOGO */}
          <Link to="/" className="logo">
            SYSPELIS
          </Link>

          {/* NAV PRINCIPAL (Desktop) */}
          <nav className="nav main-nav-desktop">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/register">Trailers</NavLink>
            <NavLink to="/contact">Ayuda</NavLink>
            <NavLink to="/about">Sobre Mí</NavLink>
          </nav>
        </div>

        <div className="header-right">
          {/* NAV DERECHA (AUTH & PERFIL) */}
          <nav className="nav auth-nav">
            {/* SI NO ESTÁ LOGEADO */}
            {!user && <NavLink to="/login">Iniciar Sesión</NavLink>}

            {/* SI ESTÁ LOGEADO (MENÚ DE PERFIL) */}
            {user && (
              <div className="profile-dropdown">
                <img src={user.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'} alt="Perfil" className="profile-avatar" />
                <span className="dropdown-arrow">▾</span>
                <div className="dropdown-menu">
                  <NavLink to="/user">Cuenta</NavLink>
                  {role === 'admin' && <NavLink to="/admin">Panel Admin</NavLink>}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', margin: '5px 0' }}></div>
                  <button className="logout-btn" onClick={logout}>Cerrar sesión</button>
                </div>
              </div>
            )}
          </nav>

          {/* Botón de Hamburguesa */}
          <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Menú para Móvil */}
      <nav className="mobile-nav">
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
        <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Trailers</NavLink>
        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Ayuda</NavLink>
        <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>Sobre Mí</NavLink>
      </nav>
    </header>
  );
}
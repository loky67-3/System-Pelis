import { auth, db } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  const loginGoogle = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      let userRole = "user"; // Rol por defecto

      // 🔥 LÓGICA ROBUSTA: Determinar el rol ANTES de navegar.
      // Primero, la regla infalible para el admin.
      if (user.email === "carlosoficcial42@gmail.com") {
        userRole = "admin";
      } else {
        // Para otros usuarios, intentar leer el rol de la base de datos.
        try {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            userRole = docSnap.data().role || "user";
          } else {
            // Si el usuario no existe en la DB, lo creamos.
            await setDoc(userRef, {
              name: user.displayName, email: user.email, role: "user", createdAt: new Date()
            });
          }
        } catch (dbError) {
          console.warn("Aviso: Firestore offline. Se continuará como usuario estándar.", dbError.message);
          // Si la base de datos falla, no bloqueamos el login, continuamos como 'user'.
        }
      }

      // 🔥 REDIRECCIÓN SEGURA: Navegar al dashboard correspondiente.
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }

    } catch (error) {
      console.error("Error Google:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError("Cancelaste el inicio de sesión.");
      } else if (error.code === 'auth/popup-blocked') {
        setError("El navegador bloqueó la ventana. Permite los pop-ups.");
      } else if (error.code === 'auth/unauthorized-domain') {
        setError("Dominio no autorizado. Agrega tu URL en Firebase Authentication > Settings > Authorized Domains.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-container">
      {/* Capa oscura para resaltar el formulario */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}></div>

      <div style={{ 
        position: 'relative',
        zIndex: 1,
        background: 'rgba(0,0,0,0.75)', 
        padding: 'clamp(30px, 5vw, 60px)', 
        borderRadius: '8px', 
        width: '450px', 
        maxWidth: '90%',
        boxShadow: '0 15px 40px rgba(0,0,0,0.7)'
      }}>
        <h1 style={{ marginBottom: '20px', fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>Inicia Sesión</h1>
        
        <p style={{ color: '#ccc', marginBottom: '30px', fontSize: '16px' }}>
          Disfruta de películas, series y mucho más sin límites.
        </p>

        <button 
          onClick={loginGoogle} 
          disabled={isLoggingIn}
          style={{ 
            width: '100%', 
            padding: '16px', 
            background: '#fff', 
            color: '#333', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          {isLoggingIn ? "Conectando..." : "Acceder con Google"}
        </button>
        {error && <p style={{ color: "#e87c03", marginTop: "15px", fontSize: "14px" }}>{error}</p>}

        <div style={{ marginTop: '40px', color: '#737373', fontSize: '14px' }}>
          ¿Primera vez en Cloneflix? <span style={{ color: '#fff', cursor: 'pointer' }}>Suscríbete ahora</span>.
          <br /><br />
          Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
        </div>
      </div>
    </div>
  );
}
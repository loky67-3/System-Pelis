import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, role: requiredRole }) {
  const { user, role: userRole, loading } = useAuth();

  // 1. Mientras Firebase determina el estado de autenticación inicial, muestra un spinner.
  // Modificación: Si ya hay usuario, permitimos continuar aunque loading sea true (para evitar bloqueo si falla Firestore)
  if (loading && !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#000" }}>
        <div className="loading-spinner"></div>
        <style>{`
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(229, 9, 20, 0.3);
            border-top: 5px solid #e50914;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // 2. Si la carga terminó y no hay usuario, redirige a la página de login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si hay un usuario, verificamos la autorización para la ruta.
  const isAdmin = user.email === "carlosoficcial42@gmail.com" || userRole === 'admin';

  if (requiredRole === 'admin') {
    // Si la ruta es para admin, solo el admin puede entrar.
    return isAdmin ? children : <Navigate to="/user" replace />;
  }

  if (requiredRole === 'user') {
    // Si la ruta es para usuario, un admin es redirigido a su propio panel.
    return isAdmin ? <Navigate to="/admin" replace /> : children;
  }

  return children;
}
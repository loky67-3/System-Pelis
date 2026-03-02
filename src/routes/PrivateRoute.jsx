import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, role: requiredRole }) {
  const { user, role: userRole, loading } = useAuth();

  // 1. Mientras se verifica el usuario, muestra un mensaje de carga
  if (loading) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "40px" }}>
        Verificando acceso...
      </div>
    );
  }

  // 2. Si no hay usuario o el rol no es el requerido, redirige al login
  if (!user || userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si el usuario está logueado y tiene el rol correcto, muestra el contenido
  return children;
}
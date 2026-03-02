import { useAuth } from "../context/AuthContext";

export default function DashboardUser() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 40 }}>
      <h1>🎬 Dashboard Usuario</h1>
      <p>Bienvenido {user?.displayName || user?.email}</p>

      <ul>
        <li>📽️ Ver películas</li>
        <li>⭐ Favoritos</li>
        <li>⚙️ Configuración</li>
      </ul>
    </div>
  );
}
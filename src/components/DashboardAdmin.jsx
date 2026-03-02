import { useAuth } from "../context/AuthContext";

export default function DashboardAdmin() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 40 }}>
      <h1>🛠️ Dashboard Admin</h1>
      <p>Administrador: {user?.email}</p>

      <ul>
        <li>👥 Gestionar usuarios</li>
        <li>🎞️ Subir películas</li>
        <li>📊 Estadísticas</li>
      </ul>
    </div>
  );
}
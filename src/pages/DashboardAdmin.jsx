import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardAdmin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for stats
  const stats = [
    { title: "Usuarios Totales", value: usersList.length || 1250, icon: "👥", color: "#46d369" },
    { title: "Películas Activas", value: "342", icon: "🎬", color: "#e50914" },
    { title: "Nuevas Suscripciones", value: "+24", icon: "📈", color: "#337ab7" },
    { title: "Ingresos Mensuales", value: "$12,450", icon: "💰", color: "#f5a623" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (usersData.length > 0) {
            setUsersList(usersData);
        } else {
             throw new Error("Empty");
        }
      } catch (error) {
        // Mock data si falla la conexión o está vacía para que veas el diseño
        setUsersList([
          { id: 1, email: "juan.perez@gmail.com", role: "user", createdAt: { seconds: 1672531200 } },
          { id: 2, email: "maria.gonzalez@hotmail.com", role: "user", createdAt: { seconds: 1675123200 } },
          { id: 3, email: "admin@cloneflix.com", role: "admin", createdAt: { seconds: 1677628800 } },
          { id: 4, email: "carlos.dev@tech.com", role: "user", createdAt: { seconds: 1680307200 } },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header Dashboard */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Panel de Administración</h1>
          <p style={{ color: "#aaa" }}>Bienvenido de nuevo, {user?.email}</p>
        </div>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
           <button onClick={() => setActiveTab("overview")} style={tabStyle(activeTab === "overview")}>Resumen</button>
           <button onClick={() => setActiveTab("users")} style={tabStyle(activeTab === "users")}>Usuarios</button>
           <button onClick={() => setActiveTab("content")} style={tabStyle(activeTab === "content")}>Contenido</button>
        </div>
      </div>

      {/* CONTENT SWITCHER */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ background: "#1f1f1f", padding: "25px", borderRadius: "10px", borderTop: `4px solid ${stat.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h3 style={{ color: "#aaa", fontSize: "0.9rem", textTransform: "uppercase" }}>{stat.title}</h3>
                <span style={{ fontSize: "1.5rem" }}>{stat.icon}</span>
              </div>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "users" && (
        <div style={{ background: "#1f1f1f", padding: "30px", borderRadius: "10px" }}>
          <h2 style={{ marginBottom: "20px", borderLeft: "5px solid #e50914", paddingLeft: "15px" }}>Usuarios Registrados</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333", textAlign: "left" }}>
                  <th style={{ padding: "15px", color: "#aaa" }}>Usuario / Email</th>
                  <th style={{ padding: "15px", color: "#aaa" }}>Rol</th>
                  <th style={{ padding: "15px", color: "#aaa" }}>Fecha Registro</th>
                  <th style={{ padding: "15px", color: "#aaa" }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ padding: "15px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#e50914", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                                {u.email ? u.email[0].toUpperCase() : "U"}
                            </div>
                            {u.email}
                        </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                        <span style={{ 
                            background: u.role === 'admin' ? 'rgba(229, 9, 20, 0.2)' : 'rgba(70, 211, 105, 0.2)', 
                            color: u.role === 'admin' ? '#e50914' : '#46d369',
                            padding: "5px 10px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold"
                        }}>
                            {u.role ? u.role.toUpperCase() : "USER"}
                        </span>
                    </td>
                    <td style={{ padding: "15px", color: "#ccc" }}>
                        {u.createdAt?.seconds ? new Date(u.createdAt.seconds * 1000).toLocaleDateString() : "Reciente"}
                    </td>
                    <td style={{ padding: "15px" }}>
                        <span style={{ color: "#46d369" }}>● Activo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "content" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            <div style={{ background: "#1f1f1f", padding: "30px", borderRadius: "10px" }}>
                <h2 style={{ marginBottom: "20px", borderLeft: "5px solid #e50914", paddingLeft: "15px" }}>Agregar Nueva Película</h2>
                <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Título de la película" style={inputStyle} />
                    <input type="text" placeholder="URL de la imagen (Poster)" style={inputStyle} />
                    <select style={inputStyle}>
                        <option>Seleccionar Categoría</option>
                        <option>Tendencias</option>
                        <option>Nuevos Lanzamientos</option>
                        <option>Originales</option>
                    </select>
                    <textarea placeholder="Descripción / Sinopsis" rows="4" style={inputStyle}></textarea>
                    <button style={{ padding: "15px", background: "#e50914", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }}>
                        Publicar Contenido
                    </button>
                </form>
            </div>
            
            <div style={{ background: "#1f1f1f", padding: "30px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", border: "2px dashed #333" }}>
                <span style={{ fontSize: "50px", marginBottom: "20px" }}>📤</span>
                <h3>Arrastra y suelta archivos aquí</h3>
                <p style={{ color: "#aaa", marginBottom: "20px" }}>Sube posters o trailers directamente</p>
                <button style={{ padding: "10px 20px", background: "#333", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Seleccionar Archivos
                </button>
            </div>
        </div>
      )}

    </div>
  );
}

const tabStyle = (isActive) => ({
    padding: "10px 20px",
    background: isActive ? "#e50914" : "transparent",
    color: "#fff",
    border: isActive ? "none" : "1px solid #333",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s",
    fontWeight: "bold"
});

const inputStyle = {
    padding: "15px",
    background: "#141414",
    border: "1px solid #333",
    borderRadius: "5px",
    color: "#fff",
    outline: "none"
};
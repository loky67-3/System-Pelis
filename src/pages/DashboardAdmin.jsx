import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function DashboardAdmin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Para ver detalles

  // Mock data for stats
  const stats = [
    { title: "Usuarios Totales", value: usersList.length || 1250, icon: "👥", color: "linear-gradient(135deg, #46d369 0%, #2e8b46 100%)" },
    { title: "Películas Activas", value: "342", icon: "🎬", color: "linear-gradient(135deg, #e50914 0%, #b20710 100%)" },
    { title: "Nuevas Suscripciones", value: "+24", icon: "📈", color: "linear-gradient(135deg, #337ab7 0%, #204d74 100%)" },
    { title: "Ingresos Mensuales", value: "$12,450", icon: "💰", color: "linear-gradient(135deg, #f5a623 0%, #b87b12 100%)" },
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
          { id: 1, name: "Juan Perez", email: "juan.perez@gmail.com", role: "user", photoURL: "https://randomuser.me/api/portraits/men/32.jpg", createdAt: { seconds: 1672531200 } },
          { id: 2, name: "Maria Gonzalez", email: "maria.gonzalez@hotmail.com", role: "user", photoURL: "https://randomuser.me/api/portraits/women/44.jpg", createdAt: { seconds: 1675123200 } },
          { id: 3, name: "Admin Principal", email: "admin@cloneflix.com", role: "admin", photoURL: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png", createdAt: { seconds: 1677628800 } },
          { id: 4, name: "Carlos Dev", email: "carlos.dev@tech.com", role: "user", photoURL: null, createdAt: { seconds: 1680307200 } },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Funciones para eliminar usuario
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        // Intenta borrar de Firestore (si tienes permisos)
        // await deleteDoc(doc(db, "users", userToDelete.id)); 
        
        // Actualiza la lista localmente
        setUsersList(usersList.filter(u => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el usuario.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header Dashboard */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", background: "linear-gradient(to right, #fff, #aaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Panel de Administración</h1>
          <p style={{ color: "#aaa", fontSize: "1.1rem" }}>Bienvenido, <span style={{ color: "#e50914", fontWeight: "bold" }}>{user?.email}</span></p>
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
            <div key={index} style={{ background: "#1f1f1f", padding: "25px", borderRadius: "15px", position: "relative", overflow: "hidden", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: stat.color }}></div>
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
        <div style={{ background: "#1f1f1f", padding: "30px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
          <h2 style={{ marginBottom: "20px", borderLeft: "5px solid #e50914", paddingLeft: "15px" }}>Usuarios Registrados</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333", textAlign: "left" }}>
                  <th style={{ padding: "15px", color: "#aaa" }}>Usuario</th>
                  <th style={{ padding: "15px", color: "#aaa" }}>Rol</th>
                  <th style={{ padding: "15px", color: "#aaa" }}>Fecha Registro</th>
                  <th style={{ padding: "15px", color: "#aaa" }}>Estado</th>
                  <th style={{ padding: "15px", color: "#aaa", textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #2a2a2a", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "#252525"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "15px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <img 
                              src={u.photoURL || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
                              alt="Avatar" 
                              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "2px solid #333" }}
                            />
                            <div>
                              <div style={{ fontWeight: "bold", color: "#fff" }}>{u.name || "Usuario"}</div>
                              <div style={{ fontSize: "0.85rem", color: "#aaa" }}>{u.email}</div>
                            </div>
                        </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                        <span style={{ 
                            background: u.role === 'admin' 
                              ? 'linear-gradient(90deg, rgba(229, 9, 20, 0.2), rgba(229, 9, 20, 0.1))' 
                              : 'linear-gradient(90deg, rgba(70, 211, 105, 0.2), rgba(70, 211, 105, 0.1))', 
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
                    <td style={{ padding: "15px", textAlign: "right" }}>
                        <button onClick={() => setSelectedUser(u)} style={{ background: "transparent", border: "1px solid #555", color: "#fff", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}>
                          Ver
                        </button>
                        <button onClick={() => handleDeleteClick(u)} style={{ background: "rgba(229, 9, 20, 0.1)", border: "1px solid #e50914", color: "#e50914", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}>
                          Eliminar
                        </button>
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
            <div style={{ background: "#1f1f1f", padding: "30px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
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
                    <button style={{ padding: "15px", background: "#e50914", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", marginTop: "10px", transition: "transform 0.2s" }} onMouseOver={(e) => e.target.style.transform = "scale(1.02)"} onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                        Publicar Contenido
                    </button>
                </form>
            </div>
            
            <div style={{ background: "#1f1f1f", padding: "30px", borderRadius: "15px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", border: "2px dashed #444", transition: "border-color 0.3s" }}>
                <span style={{ fontSize: "50px", marginBottom: "20px" }}>📤</span>
                <h3>Arrastra y suelta archivos aquí</h3>
                <p style={{ color: "#aaa", marginBottom: "20px" }}>Sube posters o trailers directamente</p>
                <button style={{ padding: "10px 20px", background: "#333", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Seleccionar Archivos
                </button>
            </div>
        </div>
      )}

      {/* === MODAL DE CONFIRMACIÓN DE ELIMINAR === */}
      {showDeleteModal && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ color: "#e50914", marginBottom: "15px" }}>⚠️ Eliminar Usuario</h2>
            <p style={{ marginBottom: "20px", color: "#ccc" }}>¿Estás seguro de que deseas eliminar a <strong>{userToDelete?.email}</strong>? Esta acción no se puede deshacer.</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ padding: "10px 20px", background: "transparent", border: "1px solid #555", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>Cancelar</button>
              <button onClick={confirmDelete} style={{ padding: "10px 20px", background: "#e50914", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Sí, Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL DE DETALLES DE USUARIO === */}
      {selectedUser && (
        <div style={modalBackdropStyle} onClick={() => setSelectedUser(null)}>
          <div style={{ ...modalContentStyle, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
              alt="Perfil Grande" 
              style={{ width: "120px", height: "120px", borderRadius: "50%", border: "4px solid #e50914", marginBottom: "20px", objectFit: "cover" }}
            />
            <h2 style={{ fontSize: "2rem", marginBottom: "5px" }}>{selectedUser.name || "Usuario Sin Nombre"}</h2>
            <p style={{ color: "#aaa", marginBottom: "20px" }}>{selectedUser.email}</p>
            
            <div style={{ background: "#252525", padding: "15px", borderRadius: "8px", textAlign: "left", marginBottom: "20px" }}>
              <p><strong>ID:</strong> <span style={{ color: "#888", fontSize: "0.9rem" }}>{selectedUser.id}</span></p>
              <p><strong>Rol:</strong> <span style={{ color: selectedUser.role === 'admin' ? '#e50914' : '#46d369' }}>{selectedUser.role?.toUpperCase()}</span></p>
              <p><strong>Miembro desde:</strong> {selectedUser.createdAt?.seconds ? new Date(selectedUser.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}</p>
            </div>

            <button onClick={() => setSelectedUser(null)} style={{ width: "100%", padding: "12px", background: "#333", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cerrar</button>
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

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000
};

const modalContentStyle = {
  background: "#1f1f1f",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
};
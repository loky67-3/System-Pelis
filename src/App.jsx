import Header from "./components/Header.jsx"
import AppRoutes from "./routes/AppRoutes.jsx"
import Footer from "./components/Footer.jsx" // ✅ IMPORTANTE
import "./index.css"


export default function App() {
  return (
    <div className="app-container">
      {/* 1. Header siempre arriba */}
      <Header />
      
      {/* 2. Contenido principal (Aquí se carga Home.jsx) */}
      <main className="main-content">
        <AppRoutes />
      </main>

      {/* 3. Footer siempre abajo */}
      <Footer />
    </div>
  )
}
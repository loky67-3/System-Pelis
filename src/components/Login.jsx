import { auth, googleProvider, db } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
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
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      let role = "user";

      if (!snap.exists()) {
        await setDoc(ref, {
          name: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      } else {
        role = snap.data().role;
      }

      // 🔥 REDIRECCIÓN CORRECTA
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
      setError("No se pudo iniciar sesión. Por favor, intenta de nuevo.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-container">
      <button onClick={loginGoogle} disabled={isLoggingIn}>
        {isLoggingIn ? "Iniciando sesión..." : "Entrar con Google"}
      </button>
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
    </div>
  );
}
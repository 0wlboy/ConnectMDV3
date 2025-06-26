import { createRoot } from "react-dom/client";
import "./assets/CSS/index.css";
import App  from "./App.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx"; // Importar el proveedor de autenticación
import { createContext, useState } from "react";

export const RecoveryContext = createContext();

const root = createRoot(document.getElementById("root"));

// Componente wrapper para el provider, si prefieres mantener main.jsx limpio
// o puedes poner esta lógica directamente en App.jsx si es más conveniente.
const AppWrapper = () => {
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryOtp, setRecoveryOtp] = useState(null);

  return (
    <RecoveryContext.Provider value={{ email: recoveryEmail, setEmail: setRecoveryEmail, otp: recoveryOtp, setOtp: setRecoveryOtp }}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RecoveryContext.Provider>
  );
};

root.render(
  <>
    <AppWrapper />
  </>
);

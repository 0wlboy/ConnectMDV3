import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useAuth } from "./components/context/AuthContext.jsx";
import { MDList, Login, ClientRegister, RolPicker,  ProfRegister } from "./pages/exporter.js";

function App() {
  const { isAuthenticated, userRole } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<MDList />} />
        {/* Rutas que no puedes acceder si ya has iniciado sesion*/}
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/clientRegister" element={<ClientRegister />} />
            <Route path="/rolPicker" element={<RolPicker />} />
            <Route path="/profRegister" element={<ProfRegister />} />
          </>
        )}
        {/* Rutas protegidas */}
        {isAuthenticated && userRole === "client" && <></>}
        {isAuthenticated && userRole === "prof" && <></>}
        {isAuthenticated && userRole === "admin" && <></>}
      </Routes>
    </Router>
  );
}

export default App;

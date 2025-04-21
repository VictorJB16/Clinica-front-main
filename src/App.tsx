// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserSessionStore } from './store/UseUserSession';
import { LoginPage } from './pages/public/LoginPage';
import { AddCitaPage } from './pages/private/AddCitaPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { CitasPaciente } from './pages/private/CitasPaciente';
import { CitasAdmin } from './pages/private/CitasAdmin';

const App = () => {
  const { token } = useUserSessionStore(state => state);
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <RegisterPage />}
        />

        <Route
          path="/"
          element={token ? <AddCitaPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/citas-paciente"
          element={token ? <CitasPaciente /> : <Navigate to="/login" />}
        />

        <Route
          path="/citas-admin"
          element={token ? <CitasAdmin /> : <Navigate to="/login" />}
        />

        <Route
          path="/*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
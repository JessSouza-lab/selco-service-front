import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Cursos from "./pages/Cursos";
import AulaPlayer from "./pages/AulaPlayer";
import AdminDashboard from "./pages/AdminDashboard";
import Ranking from "./pages/Ranking";
import StatusUsuario from "./pages/StatusUsuario";

const PrivateRoute = ({ children, roleRequired }) => {
  const { authenticated, loading, user } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;
  if (!authenticated) return <Navigate to="/login" />;
  
  if (roleRequired && user.role !== roleRequired) {
     return <Navigate to="/cursos" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cursos" element={<PrivateRoute><Cursos /></PrivateRoute>} />
          <Route path="/aula/:id" element={<PrivateRoute><AulaPlayer /></PrivateRoute>} />
          <Route path="/ranking" element={<PrivateRoute><Ranking /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><StatusUsuario /></PrivateRoute>} />
          <Route path="/admin" element={
            <PrivateRoute roleRequired="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./Forms.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Acesso SELCO</h2>
        <input 
          type="email" 
          placeholder="Seu e-mail corporativo" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-primary">Entrar</button>
        <p>Não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
        <p className="forgot-pass">Esqueci minha senha</p>
      </form>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "", email: "", departamento: "", senha: "", confirmacao: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmacao) {
      alert("As senhas não conferem!");
      return;
    }
    if (formData.senha.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    try {
      await api.post("/auth/register", {
        nome: formData.nome,
        email: formData.email,
        departamentoId: formData.departamento,
        senha: formData.senha
      });
      alert("Cadastro realizado! Faça login.");
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Novo Cadastro</h2>
        <input name="nome" placeholder="Nome Completo" onChange={handleChange} required />
        <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
        
        <select name="departamento" onChange={handleChange} required>
            <option value="">Selecione Departamento</option>
            <option value="1">TI</option>
            <option value="2">RH</option>
            <option value="3">Vendas</option>
        </select>

        <input name="senha" type="password" placeholder="Senha Forte" onChange={handleChange} required />
        <input name="confirmacao" type="password" placeholder="Confirmar Senha" onChange={handleChange} required />
        
        <button type="submit" className="btn-success">Criar Conta</button>
      </form>
    </div>
  );
};

export default Cadastro;
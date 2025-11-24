import React, { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [auditoria, setAuditoria] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const usersRes = await api.get("/admin/usuarios");
    setUsuarios(usersRes.data);

    const logsRes = await api.get("/admin/auditoria");
    setAuditoria(logsRes.data);
  };

  const alternarStatusUsuario = async (id, ativoAtual) => {
    await api.patch(`/admin/usuarios/${id}/status`, { ativo: !ativoAtual });
    carregarDados();
  };

  return (
    <div className="container">
      <h1>Painel Administrativo</h1>
      
      <div className="section">
        <h2>Gestão de Usuários</h2>
        <table>
          <thead>
            <tr><th>Nome</th><th>Email</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.ativo ? "Ativo" : "Bloqueado"}</td>
                <td>
                  <button onClick={() => alternarStatusUsuario(u.id, u.ativo)}>
                    {u.ativo ? "Bloquear" : "Desbloquear"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Auditoria e Logs</h2>
        <ul className="log-list">
          {auditoria.map(log => (
            <li key={log.id}>
              [{log.data}] <strong>{log.usuario}</strong> realizou: {log.acao}
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-primary">Exportar Relatórios PDF</button>
    </div>
  );
};

export default AdminDashboard;
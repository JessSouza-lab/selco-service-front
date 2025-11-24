import React, { useState } from "react";
import api from "../services/api";

const AulaPlayer = () => {
  const [etapa, setEtapa] = useState("VIDEO");
  const [respostas, setRespostas] = useState({});
  const finalizarVideo = () => {
    api.post("/gamificacao/xp", { acao: "ASSISTIR_AULA", valor: 10 });
    setEtapa("QUIZ");
  };

  const enviarProva = async () => {
    try {
      const res = await api.post("/cursos/prova/validar", { respostas });
      
      if (res.data.nota >= 7.0) {
        alert(`Parabéns! Nota: ${res.data.nota}. Certificado emitido.`);
        api.post("/gamificacao/xp", { acao: "CONCLUSAO_CURSO", valor: 500 });
      } else {
        alert(`Nota: ${res.data.nota}. Você precisa refazer a prova.`);
      }
    } catch (e) {
      alert("Erro ao enviar prova.");
    }
  };

  return (
    <div className="container">
      {etapa === "VIDEO" ? (
        <div className="video-player">
          <h2>Módulo 1: Introdução à Segurança</h2>
          <div style={{background: "#000", height: "300px", color: "#fff", display:"flex", alignItems:"center", justifyContent:"center"}}>
            [Player de Vídeo Simulado]
          </div>
          <button onClick={finalizarVideo} className="btn-primary mt-2">
            Marcar como Concluído
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          <h2>Avaliação Final (RN14)</h2>
          <p>1. Qual a importância do 2FA?</p>
          <input type="text" onChange={(e) => setRespostas({...respostas, q1: e.target.value})} />
          
          <button onClick={enviarProva} className="btn-success mt-2">
            Enviar Respostas
          </button>
        </div>
      )}
    </div>
  );
};

export default AulaPlayer;
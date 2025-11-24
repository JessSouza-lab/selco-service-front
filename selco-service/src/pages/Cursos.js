import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    api.get("/cursos").then(res => setCursos(res.data));
  }, []);

  const handleInscricao = async (cursoId) => {
    try {
      await api.post(`/cursos/${cursoId}/inscricao`);
      alert("Inscrição realizada com sucesso!");
      window.location.reload(); 
    } catch (error) {
      alert("Erro ao se inscrever.");
    }
  };

  return (
    <div className="container">
      <h1>Catálogo de Cursos</h1>
      <div className="grid-cursos">
        {cursos.map(curso => (
          <div key={curso.id} className="card-curso">
            <h3>{curso.titulo}</h3>
            <p>{curso.descricao}</p>
            <p><strong>Carga Horária:</strong> {curso.cargaHoraria}h</p>
            
            {curso.inscrito ? (
              <Link to={`/aula/${curso.id}`} className="btn-primary">Acessar Aula</Link>
            ) : (
              <button onClick={() => handleInscricao(curso.id)} className="btn-secondary">
                Inscrever-se
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cursos;
import React, { useState, useEffect } from 'react';

// Componente da Cartilha de Vacinação
const CartilhaVacinacao = ({ userId, userType }) => {
  // Estado para armazenar as vacinas
  const [vacinas, setVacinas] = useState([]);

  // Estado para rastrear o status de cada vacina (tomada ou não tomada)
  const [statusVacinas, setStatusVacinas] = useState({});

  // Efeito para carregar as vacinas ao montar o componente
  useEffect(() => {
    // Substitua isso pela lógica de chamada à API para obter as vacinas do usuário específico
    // Exemplo: fetch(`/api/vacinas?userId=${userId}`)
    //       .then(response => response.json())
    //       .then(data => setVacinas(data));

    // Exemplo de dados estáticos
    const vacinasData = [
      { id: 1, periodo: '1° ao 6° Mês', nome: 'Vacina 1' },
      { id: 2, periodo: '1° ao 6° Mês', nome: 'Vacina 2' },
      // ... Adicione mais vacinas para outros períodos
    ];

    // Se o tipo de usuário for médico, inicialize o status de todas as vacinas como não tomadas
    if (userType === 'medico') {
      const initialStatus = {};
      vacinasData.forEach((vacina) => {
        initialStatus[vacina.id] = false;
      });
      setStatusVacinas(initialStatus);
    }

    setVacinas(vacinasData);
  }, [userId, userType]);

  // Função para manipular o status da vacina (apenas para médicos)
  const handleStatusChange = (vacinaId) => {
    setStatusVacinas((prevStatus) => ({
      ...prevStatus,
      [vacinaId]: !prevStatus[vacinaId],
    }));
  };

  // Renderizar a lista de vacinas
  return (
    <div>
      <h1>Cartilha de Vacinação</h1>
      {vacinas.map((vacina) => (
        <div key={vacina.id}>
          <h2>{vacina.periodo}</h2>
          <p>{vacina.nome}</p>
          {userType === 'medico' && (
            <button onClick={() => handleStatusChange(vacina.id)}>
              {statusVacinas[vacina.id] ? 'Tomada' : 'Não Tomada'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CartilhaVacinacao;

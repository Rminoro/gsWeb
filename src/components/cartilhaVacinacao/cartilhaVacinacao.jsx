// // components/CartilhaVacinacao.js
// import { useState } from 'react';

// export default function CartilhaVacinacao({ userId, userType }) {
//   const [cartilhaVacinas, setCartilhaVacinas] = useState([]); // Estado local para armazenar as vacinas
//   const [novaVacina, setNovaVacina] = useState({ idVacina: '', dosesTomadas: 0 });

//   const handleAdicionarVacina = () => {
//     // Adiciona a nova vacina à lista de cartilhaVacinas
//     setCartilhaVacinas([...cartilhaVacinas, novaVacina]);
//     // Limpa o estado da nova vacina
//     setNovaVacina({ idVacina: '', dosesTomadas: 0 });
//   };

//   const handleAlterarDoses = (vacinaIndex, novasDoses) => {
//     // Atualiza as doses da vacina no índice especificado
//     const novasVacinas = [...cartilhaVacinas];
//     novasVacinas[vacinaIndex].dosesTomadas = novasDoses;
//     setCartilhaVacinas(novasVacinas);
//   };

//   // Somente renderiza se o usuário for do tipo 'medico'
//   if (userType !== 'medico') {
//     return null;
//   }

//   return (
//     <div>
//       <h2>Cartilha de Vacinação</h2>
//       <ul>
//         {cartilhaVacinas.map((vacina, index) => (
//           <li key={index}>
//             Vacina {vacina.idVacina}: {vacina.dosesTomadas} doses tomadas
//             <button onClick={() => handleAlterarDoses(index, vacina.dosesTomadas + 1)}>
//               +1 Dose
//             </button>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h3>Adicionar Nova Vacina</h3>
//         <label>ID da Vacina:</label>
//         <input
//           type="text"
//           value={novaVacina.idVacina}
//           onChange={(e) => setNovaVacina({ ...novaVacina, idVacina: e.target.value })}
//         />
//         <label>Doses Tomadas:</label>
//         <input
//           type="number"
//           value={novaVacina.dosesTomadas}
//           onChange={(e) => setNovaVacina({ ...novaVacina, dosesTomadas: parseInt(e.target.value) || 0 })}
//         />
//         <button onClick={handleAdicionarVacina}>Adicionar Vacina</button>
//       </div>
//     </div>
//   );
// }
// "use client"
// import { useEffect, useState } from 'react';  
// import CartilhaVacinacao from "@/components/cartilhaVacinacao/cartilhaVacinacao";

// export default function Cartilha() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [usuarios, setUsuarios] = useState([]);  // Adicionando o estado para a lista de usuários

//   useEffect(() => {
//     // Recupera as informações do usuário do SessionStorage
//     const storedUserInfo = sessionStorage.getItem("user-info");

//     // Se existirem informações do usuário, atualiza o estado
//     if (storedUserInfo) {
//       const parsedUserInfo = JSON.parse(storedUserInfo);
//       setUserInfo(parsedUserInfo);
//     }

//     // Carrega a lista de usuários
//     const fetchUsuarios = async () => {
//       try {
//         const response = await fetch('/api/base/db.json');
//         if (!response.ok) {
//           throw new Error(`Erro HTTP! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setUsuarios(data.usuarios);
//       } catch (error) {
//         console.error('Erro ao buscar usuários:', error.message);
//       }
//     };

//     fetchUsuarios();
//   }, []);



// }
"use client";
import { useEffect, useState } from 'react';
import CartilhaVacinacao from "@/components/cartilhaVacinacao/cartilhaVacinacao";

export default function Cartilha() {
  const [userInfo, setUserInfo] = useState(null);
  const [usuarios, setUsuarios] = useState([]);  
  const [selectedUser, setSelectedUser] = useState(null);  // Estado para o usuário selecionado
  const [searchTerm, setSearchTerm] = useState('');  // Estado para o termo de pesquisa
  const [vacinaInfo, setVacinaInfo] = useState({ idVacina: '', dosesTomadas: 0 });  // Estado para informações da vacina

  useEffect(() => {
    // Recupera as informações do usuário do SessionStorage
    const storedUserInfo = sessionStorage.getItem("user-info");

    // Se existirem informações do usuário, atualiza o estado
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }

    // Carrega a lista de usuários
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('/src/app/api/base/db.json');
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsuarios(data.usuarios);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para pesquisar usuários por ID ou nome
  const handleSearch = () => {
    const userFound = usuarios.find(user => user.id === searchTerm || user.nome.toLowerCase() === searchTerm.toLowerCase());
    if (userFound) {
      setSelectedUser(userFound);
    } else {
      setSelectedUser(null);
    }
  };

  // Função para adicionar/alterar vacina
  const handleAddAlterarVacina = () => {
    // Lógica para adicionar/alterar a vacina para o usuário selecionado
    // ...

    // Atualizar informações da vacina
    setVacinaInfo({ idVacina: '', dosesTomadas: 0 });
  };

  return (
    <div>
      <h1>NTJ Health - Cartilha</h1>
      <div>
        <label>Pesquisar Usuário por ID ou Nome:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      {selectedUser && (
        <div>
          <h2>Informações do Usuário</h2>
          <p>ID: {selectedUser.id}</p>
          <p>Nome: {selectedUser.nome}</p>
          <p>Email: {selectedUser.email}</p>

          <CartilhaVacinacao
            userId={selectedUser.id}
            userType={userInfo.type}
            // Outras props necessárias para a CartilhaVacinacao
          />

          <div>
            <h3>Adicionar/Alterar Vacina</h3>
            <label>ID da Vacina:</label>
            <input
              type="text"
              value={vacinaInfo.idVacina}
              onChange={(e) => setVacinaInfo({ ...vacinaInfo, idVacina: e.target.value })}
            />
            <label>Doses Tomadas:</label>
            <input
              type="number"
              value={vacinaInfo.dosesTomadas}
              onChange={(e) => setVacinaInfo({ ...vacinaInfo, dosesTomadas: parseInt(e.target.value) || 0 })}
            />
            <button onClick={handleAddAlterarVacina}>Adicionar/Alterar Vacina</button>
          </div>
        </div>
      )}
    </div>
  );
}

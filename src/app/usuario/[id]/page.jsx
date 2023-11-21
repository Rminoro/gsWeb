"use client";
import './style.css'; 
import { useEffect, useState } from "react";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [inputId, setInputId] = useState('');
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Resposta não contém JSON válido");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (typeof data === "object" && data !== null) {
        setUsers([data]);
      } else {
        console.error("Erro: Os dados não estão no formato esperado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
    }
  };

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleFetchData = () => {
    const url = inputId ? `http://localhost:3000/api/users/${inputId}` : `http://localhost:3000/api/users`;
    fetchData(url);
  };

  const handleShowAll = () => {
    const url = `http://localhost:3000/api/users/[id]`;
    fetchData(url);
  };

  return (
    <div className="user-table-container">
    <h1>Lista de Usuários</h1>
    <div className="search-bar">
      <label htmlFor="inputId">Insira o ID do Usuário: </label>
      <input
        type="text"
        id="inputId"
        value={inputId}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleFetchData}>Buscar Usuário</button>
      <button className="show-all-button" onClick={handleShowAll}>Mostrar Todos</button>
    </div>

    <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Vacinas</th> 
            {/* <th>Telefone</th> */}
          </tr>
        </thead>
        {/* <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.senha}</td>
             
            </tr>
          ))}
        </tbody> */}
        <tbody>
    {users.map((user, index) => (
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.senha}</td>
        <td>
  <ul>
    {user.cartilhaVacinas && user.cartilhaVacinas.map((vacina, vacinaIndex) => (
      <li key={vacinaIndex}>
        Vacina {vacina.idVacina}: {vacina.dosesTomadas} doses tomadas
      </li>
    ))}
  </ul>
</td>

      </tr>
    ))}
  </tbody>

        <tfoot>
          <tr>
            <td colSpan="5">Total de Usuários: {users.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// "use client";
// import './style.css'; 
// import { useEffect, useState } from "react";

// export default function UserTable() {
//   const [users, setUsers] = useState([]);
//   const [inputId, setInputId] = useState('');
//   const [showVacinas, setShowVacinas] = useState(false);
//   const [vacinas, setVacinas] = useState([]);
//   const [novaVacina, setNovaVacina] = useState({ idVacina: 0, dosesTomadas: 0 });

//   const fetchData = async (url) => {
//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`Erro HTTP! Status: ${response.status}`);
//       }

//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Resposta não contém JSON válido");
//       }

//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setUsers(data);
//       } else if (typeof data === "object" && data !== null) {
//         setUsers([data]);
//       } else {
//         console.error("Erro: Os dados não estão no formato esperado.");
//       }
//     } catch (error) {
//       console.error("Erro ao buscar dados:", error.message);
//     }
//   };

//   const fetchVacinas = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`);
//       if (!response.ok) {
//         throw new Error(`Erro HTTP! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       const cartilhaVacinas = data.cartilhaVacinas || [];

//       setVacinas(cartilhaVacinas);
//     } catch (error) {
//       console.error("Erro ao buscar dados de vacinas:", error.message);
//     }
//   };

//   const handleInputChange = (event) => {
//     setInputId(event.target.value);
//   };

//   const handleFetchData = () => {
//     const url = inputId ? `http://localhost:3000/api/usuarios/${inputId}` : `http://localhost:3000/api/usuarios`;
//     fetchData(url);
//   };

//   const handleShowVacinas = async (userId) => {
//     await fetchVacinas(userId);
//     setShowVacinas(true);
//   };

//   const handleVacinaClick = (userId) => {
//     handleShowVacinas(userId);
//   };

//   const handleNovaVacinaChange = (event) => {
//     const { name, value } = event.target;
//     setNovaVacina((prevVacina) => ({ ...prevVacina, [name]: value }));
//   };

//   const handleAdicionarVacina = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/usuarios/${inputId}/vacinas`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(novaVacina),
//       });

//       if (!response.ok) {
//         throw new Error(`Erro HTTP! Status: ${response.status}`);
//       }

//       // Atualiza as vacinas após a adição
//       await fetchVacinas(inputId);
//       setNovaVacina({ idVacina: 0, dosesTomadas: 0 });
//     } catch (error) {
//       console.error("Erro ao adicionar vacina:", error.message);
//     }
//   };

//   return (
//     <div className="user-table-container">
//       <h1>Lista de Usuários</h1>
//       <div className="search-bar">
//         <label htmlFor="inputId">Insira o ID do Usuário: </label>
//         <input
//           type="text"
//           id="inputId"
//           value={inputId}
//           onChange={handleInputChange}
//         />
//         <button className="search-button" onClick={handleFetchData}>Buscar Usuário</button>
//         <button className="show-all-button" onClick={handleShowVacinas}>Mostrar Vacinas</button>
//       </div>

//       <table className="user-table">
//         {/* ... Cabeçalho e corpo da tabela ... */}
//       </table>

//       {showVacinas && (
//         <div className="vacina-section">
//           <h2>Cartilha de Vacinas</h2>
//           <button onClick={() => setShowVacinas(false)}>Fechar</button>
//           <ul>
//             {vacinas.map((vacina, index) => (
//               <li key={index}>
//                 Vacina {vacina.idVacina}: {vacina.dosesTomadas} doses tomadas
//               </li>
//             ))}
//           </ul>

//           <h3>Adicionar Nova Vacina</h3>
//           <label htmlFor="idVacina">ID da Vacina:</label>
//           <input
//             type="number"
//             id="idVacina"
//             name="idVacina"
//             value={novaVacina.idVacina}
//             onChange={handleNovaVacinaChange}
//           />
//           <label htmlFor="dosesTomadas">Doses Tomadas:</label>
//           <input
//             type="number"
//             id="dosesTomadas"
//             name="dosesTomadas"
//             value={novaVacina.dosesTomadas}
//             onChange={handleNovaVacinaChange}
//           />
//           <button onClick={handleAdicionarVacina}>Adicionar Vacina</button>
//         </div>
//       )}
//     </div>
//   );
// }

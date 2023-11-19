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
            {/* <th>Telefone</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.senha}</td>
              {/* <td>{user.telefone}</td> */}
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
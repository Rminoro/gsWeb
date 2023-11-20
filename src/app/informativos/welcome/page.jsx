// "use client"
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     // Recupera as informações do usuário do SessionStorage
//     const storedUserInfo = sessionStorage.getItem("user-info");

//     // Se existirem informações do usuário, atualiza o estado
//     if (storedUserInfo) {
//       const parsedUserInfo = JSON.parse(storedUserInfo);
//       setUserInfo(parsedUserInfo);
//     }
//   }, []);

//   return (
//     <div>
//       <div className="container-home">
//         <div className="conteudo-home">
//           <h1>NTJ Health</h1>
//           {userInfo ? (
            
//             <p>Olá, {userInfo.nome}!</p>
//           ) : (
//             <p>;</p>
//           )}
         
//          <div>
//              <p> <Link href="/infomativos/cartilha">Cartilha de vacinação</Link></p>
//              <p> <Link href="/informativos/covid">COVID 19</Link></p>
//              <p> <Link href="/informativos/mortalidade">Mortalidade infantil</Link></p>
//              <p> <Link href="/informativos/vacinacao">Vacinacao</Link></p>
//             </div>
//         </div>
//       </div>
//       <div className="container-modelos">
//         <div></div>
//       </div>
//     </div>
//   );
// }
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Função para obter as informações do usuário do SessionStorage
    const getUserInfoFromSessionStorage = () => {
      const storedUserInfo = sessionStorage.getItem("user-info");

      // Se existirem informações do usuário, atualiza o estado
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      }
    };

    // Chama a função para obter as informações do usuário
    getUserInfoFromSessionStorage();

    // Adiciona um ouvinte para observar mudanças no SessionStorage
    window.addEventListener("storage", getUserInfoFromSessionStorage);

    // Remove o ouvinte quando o componente é desmontado
    return () => {
      window.removeEventListener("storage", getUserInfoFromSessionStorage);
    };
  }, []);

  return (
    <div>
      <div className="container-home">
        <div className="conteudo-home">
          <h1>NTJ Health</h1>
          {userInfo ? (
            <p>Olá, {userInfo.nome}!</p>
          ) : (
            <p>;</p>
          )}

          <div>
            <p> <Link href="/infomativos/cartilha">Cartilha de vacinação</Link></p>
            <p> <Link href="/informativos/covid">COVID 19</Link></p>
            <p> <Link href="/informativos/mortalidade">Mortalidade infantil</Link></p>
            <p> <Link href="/informativos/vacinacao">Vacinacao</Link></p>
          </div>
        </div>
      </div>
      <div className="container-modelos">
        <div></div>
      </div>
    </div>
  );
}

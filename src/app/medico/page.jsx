// "use client"
// import Image from "next/image";
// import Link from "next/link";
// import CartilhaVacinacao from "@/components/cartilhaVacinacao/cartilhaVacinacao";
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
//           <h1>NTJ Health médicos</h1>
//           {userInfo ? (
//             <p>Olá, {userInfo.nome}!</p>
//           ) : (
//             <p>;</p>
//           )}
//            {userInfo && userInfo.type === 'medico' && (
//             <CartilhaVacinacao userId="1" userType="medico" />
//           )}
  
//         </div>
//       </div>
//       <div className="container-modelos">
//         <div></div>
//       </div>
//     </div>
//   );
// }
// ... (seu código existente)

"use client"
export default function Home() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Recupera as informações do usuário do SessionStorage
    const storedUserInfo = sessionStorage.getItem("user-info");

    // Se existirem informações do usuário, atualiza o estado
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  const isMedico = userInfo && userInfo.type === 'medico';

  return (
    <div>
      <div className="container-home">
        <div className="conteudo-home">
          <h1>NTJ Health médicos</h1>
          {userInfo ? (
            <p>Olá, {userInfo.nome}!</p>
          ) : (
            <p>;</p>
          )}
          {isMedico && (
            <CartilhaVacinacao userId="78" userType="medico" />
          )}
        </div>
      </div>
      <div className="container-modelos">
        <div></div>
      </div>
    </div>
  );
}

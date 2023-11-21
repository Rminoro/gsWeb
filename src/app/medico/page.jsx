// "use client"
// import { useEffect, useState } from 'react';  // Importe o useState aqui
// import CartilhaVacinacao from "@/components/cartilhaVacinacao/cartilhaVacinacao";

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

//   const isMedico = userInfo && userInfo.type === 'medico';

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
//           {isMedico && (
//             <CartilhaVacinacao userId="78" userType="medico" />
//           )}
//         </div>
//       </div>
//       <div className="container-modelos">
//         <div></div>
//       </div>
//     </div>
//   );
// }
"use client"
import { useEffect, useState } from 'react';  
import CartilhaVacinacao from "@/components/cartilhaVacinacao/cartilhaVacinacao";


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
            <CartilhaVacinacao/>
          )}

      
        </div>
      </div>
      <div className="container-modelos">
        <div></div>
      </div>
    </div>
  );
}

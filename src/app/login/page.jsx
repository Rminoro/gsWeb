// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";


// export default function LoginUsers() {
//   //Mensage de STATUS!
//   const [msg, setMsg] = useState("");

//   //Redirecionamento:
//   const navigate = useRouter();
 
//   const [usuario, setUsuario] = useState({
//     info: "login",
//     email: "",
//     senha: "",
//     cpf:"",
//   });

//   //Preenchimento dos Campos!
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUsuario({ ...usuario, [name]: value });
//   };

//   //Envio das informações
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/base/base-user-api",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(usuario),
//         }
//       );

//       if (response.ok) {
        
//         const result = await response.json();
//           console.log("VALIDADO!!!!");
//         if (result.status) {
            
//                      //Gerando o TOKEN de acesso!
//           const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

//           //Armazenando o TOKEN no SessionStorage!
//           sessionStorage.setItem("token-user", token);

//           //Armazenando o objeto USUÁRIO no SessionStorage!
//           sessionStorage.setItem("user-info", JSON.stringify(result.user));

//             setMsg("Login efetuado com Sucesso!!");
//             setTimeout(()=>{
//                 setMsg("");
//                 //Redirecionando para a página HOME!
//                 window.location.href = "/informativos/welcome";
//             },5000);

//         }else{
            
//             setMsg("Login ou Senha incorretos!");
//             setTimeout(()=>{
//                 setMsg("");
//             },5000);

//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container-login">
//       <div className="login">
//         <h1>BEM-VINDO</h1>
//           <h2 className={msg == "Login efetuado com Sucesso!!" ? "msg-success-login":"msg-error-login"}>{msg}</h2>

//         <div className="form-login">
//           <form onSubmit={handleSubmit}>
            
//               <div className="email-input">
//                 <label htmlFor="idEmail">Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="idEmail"
//                   placeholder="Digite seu email."
//                   value={usuario.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="senha-input">
//                 <label htmlFor="idSenha">Senha:</label>
//                 <input
//                   type="password"
//                   name="senha"
//                   id="idSenha"
//                   placeholder="Digite sua senha."
//                   value={usuario.senha}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="container-button-login">
//                 <button>LOGIN</button>
//               </div>
//               <div className="login-texto p-5 m-auto w-2/4">
//                 <p>Se você não é cadastrado em nosso sistema, <Link href="/login/cad" className="text-amber-500 hover:text-amber-200">CLIQUE AQUI</Link> para se registrar.</p>
//               </div>
          
//           </form>
//           </div>
//       </div>
//     </div>
//   );
// }

"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginUsers() {
  const [msg, setMsg] = useState('');
  const navigate = useRouter();
  const [usuario, setUsuario] = useState({
    info: 'login',
    email: '',
    senha: '',
    cpf: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/base/base-user-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('VALIDADO!!!!');
        if (result.status) {
       
          const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    
          sessionStorage.setItem('token-user', token);

          sessionStorage.setItem('user-info', JSON.stringify(result.user));

          const userType = result.user.type; 

          if (userType === 'paciente') {

            navigate.push('/informativos/welcome');
          } else if (userType === 'medico') {
      
            navigate.push('/medico');
          }

          setMsg('Login efetuado com Sucesso!!');
          setTimeout(() => {
            setMsg('');
          }, 5000);
        } else {
          setMsg('Login ou Senha incorretos!');
          setTimeout(() => {
            setMsg('');
          }, 5000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-login">
      <div className="login">
        <h1>BEM-VINDO</h1>
        <h2 className={msg == 'Login efetuado com Sucesso!!' ? 'msg-success-login' : 'msg-error-login'}>{msg}</h2>

        <div className="form-login">
          <form onSubmit={handleSubmit}>
            <div className="email-input">
              <label htmlFor="idEmail">Email:</label>
              <input
                type="email"
                name="email"
                id="idEmail"
                placeholder="Digite seu email."
                value={usuario.email}
                onChange={handleChange}
              />
            </div>
            <div className="senha-input">
              <label htmlFor="idSenha">Senha:</label>
              <input
                type="password"
                name="senha"
                id="idSenha"
                placeholder="Digite sua senha."
                value={usuario.senha}
                onChange={handleChange}
              />
            </div>
            <div className="container-button-login">
              <button>LOGIN</button>
            </div>
            <div className="login-texto p-5 m-auto w-2/4">
              <p>
                Se você não é cadastrado em nosso sistema,{' '}
                <Link href="/login/cad" className="text-amber-500 hover:text-amber-200">
                  CLIQUE AQUI
                </Link>{' '}
                para se registrar.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function LoginUsers() {
//   const [msg, setMsg] = useState("");
//   const navigate = useRouter();
//   const [usuario, setUsuario] = useState({
//     info: "login",
//     email: "",
//     senha: "",
//     cpf: "",
//     type:"",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUsuario({ ...usuario, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/api/base/base-user-api", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(usuario),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("VALIDADO!!!!");
//         if (result.status) {
         
//           // Verificando o tipo de usuário
//           const userType = result.user.type; // Você deve ajustar isso conforme a estrutura de seus dados

//           // Redirecione com base no tipo de usuário
//           if (userType === "paciente") {
//             // Redirecionamento para pacientes
//             navigate.push("/informativos/welcome");
//           } else if(userType === "medico") {
//             // Redirecionamento para médicos
//             navigate.push("/medico");
//           };

//           setMsg("Login efetuado com Sucesso!!");
//           setTimeout(() => {
//             setMsg("");
//           }, 5000);
//         } else {
//           setMsg("Login ou Senha incorretos!");
//           setTimeout(() => {
//             setMsg("");
//           }, 5000);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container-login">
//       <div className="login">
//         <h1>BEM-VINDO</h1>
//         <h2 className={msg == "Login efetuado com Sucesso!!" ? "msg-success-login" : "msg-error-login"}>{msg}</h2>

//         <div className="form-login">
//           <form onSubmit={handleSubmit}>
//             <div className="email-input">
//               <label htmlFor="idEmail">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 id="idEmail"
//                 placeholder="Digite seu email."
//                 value={usuario.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="senha-input">
//               <label htmlFor="idSenha">Senha:</label>
//               <input
//                 type="password"
//                 name="senha"
//                 id="idSenha"
//                 placeholder="Digite sua senha."
//                 value={usuario.senha}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="container-button-login">
//               <button>LOGIN</button>
//             </div>
//             <div className="login-texto p-5 m-auto w-2/4">
//               <p>
//                 Se você não é cadastrado em nosso sistema,{" "}
//                 <Link href="/login/cad" className="text-amber-500 hover:text-amber-200">
//                   CLIQUE AQUI
//                 </Link>{" "}
//                 para se registrar.
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client"
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function LoginUsers() {
//   const [msg, setMsg] = useState("");
//   const router = useRouter(); // Renomeei a variável para evitar conflitos

//   const [usuario, setUsuario] = useState({
//     info: "login",
//     email: "",
//     senha: "",
//     cpf: "",
//     type: sessionStorage.getItem("userType") || "",
//   });

//   useEffect(() => {
//     const userType = sessionStorage.getItem("userType");
//     if (userType) {
//       if (userType === "paciente") {
//         router.push("/informativos/welcome");
//       } else if (userType === "medico") {
//         router.push("/medico");
//       }
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUsuario({ ...usuario, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/api/base/base-user-api", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(usuario),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         if (result.status) {
//           const userType = result.user.type;
//           setUsuario({ ...usuario, type: userType });

//           sessionStorage.setItem("userType", userType);

//           if (userType === "paciente") {
//             router.push("/informativos/welcome");
//           } else if (userType === "medico") {
//             router.push("/medico");
//           }

//           setMsg("Login efetuado com Sucesso!!");
//           setTimeout(() => {
//             setMsg("");
//           }, 5000);
//         } else {
//           setMsg("Login ou Senha incorretos!");
//           setTimeout(() => {
//             setMsg("");
//           }, 5000);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container-login">
//       <div className="login">
//         <h1>BEM-VINDO</h1>
//         <h2 className={msg === "Login efetuado com Sucesso!!" ? "msg-success-login" : "msg-error-login"}>
//           {msg}
//         </h2>

//         <div className="form-login">
//           <form onSubmit={handleSubmit}>
//             <div className="email-input">
//               <label htmlFor="idEmail">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 id="idEmail"
//                 placeholder="Digite seu email."
//                 value={usuario.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="senha-input">
//               <label htmlFor="idSenha">Senha:</label>
//               <input
//                 type="password"
//                 name="senha"
//                 id="idSenha"
//                 placeholder="Digite sua senha."
//                 value={usuario.senha}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="container-button-login">
//               <button>LOGIN</button>
//             </div>
//             <div className="login-texto p-5 m-auto w-2/4">
//               <p>
//                 Se você não é cadastrado em nosso sistema,{" "}
//                 <Link href="/login/cad" className="text-amber-500 hover:text-amber-200">
//                   CLIQUE AQUI
//                 </Link>{" "}
//                 para se registrar.
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { promises as fs } from "fs";
// import { NextResponse } from "next/server";

// //Recuperar o arquivo json.
// const file = await fs.readFile(
//   process.cwd() + "/src/app/api/base/db.json",
//   "utf-8"
// );

// export async function GET(request, { params }) {
//   return NextResponse.json(JSON.parse(file));
// }

// const handleLogin = async (email, senha) => {
//   //PARSEANDO O ARQUIVO PARA O JSON NATIVO!!!
//   const body = await JSON.parse(file);
//   //Realizando a busca do usuário na base de dados e validando o login e retornando o usuário.
//   const userValidado = await body.usuarios.find(
//     (user) => user.email == email && user.senha == senha
//   );

//   if (!userValidado) {
//     return false;
//   } else {
//     return userValidado;
//   }
// };

// const handleCad = async (email, senha, nome, cpf,type) => {
//     //PARSEANDO O ARQUIVO PARA O JSON NATIVO!!!
//     const body = await JSON.parse(file);
    
//     //Realizando a busca do último ID cadastrado.
//     const lastId = await body.usuarios[body.usuarios.length - 1].id;
//     //Criando o novo usuário.
//     const newUser = {
//         "id": (lastId + 1),
//         "nome": nome,
//         "email": email,
//         "senha": senha,
//         "cpf": cpf, 
//         "type": type,
//     };

//     //Adicionando o novo usuário na base de dados.
//     body.usuarios.push(newUser);

//     //Adicionando o novo usuário na base de dados.
//     await fs.writeFile(process.cwd() + "/src/app/api/base/db.json", JSON.stringify(body));
//     //Retornando o novo usuário.
//     return newUser;
// }

// export async function POST(request, response) {
//   const {info,nome, email, senha } = await request.json();

//   if (info == "login") {
//     //Chamando a função de validação do login.
//     const userValidado = await handleLogin(email, senha);
//     if (!userValidado) {
//       return NextResponse.json({ status: false});
//     }else{
//       return NextResponse.json({ status: true, user: userValidado });
//     }
//   }else if (info == "cad") {
//     //Chamando a função de cadastro do usuário.
//     const newUser = await handleCad(email, senha, nome, cpf,type);
//     if (!newUser) {
//       return NextResponse.json({ status: false });
//     }else{
//       return NextResponse.json({ status: true, user: newUser });
//     }
//   }
  
// // }
// // api/base/base-user-api.js
// import { promises as fs } from "fs";
// import { NextResponse } from "next/server";

// // Recuperar o arquivo json.
// const filePath = process.cwd() + "/src/app/api/base/db.json";
// let fileData = null;

// const readFile = async () => {
//   if (!fileData) {
//     const fileContent = await fs.readFile(filePath, "utf-8");
//     fileData = JSON.parse(fileContent);
//   }
//   return fileData;
// };

// export async function GET(request, { params }) {
//   const data = await readFile();
//   return NextResponse.json(data);
// }

// const handleLogin = async (email, senha) => {
//   const body = await readFile();
//   const userValidado = body.usuarios.find(
//     (user) => user.email === email && user.senha === senha
//   );

//   return userValidado || false;
// };

// const handleCad = async (email, senha, nome, cpf) => {
//   const body = await readFile();
//   const lastId = body.usuarios[body.usuarios.length - 1].id;
//   const newUser = {
//     id: lastId + 1,
//     nome: nome,
//     email: email,
//     senha: senha,
//     cpf: cpf,
//   };

//   body.usuarios.push(newUser);
//   await fs.writeFile(filePath, JSON.stringify(body));
//   return newUser;
// };

// export async function POST(request, response) {
//   const { info, nome, email, senha, cpf } = await request.json();

//   if (info === "login") {
//     const userValidado = await handleLogin(email, senha);
//     return NextResponse.json({
//       status: userValidado ? true : false,
//       user: userValidado || null,
//     });
//   } else if (info === "cad") {
//     const newUser = await handleCad(email, senha, nome, cpf);
//     return NextResponse.json({
//       status: newUser ? true : false,
//       user: newUser || null,
//     });
//   }
// }
// api/base/base-user-api.js
// // api/base/base-user-api.js
// import { promises as fs } from "fs";
// import { NextResponse } from "next/server";

// const filePath = process.cwd() + "/src/app/api/base/db.json";
// let fileData = null;

// const readFile = async () => {
//   if (!fileData) {
//     const fileContent = await fs.readFile(filePath, "utf-8");
//     fileData = JSON.parse(fileContent);
//   }
//   return fileData;
// };

// const handleLogin = async (email, senha) => {
//   try {
//     const body = await readFile();
//     const userValidado = body.usuarios.find(
//       (user) => user.email === email && user.senha === senha
//     );

//     if (userValidado) {
//       return { status: true, user: userValidado };
//     } else {
//       console.log("Usuário não encontrado");
//       return { status: false };
//     }
//   } catch (error) {
//     console.error("Erro ao processar login:", error);
//     return { status: false };
//   }
// };

// const handleCad = async (email, senha, nome, cpf, type) => {
//   const body = await readFile();
//   const lastId = body.usuarios[body.usuarios.length - 1].id;
//   const newUser = {
//     id: lastId + 1,
//     nome: nome,
//     email: email,
//     senha: senha,
//     cpf: cpf,
//     type: type,
//   };

//   body.usuarios.push(newUser);
//   await fs.writeFile(filePath, JSON.stringify(body));
//   return newUser;
// };

// export async function GET(request, { params }) {
//   const data = await readFile();
//   return NextResponse.json(data);
// }

// export async function POST(request, response) {
//   const { info, nome, email, senha, cpf, type } = await request.json();

//   if (info === "login") {
//     const userValidado = await handleLogin(email, senha);

//     if (userValidado) {
//       const userType = userValidado.type;

//       if (userType === "paciente") {
//         return NextResponse.json({ status: true, user: userValidado, userType: "paciente" });
//       } else if (userType === "medico") {
//         return NextResponse.json({ status: true, user: userValidado, userType: "medico" });
//       }
//     } else {
//       return NextResponse.json({ status: false, user: null });
//     }
//   } else if (info === "cad") {
//     const newUser = await handleCad(email, senha, nome, cpf, type);
//     return NextResponse.json({
//       status: newUser ? true : false,
//       user: newUser || null,
//     });
//   }
// }

// import { promises as fs } from "fs";
// import { NextResponse } from "next/server";

// // Recuperar o arquivo json.
// const file = await fs.readFile(
//   process.cwd() + "/src/app/api/base/db.json",
//   "utf-8"
// );

// export async function GET(request, { params }) {
//   return NextResponse.json(JSON.parse(file));
// }

// const handleLogin = async (email, senha) => {
//   // PARSEANDO O ARQUIVO PARA O JSON NATIVO!!!
//   const body = await JSON.parse(file);
//   // Realizando a busca do usuário na base de dados e validando o login e retornando o usuário.
//   const userValidado = await body.usuarios.find(
//     (user) => user.email == email && user.senha == senha
//   );

//   if (!userValidado) {
//     return false;
//   } else {
//     return userValidado;
//   }
// };

// const handleCad = async (email, senha, nome, cpf, type) => {
//   // PARSEANDO O ARQUIVO PARA O JSON NATIVO!!!
//   const body = await JSON.parse(file);

//   // Realizando a busca do último ID cadastrado.
//   const lastId = await body.usuarios[body.usuarios.length - 1].id;
//   // Criando o novo usuário.
//   const newUser = {
//     id: lastId + 1,
//     nome: nome,
//     email: email,
//     senha: senha,
//     cpf: cpf,
//     type: type,
//   };

//   // Adicionando o novo usuário na base de dados.
//   body.usuarios.push(newUser);

//   // Adicionando o novo usuário na base de dados.
//   await fs.writeFile(
//     process.cwd() + "/src/app/api/base/db.json",
//     JSON.stringify(body)
//   );
//   // Retornando o novo usuário.
//   return newUser;
// };

// export async function POST(request, response) {
//   const { info, nome, email, senha, cpf, type } = await request.json();

//   if (info === "login") {
//     // Chamando a função de validação do login.
//     const userValidado = await handleLogin(email, senha);
//     if (!userValidado) {
//       return NextResponse.json({ status: false });
//     } else {
//       return NextResponse.json({ status: true, user: userValidado });
//     }
//   } else if (info === "cad") {
//     // Chamando a função de cadastro do usuário.
//     const newUser = await handleCad(email, senha, nome, cpf, type);
//     if (!newUser) {
//       return NextResponse.json({ status: false });
//     } else {
//       return NextResponse.json({ status: true, user: newUser });
//     }
//   }
// }




// **************************USAR ESSE CASO ABAIXO DE ERRO******************************






// import { promises as fs } from "fs";
// import { NextResponse } from "next/server";

 
// const file = await fs.readFile(
//   process.cwd() + "/src/app/api/base/db.json",
//   "utf-8"
// );

// export async function GET(request, { params }) {
//   return NextResponse.json(JSON.parse(file));
// }

// const handleLogin = async (email, senha) => {
//   // PARSEANDO O ARQUIVO PARA O JSON NATIVO!!!
//   const body = await JSON.parse(file);
//   // Realizando a busca do usuário na base de dados e validando o login e retornando o usuário.
//   const userValidado = await body.usuarios.find(
//     (user) => user.email == email && user.senha == senha
//   );

//   if (!userValidado) {
//     return false;
//   } else {
//     return userValidado;
//   }
// };

// const handleCad = async (email, senha, nome, cpf, type) => {
//   // PARSEANDO O ARQUIVO PARA O JSON NATIVO!!!
//   const body = await JSON.parse(file);

//   // Realizando a busca do último ID cadastrado.
//   const lastId = await body.usuarios[body.usuarios.length - 1].id;

//   // Criando o novo usuário.
//   const newUser = {
//     id: lastId + 1,
//     nome: nome,
//     email: email,
//     senha: senha,
//     cpf: cpf,
//     type: type,
//     cartilhaVacinas: [] // Adicionando uma cartilha de vacinação vazia para o novo usuário
//   };

//   // Adicionando o novo usuário na base de dados.
//   body.usuarios.push(newUser);

//   // Adicionando o novo usuário na base de dados.
//   await fs.writeFile(
//     process.cwd() + "/src/app/api/base/db.json",
//     JSON.stringify(body)
//   );

//   // Retornando o novo usuário.
//   return newUser;
// };

// export async function POST(request, response) {
//   const { info, nome, email, senha, cpf, type } = await request.json();

//   if (info === "login") {
//     // Chamando a função de validação do login.
//     const userValidado = await handleLogin(email, senha);
//     if (!userValidado) {
//       return NextResponse.json({ status: false });
//     } else {
//       return NextResponse.json({ status: true, user: userValidado });
//     }
//   } else if (info === "cad") {
//     // Chamando a função de cadastro do usuário.
//     const newUser = await handleCad(email, senha, nome, cpf, type);
//     if (!newUser) {
//       return NextResponse.json({ status: false });
//     } else {
//       return NextResponse.json({ status: true, user: newUser });
//     }
//   }
// }


// api/base/base-user-api.js
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const filePath = process.cwd() + "/src/app/api/base/db.json";

const readFile = async () => {
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
};

const writeFile = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};

const handleVisualizarCartilha = async (userId) => {
  const body = await readFile();

  const user = body.usuarios.find((user) => user.id === userId);

  if (user) {
    return user.cartilhaVacinas || [];
  } else {
    console.log("Usuário não encontrado.");
    return null;
  }
};

const handleModificarCartilha = async (medicoId, userId, cartilhaVacinas) => {
  const body = await readFile();

  const medico = body.usuarios.find((user) => user.id === medicoId);
  const usuario = body.usuarios.find((user) => user.id === userId);

  // Verifica se o usuário é do tipo "médico"
  if (medico && medico.type === "medico" && usuario) {
    // Atualiza a cartilha de vacinas do usuário
    usuario.cartilhaVacinas = cartilhaVacinas;

    // Salva as alterações no arquivo
    await writeFile(body);

    return true;
  } else {
    console.log("Apenas médicos podem modificar a cartilha de outros usuários.");
    return false;
  }
};

export async function GET(request, { params }) {
  return NextResponse.json(await readFile());
}

const handleLogin = async (email, senha) => {
  const body = await readFile();
  const userValidado = body.usuarios.find(
    (user) => user.email === email && user.senha === senha
  );

  return userValidado || false;
};

const handleCad = async (email, senha, nome, cpf, type) => {
  const body = await readFile();
  const lastId = body.usuarios[body.usuarios.length - 1].id;
  const newUser = {
    id: lastId + 1,
    nome: nome,
    email: email,
    senha: senha,
    cpf: cpf,
    type: type,
    cartilhaVacinas: [] // Adicionando uma cartilha de vacinação vazia para o novo usuário
  };

  body.usuarios.push(newUser);
  await writeFile(body);

  return newUser;
};

export async function POST(request, response) {
  const { info, nome, email, senha, cpf, type, medicoId, userId, cartilhaVacinas } = await request.json();

  if (info === "login") {
    const userValidado = await handleLogin(email, senha);
    return NextResponse.json({
      status: userValidado ? true : false,
      user: userValidado || null,
    });
  } else if (info === "cad") {
    const newUser = await handleCad(email, senha, nome, cpf, type);
    return NextResponse.json({
      status: newUser ? true : false,
      user: newUser || null,
    });
  } else if (info === "visualizarCartilha") {
    const cartilha = await handleVisualizarCartilha(userId);
    return NextResponse.json({ status: true, cartilha: cartilha });
  } else if (info === "modificarCartilha") {
    const sucesso = await handleModificarCartilha(medicoId, userId, cartilhaVacinas);
    return NextResponse.json({ status: sucesso });
  }
}

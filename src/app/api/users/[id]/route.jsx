// api/usuarios/[id].js
// import { promises as fs } from 'fs';
// import { NextResponse } from 'next/server';

// const filePath = process.cwd() + '/src/app/api/base/db.json';

// export async function GET(request, { params }) {
//   try {
//     const fileContent = await fs.readFile(filePath, 'utf-8');
//     const data = JSON.parse(fileContent);

//     const id = parseInt(params.id, 10);

//     if (id > 0) {
//       const usuario = data.usuarios.find((usuario) => usuario.id === id);
//       return usuario ? NextResponse.json(usuario) : NextResponse.json({ "status": "error", "message": "Usuário não encontrado" });
//     } else {
//       return NextResponse.json(data.usuarios);
//     }
//   } catch (error) {
//     return NextResponse.json({ "status": "error", "message": "Erro no servidor" });
//   }
// }

// export async function POST(request, response) {
//   try {
//     const fileContent = await fs.readFile(filePath, 'utf-8');
//     const data = JSON.parse(fileContent);

//     const body = await request.json();

//     for (let x = 0; x < data.usuarios.length; x++) {
//       const usuario = data.usuarios[x];
//       if (usuario.id === body.id) {
//         return NextResponse.json({ "status": "ok", "message": "Usuário já registrado" });
//       }
//     }

//     data.usuarios.push(body);
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2));

//     return NextResponse.json({ "status": "ok", "message": "Usuário registrado com sucesso" });
//   } catch (error) {
//     return NextResponse.json({ "status": "error", "message": "Erro no servidor" });
//   }
// }
// api/usuarios/[id].js
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

const filePath = process.cwd() + '/src/app/api/base/db.json';

export async function GET(request, { params }) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    const id = parseInt(params.id, 10);

    if (id > 0) {
      const usuario = data.usuarios.find((usuario) => usuario.id === id);
      return usuario ? NextResponse.json(usuario) : NextResponse.json({ "status": "error", "message": "Usuário não encontrado" });
    } else {
      return NextResponse.json(data.usuarios);
    }
  } catch (error) {
    return NextResponse.json({ "status": "error", "message": "Erro no servidor" });
  }
}

export async function POST(request, response) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    const { id, vacinas } = await request.json();
    const medico = data.usuarios.find((usuario) => usuario.id === id && usuario.type === 'medico');

    if (!medico) {
      return NextResponse.json({ "status": "error", "message": "Apenas médicos podem modificar informações de vacinas" });
    }

    const userIndex = data.usuarios.findIndex((usuario) => usuario.id === id);

    if (userIndex !== -1) {
      // Adicionando ou atualizando informações de vacinas para o usuário
      data.usuarios[userIndex].vacinas = vacinas;

      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      return NextResponse.json({ "status": "ok", "message": "Informações de vacinas atualizadas com sucesso" });
    } else {
      return NextResponse.json({ "status": "error", "message": "Usuário não encontrado" });
    }
  } catch (error) {
    return NextResponse.json({ "status": "error", "message": "Erro no servidor" });
  }
}

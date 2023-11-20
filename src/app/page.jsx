import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container-home">
        <div className="conteudo-home">
        <h1>NTJ Health</h1>
   
        <p>Clique <Link href="/login">aqui</Link> para fazer login</p>
        <p>Caso queira se cadastrar <Link href="/login/cad">aqui</Link></p>
        <p> <Link href="/informativos/covid">COVID 19</Link></p>


        </div>
      </div>
      <div className="container-modelos">
        <div>

        </div>

      </div>
    </div>
  )
}

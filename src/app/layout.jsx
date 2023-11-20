
import { Inter } from 'next/font/google'
import Cabecalho from '@/components/Cabecalho/Cabecalho'
import Rodape from '@/components/Rodape/Rodape'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GS',
  description: 'Entrega da gs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Cabecalho/>
          <h1></h1>
          {children}
        <Rodape/>
        
      </body>
    </html>
  )
}

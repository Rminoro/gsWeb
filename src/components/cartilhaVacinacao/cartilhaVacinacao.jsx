// import React from 'react';

const CarteirinhaVacina = ({ userId }) => {
    const vacinas = [
      { nome: 'BCG', doses: ['Ao nascer'] },
      {
        nome: 'Hepatite B',
        doses: ['Ao nascer', '1 mês de vida', '6 meses de vida'],
      },
      {
        nome: 'Pentavalente',
        doses: ['2 meses de vida', '4 meses de vida', '6 meses de vida'],
      },
      {
        nome: 'VIP (Vacina Inativada Poliomielite)',
        doses: ['2 meses de vida', '4 meses de vida', '6 meses de vida', '15 meses de vida (Reforço)'],
      },
      {
        nome: 'VOP (Vacina Oral Poliomielite)',
        doses: ['Mesmos períodos da VIP'],
      },
      {
        nome: 'Pneumocócica 10-valente',
        doses: ['2 meses de vida', '4 meses de vida', '6 meses de vida', '12 meses de vida (Reforço)'],
      },
      {
        nome: 'Meningocócica C',
        doses: ['3 meses de vida', '5 meses de vida (Reforço)', '12 meses de vida (Reforço)'],
      },
      {
        nome: 'Rotavírus',
        doses: ['2 meses de vida', '4 meses de vida', '6 meses de vida'],
      },
      {
        nome: 'Febre Amarela',
        doses: ['A partir de 9 meses de vida'],
      },
      {
        nome: 'Tríplice Viral (sarampo, caxumba e rubéola)',
        doses: ['12 meses de vida', '15 meses de vida'],
      },
      {
        nome: 'DTP (Difteria, Tétano e Coqueluche)',
        doses: ['2 meses de vida', '4 meses de vida', '6 meses de vida', '15 meses de vida (Reforço)'],
      },
      {
        nome: 'Hepatite A',
        doses: ['15 meses de vida', '4 anos de idade'],
      },
      {
        nome: 'Tetra Viral ou Tríplice Viral + Varicela',
        doses: ['15 meses de vida', '4 anos de idade (Reforço)'],
      },
      {
        nome: 'HPV (Papilomavírus Humano)',
        doses: ['Meninas: 9 a 14 anos (duas doses, com intervalo de 6 meses entre elas)', 'Meninos: 11 a 14 anos (duas doses, com intervalo de 6 meses entre elas)'],
      },
    ];
  
    return (
      <div>
        <h2>Carteirinha de Vacinação - ID do Usuário: {userId}</h2>
        <table>
          <thead>
            <tr>
              <th>Vacina</th>
              <th>Doses</th>
            </tr>
          </thead>
          <tbody>
            {vacinas.map((vacina, index) => (
              <tr key={index}>
                <td>{vacina.nome}</td>
                <td>{vacina.doses.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CarteirinhaVacina;
  
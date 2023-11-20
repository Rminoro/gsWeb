// Importe next/navigation em vez de next/router
import { useNavigation } from 'next/navigation';
import CarteirinhaVacina from '../../../components/cartilhaVacinacao/cartilhaVacinacao.jsx';

const CarteirinhaPage = () => {
  // Substitua useRouter por useNavigation
  const navigation = useNavigation();
  const { userId } = navigation.query;

  return <CarteirinhaVacina userId={userId} />;
};

export default CarteirinhaPage;

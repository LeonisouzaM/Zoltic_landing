import { SalesPage } from './components/SalesPage';
import { LegalPage } from './components/LegalPage';
import { SalesV2 } from './components/SalesV2';

function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/privacidade') return <LegalPage kind="privacy" />;
  if (path === '/termos') return <LegalPage kind="terms" />;
  if (path === '/vendas') return <SalesV2 />;

  return <SalesPage />;
}

export default App;

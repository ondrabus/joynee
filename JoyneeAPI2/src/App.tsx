import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { customAuthProvider } from './authProvider';
import CustomLogin from './components/Login';
import CustomLogin from './components/Login';

const App: React.FC = () => {
  return (
    <Admin 
      dataProvider={dataProvider} 
      authProvider={customAuthProvider}
      loginPage={CustomLogin}
      title="Joynee Admin Portal"
    >
      {/* ... existing resources ... */}
    </Admin>
  );
}; 
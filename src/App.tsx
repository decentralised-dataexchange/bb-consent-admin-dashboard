// react-admin
import { Admin, Resource } from 'react-admin'

// pages
import { Login } from './pages/login/Login';

function App() {
  return (
    <Admin loginPage={Login}>
      <Resource name='login' options={{ label: 'Getting Started' }} list={Login} />
    </Admin>
  );
}

export default App;

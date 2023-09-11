// react-admin
import { Admin, Resource } from 'react-admin'

// main layout
import { MyLayout } from './components/layout/MyLayout';

// pages
import { Login } from './pages/login/Login';
import GettingStarted from "./pages/GettingStarted"

// icons
import HouseIcon from '@mui/icons-material/HouseOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

function App() {
  return (
    <Admin layout={MyLayout} loginPage={Login}>
      <Resource name='login' list={Login} />
      <Resource name='start' options={{ label: 'Getting Started' }} list={GettingStarted} icon={HouseIcon} />
      <Resource name='dataagreement' options={{ label: 'Data Agreements' }} icon={InsertDriveFileOutlinedIcon}  />
      <Resource name='personaldata' options={{ label: 'Personal Data' }} icon={InsertChartOutlinedOutlinedIcon}/>
      <Resource name='userrecords' options={{ label: 'User Records'}} />
      <Resource name='configuration' options={{ label: 'Configuration' }}/>
      <Resource name='privacyboard' options={{ label: 'Privacy Board' }} icon={HealthAndSafetyOutlinedIcon} />
      <Resource name='manageadmin' options={{ label: 'Manage Admin' }} />
      <Resource name='developerapi' options={{ label: 'Developer APIs' }} />
      <Resource name='viewlogs' options={{ label: 'View Logs' }} />
      <Resource name='webhooks' options={{ label: 'Webhooks' }} />
    </Admin>
  );
}

export default App;
// react-admin
import { Admin, Resource } from 'react-admin'

// main layout
import { MyLayout } from './components/layout/MyLayout';

// pages
import { Login } from './pages/login/Login';
import GettingStarted from "./pages/gettingStarted/GettingStarted"
import DataAgreements from "./pages/dataAgreements/DataAgreements"
import PersonalData from './pages/personalData/personalData';
import UserRecords from './pages/userRecords/userRecords';

import { dataProvider } from './components/dataprovider/dataProvider';
import { theme } from './components/theme/theme'

// icons
import HouseIcon from '@mui/icons-material/HouseOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import UserAccess from './pages/userAccess/userAcess';
import Privacyboard from './pages/privacyBoard/privacyBoard';
import ManageAdmin from './pages/manageAdmin/manageAdmin';

function App() {
  return (
    <Admin layout={MyLayout} loginPage={Login} dataProvider={dataProvider} theme={theme}>
      <Resource name='login' list={Login} />
      <Resource name='start' options={{ label: 'Getting Started' }} list={GettingStarted} icon={HouseIcon} />
      <Resource name='dataagreement' options={{ label: 'Data Agreements' }} list={DataAgreements} icon={InsertDriveFileOutlinedIcon}  />
      <Resource name='personaldata' options={{ label: 'Personal Data' }} list={PersonalData} icon={InsertChartOutlinedOutlinedIcon}/>
      <Resource name='configuration' options={{ label: 'Configuration' }} list={UserAccess}/>
      <Resource name='userrecords' options={{ label: 'User Records'}} list={UserRecords} />
      <Resource name='privacyboard' options={{ label: 'Privacy Board' }} list={Privacyboard} icon={HealthAndSafetyOutlinedIcon} />
      <Resource name='manageadmin' options={{ label: 'Manage Admin' }} list={ManageAdmin} />
      <Resource name='developerapi' options={{ label: 'Developer APIs' }} />
      <Resource name='viewlogs' options={{ label: 'View Logs' }} />
      <Resource name='webhooks' options={{ label: 'Webhooks' }} />
    </Admin>
  );
}

export default App;
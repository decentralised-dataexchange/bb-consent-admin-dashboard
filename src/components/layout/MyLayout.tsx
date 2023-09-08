import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MyMenu from './MyMenu';

export const MyLayout = (props: object): JSX.Element => <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;
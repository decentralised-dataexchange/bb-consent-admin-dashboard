import { Menu, MenuProps } from 'react-admin';
import { Typography } from '@mui/material';
import { useSidebarState } from "ra-ui-materialui";
import { useState } from 'react';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import SubMenu from './SubMenu';

type MenuName = 'manageconsents' | 'account'

export default function MyMenu({ dense = false }: MenuProps) {
    const [open] = useSidebarState();
    const [state, setState] = useState({
        manageconsents: false,
        account: false,
    });

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Menu sx={{
            marginTop: 0,
            position: 'fixed',
            height: '100vh',
            backgroundColor: "#F7F6F6",
            paddingTop:'34px',
        }} >
            <Menu.ResourceItem name="start" />
            <Menu.ResourceItem name="dataagreement" />
            <Menu.ResourceItem name="personaldata" />
            <SubMenu
                handleToggle={() => handleToggle('manageconsents')}
                isOpen={state.manageconsents}
                name="Manage consents"
                icon={<PeopleAltOutlinedIcon />}
                dense={!dense}
            >
                <Menu.Item to="/dataagreementrecords" primaryText="DA Records"/>
                <Menu.Item to="/subscription" primaryText="Subscription"/>
            </SubMenu>
            <Menu.ResourceItem name="privacyboard" />
            <SubMenu
                handleToggle={() => handleToggle('account')}
                isOpen={state.account}
                name="Account"
                icon={<LockOutlinedIcon />}
                dense={!dense}
            >
                <Menu.Item to="/manageadmin" primaryText="Manage Admin"/>
                <Menu.Item to="/developerapi" primaryText="Developer APIs"/>
                <Menu.Item to="/viewlogs" primaryText="View logs"/>
                <Menu.Item to="/webhooks" primaryText="Web Hooks"/>
            </SubMenu>

            {open ?
                <Typography
                    sx={{
                        marginTop: "auto",
                        paddingBottom: 10,
                        textAlign: "center"
                    }}
                >Version: v2023.8.1</Typography>
                : null
            }
        </Menu>
    )
};

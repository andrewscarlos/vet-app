import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospital from '@material-ui/icons/LocalHospital';
import Pets from '@material-ui/icons/Pets';
import PeopleIcon from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';


export const mainListItems = (
    <div>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <ListItem button >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>

        <Link to="/atendimento" style={{ textDecoration: 'none' }}>
            <ListItem button >
                <ListItemIcon>
                    <LocalHospital />
                </ListItemIcon>
                <ListItemText primary="Atendimento" />
            </ListItem>
        </Link>

        <Link to="/pets" style={{ textDecoration: 'none' }}>
            <ListItem button >
                <ListItemIcon>
                    <Pets />
                </ListItemIcon>
                <ListItemText primary="Pets" />
            </ListItem>
        </Link>


    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Opçoẽs</ListSubheader>
        <Link to="/usuarios" style={{ textDecoration: 'none' }}>
            <ListItem button  >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
            </ListItem>
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
            
            <ListItem  button>
                <ListItemIcon>
               
                    <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Sair" />
            </ListItem>
        </Link>

    </div>
);
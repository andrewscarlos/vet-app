import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


export const MenuItem = ({ icon, title, onClick }) => (
    <ListItem button onClick={onClick}>
        {icon && (
            <ListItemIcon>
                {icon}
            </ListItemIcon>
        )}
        <ListItemText primary={title} />
    </ListItem>
)
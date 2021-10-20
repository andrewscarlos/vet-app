import React, { useCallback, useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useLocation } from 'react-router-dom'

import DashboardIcon from '@material-ui/icons/Dashboard'
import LocalHospital from '@material-ui/icons/LocalHospital'
import Pets from '@material-ui/icons/Pets'
import PeopleIcon from '@material-ui/icons/People'
import ExitToApp from '@material-ui/icons/ExitToApp'

import clsx from 'clsx';
import { Link } from 'react-router-dom'
import includes from 'lodash/includes'

import { MenuItem } from './itensMenu';
import { useStyles } from "./../styles"

const routers = [
  { id: 1, url: "/", title: "Dashboard", icon: <DashboardIcon /> },
  { id: 2, url: "/atendimento", title: "Atendimento", icon: <LocalHospital /> },
  { id: 3, url: "/pets", title: "Pets", icon: <Pets /> },
  { id: 5, url: null, icon: <Divider /> },
  { id: 4, url: "/usuarios", title: "Usuarios", icon: <PeopleIcon /> },
  { id: 5, url: "exit", title: "Sair", icon: <ExitToApp />, onClick: () => { console.log("Sair") } },
  { id: 8, url: "prontuario", title: "Prontuário", hide: true },
  { id: 9, url: "vermifugos", title: "Vermifugos", hide: true },
]

const walkItem = (items, text) => {
  if (!items) {
    return
  }

  for (const item of items) {
    if (includes(item.url, text)) {
      return item
    }

    const child = walkItem(item.childNodes, text)
    if (child) {
      return child
    }
  }
}

const MenuAdmin = () => {
  const { pathname } = useLocation()
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState(document.title)

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [])

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [])


  useEffect(() => {
    if (pathname) {
      const item = walkItem(routers, pathname)
      if (item) {
        document.title = item.title
        setTitle(item.title)
      } else {
        document.title = "Vet-App"
      }
    }
  }, [pathname])

  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {routers.filter(menu => !menu.hide).map((router, index) => {
            if (!router.url && router.icon !== undefined) {
              return router.icon
            }

            if (router.onClick !== undefined) {
              return <MenuItem key={`${router.id}-menu-${index}`} {...router} />
            }

            return (
              <Link key={`${router.id}-menu-${index}`} to={router.url} style={{ textDecoration: 'none' }}>
                <MenuItem {...router} />
              </Link>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}

export default MenuAdmin;
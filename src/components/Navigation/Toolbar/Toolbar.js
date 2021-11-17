import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle drawToggle={props.drawToggle} />
            <Logo height={'80%'} />
            <nav className={classes.desktoponly} >
                <NavigationItem isAuth={props.isAuth} />
            </nav>
        </header>
    )
}

export default toolbar;
import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Drawertoggler from '../SideDrawer/DrawerToggler/DrawerToggler';
const toolbar =(props)=>{
    return(
        <header className={classes.Toolbar}>
        <Drawertoggler clicked={props.toggle}/>
        <Logo />
        <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
        </nav>
        </header>
        )
}
export default toolbar;
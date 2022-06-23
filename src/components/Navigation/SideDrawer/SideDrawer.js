import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxillary/Auxillary';
const IMG_URL='https://cdn.iconscout.com/icon/premium/png-256-thumb/burger-7-136282.png';
const sideDrawer = (props) => {
    let attachedClassses=[classes.SideDrawer,classes.Close]
    if(props.open){
        attachedClassses=[classes.SideDrawer,classes.Open]
    }
    return (
        <Aux>
        <Backdrop 
        show={props.open}
        clicked={props.closed}
        />
        <div className={attachedClassses.join(` `)}
        onClick={props.closed}>
        <div >
        <img src={IMG_URL} width="30%" height="30%" alt='null'/>
        </div>
        <nav>
        <NavigationItems
        isAuth={props.isAuth}
        />
        </nav>
        </div>
        </Aux>
       
    );
};
export default sideDrawer;

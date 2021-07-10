import React from 'react';
import NavigationItem from './Navigationitem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            active={true}
            link="/" >
            Burger
        </NavigationItem>
        {props.isAuth
            ? <NavigationItem
                link="/Orders" >
                Orders
            </NavigationItem> : null}
        {props.isAuth
            ?
            <NavigationItem
                link="/logout">
                Log Out
            </NavigationItem>
            : <NavigationItem
                link="/auth" >
                Log In
            </NavigationItem>}
    </ul>
);
export default navigationItems
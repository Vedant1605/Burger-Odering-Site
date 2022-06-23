import React from 'react';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

const logo = (props) => (
    <div className={classes.Logo}>
        <Link to="/">
            <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/burger-7-136282.png" alt="MyBurger" />
        </Link>
        <div>
            <div> &nbsp;Burger</div>
            <div> &nbsp;&nbsp;&nbsp; Boose</div>
        </div>
    </div>
)

export default logo
import React from 'react';
import Logo from '../../assets/images/Logo.png';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

const logo=(props)=>(
    <div className={classes.Logo}>
    <Link to="/"><img src={Logo} alt="MyBurger"/></Link>
    </div>
)

export default logo
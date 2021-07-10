import React from 'react';
import classes from './Spinner.module.css';

const spinner = () => (
    <div class={classes.spinner}>
        <div class={classes.cube1}></div>
        <div class={classes.cube2}></div>
    </div>
)
export default spinner;
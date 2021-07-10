import React from 'react'
import BuilControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'salad', price: 5 },
    { label: 'Cheese', type: 'cheese', price: 20 },
    { label: 'Tikki', type: 'tikki', price: 10 },
    { label: 'Tomato', type: 'tomato', price: 5 }
]


const buildcontrols = (props) => (
    <div>
        <div className={classes.BuildControls}>
            <p className={classes.Price}>Current Price: ₹{props.price}</p>
            {controls.map(ctrl => (
            <BuilControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)} 
                disabled={props.disabled[ctrl.type]} 
                eachPrice={ctrl.price} />
                ))}
                <button 
                className={classes.OrderButton} 
                disabled={props.purchasable} 
                onClick={props.ordered}>
                {props.isAuth?"Order":"LogIn to Order"}</button>
            
        </div>
    </div>
);

export default buildcontrols;
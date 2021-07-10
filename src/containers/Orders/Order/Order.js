import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    // console.log(props.price);
    // console.log(props.ingredients);
    const ingredients =[]
     for(let igName in props.ingredients){
        ingredients.push({
            name:igName,
            amount:props.ingredients[igName]
        })
    }
    const igOutput =ingredients.map(ig=><span key={ig.name} className={classes.Blocks}>{ig.name}({ig.amount})</span>)
    return (
        <div>
       
        <div className={classes.Order} >
        <h3>Ingredients</h3>
        <p className={classes.Ingredients}>{igOutput}</p>
        <h3>Price:{props.price}</h3>
        </div>
        </div>
    )
}
export default Order;
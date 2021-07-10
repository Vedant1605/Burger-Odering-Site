import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary=(props)=>{
// console.log(props.ingredients);
return(
<div className={classes.CheckoutSummary}>
<h1 style={{color:"#61dafb"}}>Have A Good Day</h1>
<div style={{width:'300px',margin:'auto'}}></div>
<Burger ingredients={props.ingredients} />
<Button btnType="Danger" clicked={props.onCheckoutCancelled} >Cancel</Button>
<Button btnType="Success" clicked={props.onCheckoutContinue} >Continue</Button>
</div>
)
}
export default checkoutSummary;
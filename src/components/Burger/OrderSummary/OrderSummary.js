import React, { Component } from 'react'
import Aux from '../../../HOC/Auxillary/Auxillary'
import Button from '../../UI/Button/Button'
import classes from './OrderSummary.module.css'

class OrderSummary extends Component {
    componentDidUpdate() {
        // console.log('[OderSummary.js] ');
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(Igkey => {
            return (<li key={Igkey}><span style={{ textTransform: 'capitalize' }}>{Igkey}</span>:{this.props.ingredients[Igkey]} </li>)
        })
        return (
            <Aux>
                <div className={classes.OrderSummary}>
                    <h3>Your Orders</h3>
                    <p>A delicious burger with following Add-ons</p>
                    <ol typeof="none">
                        {ingredientsSummary}
                    </ol>
                    <p>Continue to Checkout</p>
                    <p style={{ fontSize: '20px', color: 'red' }}>Total :{this.props.price}</p>
                    <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
                </div>
            </Aux>
        )
    }
}
export default OrderSummary;
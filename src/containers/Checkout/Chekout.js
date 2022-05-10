import React, { Component } from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import { Route, Switch, Redirect } from 'react-router';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    state = {
        Location:false,
    }
    
    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }
   
    onCheckoutContinue = () => {
        this.props.history.replace('/Checkout/contanct-data');
    }
    

    render() {
        let summary= <Redirect to="/" />
 
        if(this.props.ings)
        {
            const purchasedRedirect =this.props.purchased?<Redirect to="/" />:null;
            summary=(
                <div>
                <Switch>
                <Route path={this.props.match.url+"/contanct-data"} exact component={ContactData} />
                </Switch>
                <CheckoutSummary ingredients={this.props.ings} onCheckoutCancelled={this.onCheckoutCancelled} onCheckoutContinue={this.onCheckoutContinue} />
                <h3 style={{fontFamily:"cursive"}}>Here is your burger sir  <span style={{color:"#f8861c"}}>Only: ₹ {this.props.tPrice}</span></h3>
               
                {purchasedRedirect}
                </div>
                )
        }

        return (
            <div>
            {summary}    
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.bgr.ingredients,
        tPrice:state.bgr.totalPrice,
        purchased:state.odr.purchased,
    }
}


export default connect(mapStateToProps) (Checkout);
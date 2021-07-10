import React, { Component } from 'react';
import Order from './Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/A-index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {
    
    componentDidMount(){
     this.props.onFetchOrders(this.props.token,this.props.userId)
    }

    render() {
        let Display = <Spinner />
        if (!this.props.loading) {
            Display=(
                this.props.orders.map(order=>
                    <Order ingredients={order.ingredients} price={order.price} key={order.id}/>)
            )
        }
        // console.log(this.state.orders);
        return (
            <div>
            <h3 style={{marginTop:"72px",color:"#ffe031" }}>Your Previous Orders</h3>
                { Display}
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        orders:state.odr.fetchedOrders,
        loading:state.odr.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrdersStart(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders,axios));
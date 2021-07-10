import React, { Component } from 'react';
import * as actions from '../../../store/actions/A-index'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout()
    }
    render(){
        return <Redirect to="/" />;
    }
}

const mapDispatchaToProps=(dispatch)=>{
    return{
        onLogout:()=>dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchaToProps)(Logout)    
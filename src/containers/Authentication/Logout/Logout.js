import React, { Component } from 'react';
import * as actions from '../../../store/actions/A-index'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Logout extends Component{
    componentDidMount(){
        let x=window.confirm("Sure u want to logout !! Please come back soon")
        if(x)this.props.onLogout()
        else return <Redirect to="/" />
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
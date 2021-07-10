
import React,{ Component } from 'react'
import Aux from '../Auxillary/Auxillary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


class Layout extends Component {
    state={
        showSideDrawer:false
    }
    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{return{showSideDrawer:!prevState.showSideDrawer}})
    }
    render() {
        return (

            <Aux>
                <Toolbar 
                toggle={this.SideDrawerToggleHandler}
                isAuth={this.props.isAuthenticated}
                />
                <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.SideDrawerClosedHandler}
                isAuth={this.props.isAuthenticated}
                />
                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        isAuthenticated:state.auth.token !==null
    }
}

export default connect(mapStateToProps) (Layout);
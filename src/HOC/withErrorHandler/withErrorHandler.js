import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary/Auxillary';
const withErrorHandler = (WrappedCommponent, axios) => {

    return class extends Component {
        state={
            error:null
        }
        componentWillMount(){
            this.reqInterceptor=axios.interceptors.request.use(null,request=>{
                this.setState({error:null})
            })
            this.resInterceptor=axios.interceptors.response.use(response=>response,error=>{
                this.setState({error:error})
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor)        
            axios.interceptors.response.eject(this.resInterceptor)       
         }
        errorExitHandler=()=>{
            this.setState({error:null})
        }
        render() {
            return(
                <Aux>
                <WrappedCommponent {...this.props} />
                <Modal show={this.state.error} modalClosed={this.errorExitHandler}>{this.state.error?this.state.error.message:null}</Modal>
                </Aux>
            );
        }
    }
}
export default withErrorHandler;
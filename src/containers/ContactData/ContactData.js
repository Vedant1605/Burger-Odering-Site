import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../components/UI/Forms/Input/Input'
import { connect } from 'react-redux';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as OrdersActions from '../../store/actions/A-index'
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                ErrMsg:"Please enter a valid name"

            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-MAIL'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                ErrMsg:"Please enter a valid E-mail"

            },
            address: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                ErrMsg:"Please enter a valid Adress"

            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                ErrMsg:"Please enter a valid street name"

            },
            postalCode: {
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'Your Postal-Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false,
                ErrMsg:"Please enter 5 digit code "

            },
            deliveryType:{
                elementType:'select',
                elementConfig:{
                    placeholder:'Delivery Method',
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'Cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{
                    required:true
                },
                valid:true,
                touched:false

            }

        },
        Loading: false,
        formIsValid:false
    }
    
    orderHandler = (event) => {
        event.preventDefault()
        // this.setState({ Loading: true }) //To show Loading If request is not 
        const formData={};
        for(let FormElementIdentifier in this.state.orderForm)
        {
            formData[FormElementIdentifier]=this.state.orderForm[FormElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.tPrice,
            orderData:formData,
            userId:this.props.userId
        }
       
        this.props.onOrderBurger(order,this.props.token)
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    InputChangeHandler=(event,inputIdentifier)=>{
        //Since orderForm is nested(has object inside object ) we need 2 clone object one for oderform and another for one name ,adress 
        // console.log(event.target.value);
        const updatedOrderForm={
            ...this.state.orderForm
        }
        const updatedFormElements={
            ...this.state.orderForm[inputIdentifier]
        }
        updatedFormElements.value=event.target.value;
        updatedFormElements.valid=this.checkValidity(updatedFormElements.value,updatedFormElements.validation)
        updatedFormElements.touched=true
        updatedOrderForm[inputIdentifier]=updatedFormElements
        /* for disableing order button*/
        let formIsValid=true
        for(inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier].valid&&formIsValid
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})

        
    }
    render() {
        const formElemArray=[]
        for(let key in this.state.orderForm){
            formElemArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (<div className={classes.fm}>
            <br/>
            <h2>Enter your Details</h2>
            <form onSubmit={this.orderHandler}>
                    {formElemArray.map(formElm=>{
                        return <Input elementType={formElm.config.elementType} elementConfig={formElm.config.elementConfig} key={formElm.id} value={formElm.config.value} changed={(event)=>this.InputChangeHandler(event,formElm.id)}
                        invalid={!formElm.config.valid}
                        touched={formElm.config.touched}
                        errorMessage={formElm.config.ErrMsg}
                        />
                    })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        </div>
        );
        if (this.props.Loading) {
            form = <Spinner />
        }
        return (
            <withRouter>
                <div className={classes.ContactData}>
                    {form}
                </div>
            </withRouter>
        )
    }

}
const mapStateToProps=state=>{
    return{
        ings:state.bgr.ingredients,
        tPrice:state.bgr.totalPrice,
        loading:state.odr.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onOrderBurger:(order,token)=>dispatch(OrdersActions.purchaseBurgerStart(order,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
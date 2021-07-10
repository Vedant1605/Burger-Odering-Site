import React, { Component } from 'react'
import Aux from '../../HOC/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'
import * as BurgerBuilderActions from '../../store/actions/A-index'
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    componentDidMount() {
        this.props.fetchIngredients()
    }
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        return sum > 0
    }


    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        }
        else {
            this.props.onSetAuthRedirectPath('/Checkout')
            this.props.history.push('/auth')
        }
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.props.onPurchaseInit()
        this.props.history.push('/Checkout')
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null

        let burger = this.props.err ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.tPrice}
                        purchasable={!this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.props.ings} price={this.props.tPrice} purchaseCancel={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} />

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.bgr.ingredients,
        tPrice: state.bgr.totalPrice,
        err: state.bgr.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(BurgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(BurgerBuilderActions.removeIngredients(ingredientName)),
        fetchIngredients: () => dispatch(BurgerBuilderActions.fetchIngredients()),
        onPurchaseInit: () => dispatch(BurgerBuilderActions.purchaseInitialise()),
        onSetAuthRedirectPath: (path) => dispatch(BurgerBuilderActions.authRedirect(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
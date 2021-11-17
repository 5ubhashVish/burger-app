import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    componentDidMount() {
        this.props.onFetchData()
    }

    state = {
        purchasing: false,

    }

    updatePurchasableState(ingredient) {
        const sum = Object.keys(ingredient).map(
            igKey => { return ingredient[igKey]; }
        ).reduce(
            (sum, el) => { return sum + el }, 0
        )
        return sum > 0;

    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({
                purchasing: true
            })
        }
        else {
            this.props.history.push('/auth')
        }

    }

    removeModalHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    CheckOutHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = { ...this.props.ings }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = <Spinner />

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger Ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.totalPrice}
                        addIngredient={this.props.onIngAdded}
                        removeIngredient={this.props.onIngRemoved}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuth}
                        orderbtn={this.updatePurchasableState(this.props.ings)}
                        purchase={this.purchaseHandler} />
                </Auxiliary>)
            orderSummary = <OrderSummary
                ingredient={this.props.ings}
                removeModal={this.removeModalHandler}
                success={this.CheckOutHandler}
                totalPrice={this.props.totalPrice} />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} removeModal={this.removeModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isAuth: state.auth.token !== null
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onIngAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onFetchData: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
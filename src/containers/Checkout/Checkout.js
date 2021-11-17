import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData.js';
import { connect } from "react-redux";

class Checkout extends Component {


    checkoutCancelHandle = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        const PurchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
        return (
            <div>
                {PurchaseRedirect}
                {this.props.ings ? null : <Redirect to='/' />}
                <CheckoutSummary ingredients={this.props.ings}
                    cancel={this.checkoutCancelHandle}
                    continue={this.checkoutContinueHandler} />
                <Route path='/checkout/contact-data' component={ContactData} />
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);


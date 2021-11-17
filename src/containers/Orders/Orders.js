import React, { Component } from "react";
import Order from "../../components/Order/Order";
import *as actionTypes from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
    }
    render() {

        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.Order.map((order, key) => {
                return (
                    <Order
                        key={key + 'data'}
                        price={order.price}
                        ingredients={order.ingredients} />
                )
            })
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Order: state.order.order,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actionTypes.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
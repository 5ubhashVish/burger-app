import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css'
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: "Fastest" },
                        { value: 'cheapest', displayName: "Cheapest" }]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false
    }


    checkValidity = (value, rule) => {
        let isValid = true;

        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }


    orderHandler = (event) => {
        event.preventDefault();

        let formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        }
        this.props.onOrderBurger(order, this.props.token)

    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

        let formValid = true;

        for (let input in updatedForm) {
            formValid = updatedForm[input].valid && formValid
        }
        this.setState({
            orderForm: updatedForm,
            formIsValid: formValid
        })
    }




    render() {
        let formArray = [];
        for (let key in this.state.orderForm) {
            formArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            )
        }


        let form = (<form onSubmit={this.orderHandler}>
            <h1> Please Enter Your Details</h1>

            {formArray.map(formItem =>
                <Input
                    key={formItem.id}
                    elementType={formItem.config.elementType}
                    elementConfig={formItem.config.elementConfig}
                    value={formItem.config.value}
                    valid={!formItem.config.valid}
                    shouldValid={formItem.config.validation}
                    touched={formItem.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formItem.id)} />

            )}
            <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>

        </form>)

        if (this.props.loading === true) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }


}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => { dispatch(orderActions.purchaseBurger(orderData, token)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signUp: true
    }


    switchAuthHandler = (event) => {
        event.preventDefault()
        this.setState(prevState => {
            return { signUp: !prevState.signUp }
        })
    }


    checkValidity = (value, rule) => {
        let isValid = true;

        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid
        }
        if (rule.maxLength) {
            isValid = value.length <= rule.maxLength && isValid
        }
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedConrols = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedConrols
        })

    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp);
    }



    render() {
        let formArray = [];
        for (let key in this.state.controls) {
            formArray.push(
                {
                    id: key,
                    config: this.state.controls[key]
                }
            )
        }

        let form = formArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={!formElement.config.valid}
                shouldValid={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ))

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMsg = null
        if (this.props.error) {
            errorMsg = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null

        if (this.props.isAuth) {
            authRedirect = <Redirect to='/' />
        }


        return (
            <div className={classes.AuthData}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType="Success" >Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthHandler}
                    btnType="Danger">
                    Switch to {this.state.signUp ? 'Sign-in' : 'Sign-up'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, psw, signUp) => dispatch(actions.auth(email, psw, signUp))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);
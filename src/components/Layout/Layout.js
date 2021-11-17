import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from "react-redux";


class Layout extends Component {
    state = {
        sideDrawer: true,

    }

    sideDrawerClose = () => {
        this.setState({
            sideDrawer: false
        })
    }

    sideDrawerToggle = () => {
        this.setState(
            (prevState) => {
                return { sideDrawer: !prevState.sideDrawer }
            })
    }


    render() {
        return (
            <Auxiliary>
                <Toolbar drawToggle={this.sideDrawerToggle} isAuth={this.props.authenticated} />
                <SideDrawer show={this.state.sideDrawer} removeModal={this.sideDrawerClose} isAuth={this.props.authenticated} ></SideDrawer> : null
                <div>sideDrawer,backdrop, toolbar</div>
                <main className={classes.layout} >
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }

};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps, null)(Layout)
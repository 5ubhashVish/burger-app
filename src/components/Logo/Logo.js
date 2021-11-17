import React from 'react';
import Burgerlogo from '../../assests/images/burger_logo.jpg';
import classes from './Logo.css'

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{ height: props.height }}>
            <img src={Burgerlogo} alt="My Burger" />
        </div>
    )
}

export default logo;
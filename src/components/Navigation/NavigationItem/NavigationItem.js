import React from 'react';
import classes from './NavigationItem.css';
import NavItem from './NavItem/NavItem';

const NavigationItem = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/" exact>Burger Builder</NavItem>
            {props.isAuth ?
                <NavItem link="/Orders" >Orders</NavItem>
                : null
            }
            {
                !props.isAuth ?
                    <NavItem link="/auth" >Authenticate</NavItem> :
                    <NavItem link="/logout" >Logout</NavItem>
            }
        </ul>
    )
}

export default NavigationItem;
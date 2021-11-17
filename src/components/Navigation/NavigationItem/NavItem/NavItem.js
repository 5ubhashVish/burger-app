import React from 'react';
import classes from './NavItem.css'
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
    return (

        <li className={classes.NavItem} >
            <NavLink
                exact={props.exact}
                activeClassName={classes.active}
                to={props.link}>
                {props.children}</NavLink>
        </li>

    )
}

export default NavItem;
import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl.js'

const controls = [
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' }
]


const buildControls = (props) => {
    return <div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.price}</strong></p>
        {controls.map((ctrl, key) => {
            return <BuildControl
                added={() => props.addIngredient(ctrl.type)}
                remove={() => props.removeIngredient(ctrl.type)}
                key={key + 'data'}
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]} />
        })}
        <button className={classes.OrderButton}
            onClick={props.purchase}
            disabled={!props.orderbtn}>
            {props.isAuth ? ' Order Now' : 'Sign-up to Order Now'}
        </button>
    </div>
}

export default buildControls;
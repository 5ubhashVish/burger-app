import React from 'react';
import classes from './Order.css'

const order = (props) => {
    return (
        <div className={classes.Order}>
            {props.ingredients ? <div> Ingredients :&nbsp;
               Bacon({props.ingredients.bacon})&nbsp;
               Meat({props.ingredients.meat})&nbsp;
               Salad({props.ingredients.salad})&nbsp;
               Cheese({props.ingredients.cheese})
                    </div> : null}

            <div>Price : <strong>INR {props.price}</strong></div>
        </div>
    )

}

export default order;
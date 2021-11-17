import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const IngrediantsSummary = Object.keys(props.ingredient).map(
        (igKey, key) => {
            return <li key={key + igKey} ><span style={{ textTransform: 'capitalize' }} > {igKey} </span>:{props.ingredient[igKey]}    </li>
        }
    )
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {IngrediantsSummary}
            </ul>
            <p><strong>Total Price:{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={'Danger'} clicked={props.removeModal} >Cancel</Button>
            <Button btnType={'Success'} clicked={props.success}>Continue</Button>


        </Auxiliary>
    )

}
export default orderSummary;
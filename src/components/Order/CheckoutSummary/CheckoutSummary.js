import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste better</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger Ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.continue}>Continue </Button>

        </div>
    )
}

export default CheckoutSummary;
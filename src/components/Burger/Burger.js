import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient.js';

const burger = (props) => {
    let RecIngredients = Object.keys(props.Ingredients).map((igKey) => {
        return [...Array(props.Ingredients[igKey])].map((_, key) => {
            return <BurgerIngredient key={igKey + key} type={igKey} />
        });
    })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (RecIngredients.length === 0) {
        RecIngredients = <p>Please start adding the ingredients</p>
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {RecIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}


export default burger;
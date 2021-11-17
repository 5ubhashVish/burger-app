import React from 'react';
import classes from './Input.css'

const input = (props) => {
    let inputElement = null

    const Inputclass = [classes.InputElement];

    if (props.valid && props.shouldValid && props.touched) {
        Inputclass.push(classes.Invalid)
    }


    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                onChange={props.changed}
                className={Inputclass.join(' ')}
                {...props.elementConfig} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                onChange={props.changed}
                className={Inputclass.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('select'):
            inputElement = <select
                onChange={props.changed}
                className={Inputclass.join(' ')}
                value={props.value} >
                {props.elementConfig.options.map(option =>
                    <option key={option.value} value={option.value}> {option.displayName} </option>)}
            </select>;
            break;
        default:
            inputElement = <input
                onChange={props.changed}
                className={Inputclass.join(' ')}
                {...props.elementConfig} value={props.value} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
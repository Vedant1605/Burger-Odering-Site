import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses=[classes.InputElement]
    let validationError = null;
    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;;
    }
   

    switch (props.elementType) {
        case ('input'):
            inputElement = 
            <input className={inputClasses.join(' ')}
            {...props.elementConfig} 
            value={props.value}  onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = <select 
            className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}  onChange={props.changed}>
                {props.elementConfig.options.map(option=><option value={option.value} key={option.value} >{option.displayValue}</option>)}
            </select>
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} />
            break;

        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}
export default input;
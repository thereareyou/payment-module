import React, { useState } from "react";
import Button, { ButtonType } from "../Button/Button";
import './Input.css';

interface InputProps {
    inputLabel: string;
    children?: string;

    disabled?: boolean;
}

function Input({ inputLabel, children, ...restProps }: InputProps) {

    const [inputFieldValue, setInputFieldValue] = useState(children === undefined ? '' : children)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputFieldValue(event.target.value);
    }
    
    return(
        <div className="input">
            <span className="label-wrapper">
                {inputLabel !== undefined && <label className="label input__label">{inputLabel}</label>}
            </span>
            <div className="container input__container">
                <div className="input__content">
                    <input
                        {...restProps}
                        className="input__control"
                        value={inputFieldValue}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Input;
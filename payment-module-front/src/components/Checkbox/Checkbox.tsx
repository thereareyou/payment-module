import React, { useEffect, useState } from 'react';
import './Checkbox.css';

import checkIconSrc from '../../icons/checkIcon.svg';

interface CheckboxProps {
    children: string;
    value: boolean;
    onChange?: (newCheckboxValue: boolean) => void;
}

function Checkbox({ children, value, onChange }: CheckboxProps) {

    const [checkboxValue, setCheckboxValue] = useState<boolean>(value);
 
    const handleChange = () => {
        setCheckboxValue((prev) => !prev);
    }

    useEffect(() => {
        onChange && onChange(checkboxValue);
    }, [checkboxValue])

    return (
        <div className={`checkbox${checkboxValue === true ? ' active' : ''}`}>
            <label>
                <span className="checkbox__check-img-wrapper">
                    <img className="checkbox__check-img" src={checkIconSrc} alt=""/>
                </span>
                <input className="checkbox__control" type="checkbox" checked={checkboxValue} onChange={handleChange} />
                <span className="checkbox__label">{children}</span>
            </label>
        </div>
    );
}

export default Checkbox;
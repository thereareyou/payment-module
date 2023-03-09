import React from "react";
import Button, { ButtonType } from "../Button/Button";
import './Select.css';
import '../Input/Input.css';

import dropdownIconSrc from '../../icons/dropdownIcon.svg';

interface SelectProps {
    selectLabel: string;
    options: React.ReactNode;
}

function Select({ selectLabel, options }: SelectProps) {
    return (
        <div className="select">
            {selectLabel && (
                <span className="label-wrapper">
                    <label className="label select__label">{selectLabel}</label>
                </span>
            )}
            <div className="container select__container">
                <div className="select__selector">
                    <span className="select__selector-content">{options}</span>
                    <div className="select__selector-control-buttons">
                        <div className="button__icon-wrapper">
                            <Button buttonType={ButtonType.Textual} iconSrc={dropdownIconSrc} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Select;
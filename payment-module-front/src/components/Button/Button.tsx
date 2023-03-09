import React, { useState } from 'react';
import './Button.css';

import downArrowIconSrc from '../../icons/downArrowIcon.svg';

export enum ButtonType {
    Primary,
    Textual,
    Control
}

interface ButtonProps {
    children?: string;
    iconSrc?: string;
    buttonType: ButtonType;
    dropdownContent?: React.ReactNode;
    isVisible?: boolean;

    onClick?: () => void;
    disabled?: boolean;
    title?: string;
}

function Button({ children, iconSrc, buttonType, dropdownContent, isVisible = true, ...restProps }: ButtonProps) {

    const [dropdownWindowIsExpanded, setDropdownWindowIsExpanded] = useState(false);

    const buttonTypesClasses = {
        [ButtonType.Primary]: ['primary-button'],
        [ButtonType.Textual]: ['textual-button'],
        [ButtonType.Control]: ['control-button'] 
    }

    return (
        <>
            {!(iconSrc === undefined && children === undefined) && (
                <span
                    style={{
                        position: 'relative',
                        display: 'flex',
                        ...(!isVisible && {display: 'none'})
                    }}
                >
                    <div className="button-wrapper">
                        <button 
                            {...restProps}
                            className={'button ' + 
                                `${buttonTypesClasses[buttonType].join(' ')} ` +
                                `${children === undefined ? 'textual-button_padding_0px' : ''}`
                            }
                        >
                            {iconSrc !== undefined && <img className="button__icon" src={iconSrc} alt=""/>}
                            {children !== undefined && <span className="button__text">{children}</span>}
                            {(buttonType === ButtonType.Control && dropdownContent) && (
                                <div
                                    className="control-button-dropdown"
                                    onClick={(event) => {
                                        setDropdownWindowIsExpanded(!dropdownWindowIsExpanded);
                                        event.stopPropagation();
                                    }}
                                >
                                    <img className="control-button-dropdown__icon" src={downArrowIconSrc} alt=""/>
                                </div>
                            )}
                        </button>
                    </div>
                    {dropdownWindowIsExpanded && (
                        <div className="dropdown-window">
                            <ul className="dropdown-window__menu">
                                <li>{dropdownContent}</li>
                            </ul>
                        </div>
                    )}
                </span>
            )}
        </>
    );
}

export default Button;
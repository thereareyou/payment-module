import React, { useState } from "react";
import Button, { ButtonType } from "../Button/Button";
import './ModalWindow.css';



import closeIconSrc from '../../icons/closeIcon.svg';

interface ModalWindowProps {
    children: React.ReactNode;
    modalWindowTitle: string;
    isModalWindowOpen: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    onClose: () => void;
}

function ModalWindow({ children, modalWindowTitle, isModalWindowOpen = false, onSubmit, onCancel, onClose}: ModalWindowProps) {
    return (
        <>
            {isModalWindowOpen && (
                <>
                    <div className="overlay"></div>
                    <div className="modal-window">
                        <div className="modal-window__header">
                            <span className="modal-window__header-title">{modalWindowTitle}</span>
                            <Button buttonType={ButtonType.Textual} iconSrc={closeIconSrc} onClick={onClose}></Button>
                        </div>
                        {children !== undefined && (
                            <div className="modal-window__body">
                                {children}
                            </div>
                        )}
                        <div className="modal-window__footer">
                            <Button buttonType={ButtonType.Textual} onClick={onCancel}>Отмена</Button>
                            <Button buttonType={ButtonType.Primary} onClick={onSubmit}>ОК</Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default ModalWindow;
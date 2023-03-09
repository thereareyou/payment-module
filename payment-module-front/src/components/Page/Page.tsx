import React, { useState } from 'react';
import Button, { ButtonType } from '../Button/Button';
import ObjectRegistry from '../ObjectRegistry/ObjectRegistry';
import './Page.css';

import backIconSrc from '../../icons/backIcon.svg';

interface PageProps {
    pageTitle: string;
}

function Page({ pageTitle }: PageProps) {

    const [currentPageTitle, setCurrentPageTitle] = useState<string>(pageTitle);

    return (
        <>
            <div className="header">
                <div className="header-icon-wrapper">
                    <Button iconSrc={backIconSrc} buttonType={ButtonType.Textual} />
                </div>
                <div className="header-title-wrapper">
                    <span className="header-title">{currentPageTitle}</span>
                </div>
            </div>
            <div className="body">
                <ObjectRegistry
                    objectCollectionPath="/products"
                    registryName={currentPageTitle}
                ></ObjectRegistry>
            </div>
        </>
    );
}

export default Page;
import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './components/Page/Page';
import './index.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Page pageTitle={"Реестр по умолчанию для \"Product\""} />
    </React.StrictMode>
);

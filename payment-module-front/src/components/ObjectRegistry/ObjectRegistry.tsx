import React, { useState, useEffect } from 'react';
import Button, { ButtonType } from '../Button/Button';
import Select from '../Select/Select';
import Table from '../Table/Table';
import ModalWindow from '../ModalWindow/ModalWindow';
import Input from '../Input/Input';
import Section from '../Section/Section';
import Checkbox from '../Checkbox/Checkbox';
import Basket from '../Basket/Basket';
import './ObjectRegistry.css';


import plusIconSrc from '../../icons/plusIcon.svg';
import editIconScr from '../../icons/editIcon.svg';
import crossIconSrc from '../../icons/crossIcon.svg';
import refreshIconSrc from '../../icons/refreshIcon.svg';
import saveIconSrc from '../../icons/saveIcon.svg';
import settingsIconSrc from '../../icons/settingsIcon.svg';
import basketIconSrc from '../../icons/basketIcon.svg';


interface ObjectStructure<T> {
    [propertyName: string]: T;
}

export type RegistryObjectStructure<T> = ObjectStructure<T> & {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface ObjectRegistryProps {
    objectCollectionPath: string;
    registryName: string;
}

function ObjectRegistry({ objectCollectionPath, registryName }: ObjectRegistryProps) {
    
    const [registryContent, setRegistryContent] = useState<RegistryObjectStructure<string | number>[]>([]);
    const [visibleRegistryColumns, setVisibleRegistryColumns] = useState<string[]>([]);
    const [visibleRegistryContent, setVisibleRegistryContent] =
        useState<RegistryObjectStructure<string | number>[]>([]);

    const [selectedRegistryObject, setSelectedRegistryObject] =
        useState<RegistryObjectStructure<string | number> | undefined>(undefined);

    const [registryRepresentationSettingsWindowIsOpen, setRegistryRepresentationSettingsWindowIsOpen] =
        useState<boolean>(false);
    const [basketWindowIsOpen, setBasketWindowIsOpen] = useState<boolean>(false);

    const [nameObjectRegistry, setNameObjectRegistry] = useState<string>(registryName);

    const [basketButtonVisibility, setBasketButtonVisibility] = useState<boolean>(false);
    const [basketButtonVisibilityCheckboxValue, setBasketButtonVisibilityCheckboxValue] =
        useState<boolean>(basketButtonVisibility);

    const fetchObjectList = (objectCollectionPath: string) => {
        fetch(objectCollectionPath)
            .then(response => response.json())
            .then(result => setRegistryContent(result)) 
    };

    const shapeVisibleRegistryContent = (): RegistryObjectStructure<string | number>[] => {
        const visibleRegistryContent: RegistryObjectStructure<string | number>[] =
            registryContent.map(registryObject => {
                const visibleRegistryContentObject: any = {};
                for(let visibleRegistryColumn of visibleRegistryColumns) {
                    visibleRegistryContentObject[visibleRegistryColumn] = registryObject[visibleRegistryColumn];
                }
                return visibleRegistryContentObject;
            });
        return visibleRegistryContent;
    };

    useEffect(() => {
        fetchObjectList(objectCollectionPath);
    }, [objectCollectionPath]);

    useEffect(() => {
        setVisibleRegistryColumns(registryContent.length > 0 ?
            Object.keys(registryContent[0]) :
            []
        );
    }, [registryContent]);

    useEffect(() => {
        setVisibleRegistryContent(shapeVisibleRegistryContent);
    }, [visibleRegistryColumns]);

    const getPathToRegistryObject = (registryObjectId: number): string => {
        return objectCollectionPath + `/${registryObjectId}`;
    }

    const transmitSelectedRegistryObjectIdentifier = (registryObjectIdentifier: number | undefined) => {
       
        if(registryObjectIdentifier === undefined) {
            setSelectedRegistryObject(undefined);
            return;
        }

        fetch(getPathToRegistryObject(registryObjectIdentifier))
            .then(response => response.json())
            .then(result => setSelectedRegistryObject(result))
    };

    const openRegistryRepresentationSettingsWindow = () => {
        setRegistryRepresentationSettingsWindowIsOpen(true);
    };

    const closeRegistryRepresentationSettingsWindow = () => {
        setRegistryRepresentationSettingsWindowIsOpen(false);
    };

    const handleChangeBasketButtonVisibilityCheckboxValue = (newCheckboxValue: boolean) => {
        setBasketButtonVisibilityCheckboxValue(newCheckboxValue);
    };

    const onSubmitRegistryRepresentationSettingsWindow = () => {
        setBasketButtonVisibility(basketButtonVisibilityCheckboxValue);
        closeRegistryRepresentationSettingsWindow();
    };

    const onCloseBasketWindow = () => {
        setBasketWindowIsOpen(false);
    };

    const handleBasketControlClick = () => {
        if(selectedRegistryObject === undefined) {
            setBasketWindowIsOpen(true);
            return;
        }

        fetch('/basket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(selectedRegistryObject)
        })
    };

    return (
        <div>
            <div className="controls-field">
                <div className="controls-field__content-controls">
                <Button
                    iconSrc={plusIconSrc}
                    buttonType={ButtonType.Control}
                    dropdownContent={<></>}
                />
                <Button
                    iconSrc={editIconScr}
                    buttonType={ButtonType.Control}
                    dropdownContent={<></>}
                    disabled={selectedRegistryObject === undefined}
                />
                <div className="controls-field__content-controls-group">
                    <Button
                        iconSrc={crossIconSrc}
                        buttonType={ButtonType.Control}
                        disabled={selectedRegistryObject === undefined}
                    />
                    <Button iconSrc={refreshIconSrc} buttonType={ButtonType.Control} />
                    <Button iconSrc={saveIconSrc} buttonType={ButtonType.Control} />
                </div>
                <Button
                    iconSrc={settingsIconSrc}
                    buttonType={ButtonType.Control}
                    dropdownContent={<></>}
                    onClick={openRegistryRepresentationSettingsWindow}    
                />
                <Button
                    iconSrc={basketIconSrc}
                    buttonType={ButtonType.Control}
                    dropdownContent={<>Настройка</>}
                    onClick={handleBasketControlClick}
                    isVisible={basketButtonVisibility}
                ></Button>
                </div>
            </div>
            <div className="content">
                {registryContent.length !== 0 &&
                <Table
                    tableColumnHeaders={visibleRegistryColumns}
                    tableContent={visibleRegistryContent}
                    onClickTableRow={transmitSelectedRegistryObjectIdentifier}
                />}
            </div>
            <ModalWindow
                isModalWindowOpen={registryRepresentationSettingsWindowIsOpen}
                modalWindowTitle={registryName}
                children={
                    <>
                        <Section>
                            <div className="section-content-wrapper">
                                <div className="content-column">
                                    <Input inputLabel="Наименование *">{registryName}</Input>
                                    <Select selectLabel="Представление" options={'Плоский реестр'} />
                                </div>
                                <div className="content-column">
                                    <Select selectLabel="Тип объекта" options={'Product'} />
                                </div>
                            </div>
                        </Section>
                        <Section sectionHeader="Панель управления">
                            <div className="section-content-wrapper">
                                <Select selectLabel="Режим выделения" options={'Единичный выбор'} />
                            </div>
                            <div className="section-sub-header">
                                <h4 className="sub-header">Настройка кнопок</h4>
                                <hr className="sub-header-hr" />
                            </div>
                            <div className="section-content-wrapper">
                                <div className="content-column">
                                    <Checkbox value={true}>Показывать кнопку добваления</Checkbox>
                                    <Checkbox value={true}>Показывать кнопку изменения</Checkbox>
                                    <Checkbox value={true}>Показывать кнопку обновления</Checkbox>
                                    <Checkbox value={true}>Показывать кнопку удаления</Checkbox>
                                </div>
                                <div className="content-column">
                                    <Checkbox value={true}>Показывать кнопку сохранения</Checkbox>
                                    <Checkbox value={true}>Показывать кнопку настроек</Checkbox>
                                    <Checkbox
                                        value={basketButtonVisibility}
                                        onChange={handleChangeBasketButtonVisibilityCheckboxValue}
                                    >Показывать кнопку корзины</Checkbox>
                                </div>
                            </div>
                        </Section>
                    </>
                }
                onSubmit={onSubmitRegistryRepresentationSettingsWindow}
                onCancel={closeRegistryRepresentationSettingsWindow}
                onClose={closeRegistryRepresentationSettingsWindow}
            />
            {basketWindowIsOpen && <Basket
                basketRecordCollectionPath="/basket"
                onClose={onCloseBasketWindow}
            />}
        </div>
    );
}

export default ObjectRegistry;

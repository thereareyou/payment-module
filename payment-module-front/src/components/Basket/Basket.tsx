import React, { useEffect, useState } from 'react';
import useScript from '../../hooks/useScript';
import { RegistryObjectStructure } from '../ObjectRegistry/ObjectRegistry';
import Button, { ButtonType } from '../Button/Button';
import Tab from '../Tab/Tab';
import './../ModalWindow/ModalWindow.css';
import './Basket.css';

import infoIconSrc from '../../icons/infoIcon.svg';
import cogwheelIconSrc from '../../icons/cogwheelIcon.svg';
import closeIconSrc from '../../icons/closeIcon.svg';
import increaseIconSrc from '../../icons/increaseIcon.svg';
import decreaseIconSrc from '../../icons/decreaseIcon.svg';
import deleteIconSrc from '../../icons/deleteIcon.svg';

interface BasketRecordStructure {
    id: number;
    product: RegistryObjectStructure<string | number>;
    quantity: number;
    totalPrice: number;
}

interface BasketProps {
    basketRecordCollectionPath: string;
    onClose: () => void;
}

interface ReceiptItem {
    label: string;
    price: number;
    quantity: number;
    amount: number;
    vat: number;
}

interface Receipt {
    Items: ReceiptItem[];
    taxationSystem: number;
    email: string;
    phone?: string;
    amounts: {
        electronic: number;
    }
}

function Basket({ basketRecordCollectionPath, onClose }: BasketProps) {

    const [basketPrice, setBasketPrice] = useState<number>(0);
    const [basketRecords, setBasketRecords] = useState<BasketRecordStructure[]>([]);

    // temporarily
    const [basketUserIdentifier, setBasketUserIdentifier] = useState('guardianoffaithll@gmail.com');

    const fetchBasketRecordList = (basketRecordCollectionPath: string) => {
        fetch(basketRecordCollectionPath)
            .then(response => response.json())
            .then(result => setBasketRecords(result));
    };

    const getPathToOrderRecord = (orderRecordId: number): string => {
        return basketRecordCollectionPath + `/${orderRecordId}`;
    }

    const deleteOrderRecord = (orderRecordId: number) => {
        
        fetch(getPathToOrderRecord(orderRecordId), {
            method: 'DELETE'
        })
            .then(() => {
                fetchBasketRecordList(basketRecordCollectionPath);
            })
    }

    const updateOrderRecord = (orderRecordId: number,
                               updatedBasketRecord: BasketRecordStructure) => {
        fetch(getPathToOrderRecord(orderRecordId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(updatedBasketRecord)
        })
            .then(() => {
                fetchBasketRecordList(basketRecordCollectionPath);
            })
    }

    useScript('https://widget.cloudpayments.ru/bundles/cloudpayments.js');

    const createReceipt = (): Receipt => {
        const receipt: Receipt = {
            Items: basketRecords.map((basketRecord: BasketRecordStructure): ReceiptItem => {
                return {
                    label: basketRecord.product.title,
                    price: basketRecord.product.price,
                    quantity: basketRecord.quantity,
                    amount: basketRecord.totalPrice,
                    // vat will be receiving from basket settings
                    vat: 10
                }
            }),
            // taxationSystem also will be receiving from basket settings
            taxationSystem: 0,
            // basket user e-mail
            email: basketUserIdentifier,
            amounts: {
                electronic: basketPrice
            }
        }

        return receipt;
    }

    const payForBasket = () => {

        // @ts-ignore
        var widget = new cp.CloudPayments();
        widget.pay('charge',
            {
                // from basket settings
                publicId: 'test_api_00000000000000000000002',
                description: `Заказ №${999999}`,
                amount: basketPrice,
                // also from basket settings
                currency: 'RUB',
                accountId: basketUserIdentifier,
                // from orders database
                invoiceId: '999999',
                email: basketUserIdentifier,
                requireEmail: false,
                // from settings
                skin: 'modern',
                data: {
                    CloudPayments: {
                        CustomerReceipt: createReceipt()
                    }
                }
            }
        )
    };


    useEffect(() => {
        fetchBasketRecordList(basketRecordCollectionPath);
    }, [basketRecordCollectionPath]);

    useEffect(() => {

        const calculateBasketPrice = () => {
            let total = 0;
            basketRecords.map((basketRecord: BasketRecordStructure) => {
                total += basketRecord.totalPrice;
            })
            setBasketPrice(+total.toFixed(2));
        };

        calculateBasketPrice();
    }, [basketRecords]);

    return (
        <>
            <div className="overlay"></div>
            <div className="basket-window">
                <div className="basket-window__header">
                    <span className="basket-window__controls-wrapper">
                        <div className="basket-window__controls">
                            <Button
                                buttonType={ButtonType.Textual}
                                iconSrc={infoIconSrc}
                            />
                            <Button
                                buttonType={ButtonType.Textual}
                                iconSrc={cogwheelIconSrc}
                            />
                            <Button
                                buttonType={ButtonType.Textual}
                                iconSrc={closeIconSrc}
                                onClick={onClose}
                            />
                        </div>
                    </span>
                </div>
                <div className="basket-window__body">
                    <Tab 
                        navigationTabs={['Корзина', 'Активность']}
                        navigationContent={[
                            (<div className="basket-content">
                                <div className="order-info">
                                    <div className="order-info__header-wrapper">
                                        <div className="order-info__header">
                                            <span>Наименование</span>
                                            <span>Цена</span>
                                            <span>Кол-во</span>
                                            <span>Итого</span>
                                        </div>
                                    </div>
                                    <div className="order-info__order-records">
                                        {basketRecords.map((record: BasketRecordStructure, index: number) => {
                                            return (
                                                <div className="order-record" key={index}>
                                                    <div
                                                        className="order-record__field-wrapper"
                                                        key={`name-field-wrapper-${index}`}
                                                    >
                                                        <div
                                                            className="order-record__control-wrapper"
                                                            key={`delete-control-wrapper-${index}`}    
                                                        >
                                                            <Button
                                                                buttonType={ButtonType.Textual}
                                                                iconSrc={deleteIconSrc}
                                                                onClick={() => {
                                                                    deleteOrderRecord(record.id)
                                                                }}
                                                            />
                                                        </div>
                                                        <span
                                                            key={`name-field-${index}`}
                                                            title={record.product.title}
                                                        >{record.product.title}</span>
                                                    </div>
                                                    <div
                                                        className="order-record__field-wrapper"
                                                        key={`price-field-wrapper-${index}`}
                                                    >
                                                        <span
                                                            key={`price-field-${index}`}
                                                        >{record.product.price}</span>
                                                    </div>
                                                    <div
                                                        className="order-record__field-wrapper"
                                                        key={`quantity-field-wrapper-${index}`}
                                                    >
                                                        <span
                                                            key={`quantity-field-${index}`}
                                                        >{record.quantity}</span>
                                                        <div
                                                            className="order-record__two-controls-wrapper"
                                                            key={`increase-and-decrease-control-wrapper-${index}`}
                                                        >
                                                            <Button
                                                                buttonType={ButtonType.Textual}
                                                                iconSrc={increaseIconSrc}
                                                                disabled={record.quantity >= record.product.quantity}
                                                                onClick={() => {
                                                                    record.quantity += 1;
                                                                    updateOrderRecord(record.id, record);
                                                                }}
                                                            />
                                                            <Button
                                                                buttonType={ButtonType.Textual}
                                                                iconSrc={decreaseIconSrc}
                                                                disabled={record.quantity === 1}
                                                                onClick={() => {
                                                                    record.quantity -= 1;
                                                                    updateOrderRecord(record.id, record);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="order-record__field-wrapper"
                                                        key={`totalPrice-field-wrapper-${index}`}
                                                    >
                                                        <span
                                                            key={`totalPrice-field-${index}`}
                                                        >{record.totalPrice.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="order-info__total">
                                        <span></span>
                                        <span>Всего: {basketPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="buy-button-wrapper">
                                    <Button
                                        buttonType={ButtonType.Primary}
                                        children={`Оплатить`}
                                        onClick={payForBasket}
                                    />
                                </div>
                            </div>),
                            (<>
                                <span>Bang</span>
                            </>)
                        ]}
                    />
                </div>
            </div>
        </>
    );
}

export default Basket;
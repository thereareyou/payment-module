import React, { useState } from "react";
import { RegistryObjectStructure } from '../ObjectRegistry/ObjectRegistry';
import './Table.css';



interface TableProps {
    tableColumnHeaders: string[];
    tableContent: RegistryObjectStructure<string | number>[];
    onClickTableRow: (registryObjectIdentifier: number | undefined) => void;
}


function Table( { tableColumnHeaders, tableContent, onClickTableRow }: TableProps ) {
    
    const [selectedObjectIdentifier, setSelectedObjectIdentifier] = useState<number | undefined>(undefined);
    
    const handleTableRowClick = (tableRowObjectIdentifier: number) => {

        const currentSelectedRegistryObjectIdentifier =
            tableRowObjectIdentifier === selectedObjectIdentifier ? undefined : tableRowObjectIdentifier;
        setSelectedObjectIdentifier(currentSelectedRegistryObjectIdentifier);
        onClickTableRow(currentSelectedRegistryObjectIdentifier);
    }

    return (
        <div className="table">
            <div className="table__header-wrapper">
                <table className="table__header">
                    <thead>
                        <tr className="table__header-row">
                            {tableColumnHeaders.map((columnHeader, index) => {
                                return (
                                    <th className="table__header-cell" key={`${index}`}>
                                        <div className="table__header-cell-content" key={`${index}`}>
                                            {columnHeader.charAt(0).toUpperCase() + columnHeader.slice(1)}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="table__body-wrapper">
                <table className="table__body">
                    <tbody>
                        {tableContent.map(tableRow => {
                            return (
                                <tr
                                    className={`table__row${selectedObjectIdentifier === tableRow.id ? ' selected-table-row' : ''}`}
                                    key={tableRow.id}
                                    onClick={() => {handleTableRowClick(tableRow.id)}}
                                >
                                    {tableColumnHeaders.map((columnHeader, index) => {
                                        return (
                                            <td className="table__row-cell" key={`${tableRow.id}-${index}`}>
                                                {tableRow[columnHeader]}
                                            </td>
                                        );
                                    })}
                                </tr> 
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;
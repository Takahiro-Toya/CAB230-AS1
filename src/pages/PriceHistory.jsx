import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStockPriceData } from "../Api.js";
import { Spinner } from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

let companyInfo = null;

/**
 * Convert data fetched through Api.js to table-friendly data
 * @param {data object} props 
 */
const dataFormatter = (props) => {
    if (props.type == Array) {
        props.map(d => ({
            date: d.timestamp,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
            volumes: d.volumes
        }))
        return props
    } else {
        return ([{
            date: props.timestamp,
            open: props.open,
            high: props.high,
            low: props.low,
            close: props.close,
            volumes: props.volumes
        }])
    }
}

export default function PriceHistory(props) {
    companyInfo = props.location.state.companyInfo
    const { loading, data, error } = useStockPriceData(companyInfo.symbol);
    const columns = [
        { headerName: "Date", field: "date", sortable: true, filter: true },
        { headerName: "Open", field: "open", sortable: true, filter: true },
        { headerName: "High", field: "high", sortable: true, filter: true },
        { headerName: "Low", field: "low", sortable: true, filter: true },
        { headerName: "Close", field: "close", sortable: true, filter: true },
        { headerName: "Volumes", field: "volumes", sortable: true, filter: true }
    ]
    const defaultColDef = {
        width: 180,
        resizable: true
    }

    if (loading) {
        return <Spinner color="danger" />
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>
    }

    return (
        <main>
            <div className="container">
                <div className="ag-theme-balham"
                    style={{
                        height: "200px",
                        width: "auto",
                        marigin: "auto"
                    }}>
                    <p>{companyInfo.name}</p>
                    <p>{companyInfo.symbol}</p>
                    <p>{companyInfo.industry}</p>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={data.error ? [] : dataFormatter(data)}
                        pagination={true}
                        paginationPageSize={25}
                        overlayNoRowsTemplate={companyInfo === null ? (data.error ? data.message : "No record found") : "Specify company symbol"}
                        defaultColDef={defaultColDef} />
                </div>
            </div>
        </main>
    );
}
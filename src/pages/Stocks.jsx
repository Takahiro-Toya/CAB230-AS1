import React, { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Spinner } from 'reactstrap';
import useCompanyList from '../Api.js'
import { Link, Redirect, Route } from "react-router-dom";
import PriceHistory from "./PriceHistory";

export default function Stocks() {
    const [companyInfo, setCompanyInfo] = useState(null);
    const [search, setSearch] = useState("");
    const { loading, companies, error } = useCompanyList(search);
    const columns = [
        { headerName: "Name", field: "name", sortable: true, filter: true, suppressSizeToFit: true },
        { headerName: "Symbol", field: "symbol", sortable: true, filter: true, suppressSizeToFit: true },
        { headerName: "Industry", field: "industry", sortable: true, filter: true, suppressSizeToFit: true }
    ]
    const defaultColDef = {
        width: 300,
        resizable: true
    }

    const rowClicked = (props) => {
        setCompanyInfo(props.data);
    }

    if (companyInfo !== null) {
        return <Redirect push to={{
            pathname: "/price-history",
            state: {companyInfo}
        }}
        />;
    }

    if (loading) {
        return <Spinner color="danger" />
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>
    }

    return (
        <main className="company-list-page-container">
            <div>
                <SearchBar onSubmit={setSearch} />
            </div>
            <div className="container">
                <div className="ag-theme-balham"
                    style={{
                        height: "800px",
                        width: "auto",
                        marigin: "auto"
                    }}>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={companies.error ? [] : companies}
                        pagination={true}
                        paginationPageSize={25}
                        overlayNoRowsTemplate={companies.error ? companies.message : "no record found"}
                        onRowClicked={e => rowClicked(e)}
                        defaultColDef={defaultColDef}
                    />
                </div>
            </div>
        </main>
    );
}

function SearchBar(props) {
    return (
        <div>
            <input
                aria-labelledby="search-button"
                name="search"
                id="search"
                type="search"
                placeholder="type industry name"
                onChange={(e) => props.onSubmit(e.target.value)}
            />
        </div>
    )
}
import React, { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Spinner } from 'reactstrap';
import useCompanyList from '../Api.js'
import { Link, Redirect } from "react-router-dom";
import SearchBar from "../widgets/SearchBar.js"

export default function Stocks() {
    const [selected, setSelected] = useState(null);
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
        setSelected(props.data);
    }

    if (selected !== null) {
        return <Redirect push to={{
            pathname: "/price-history",
            state: {selected}
        }}
        />;
    }

    if (loading) {
        return <Spinner color="danger" />
    }
    if (error) {
        return (
        <div>
            <p>Something went wrong: {error.message}</p>
            <Link to="/home">Back...</Link>
        </div>
        )
    }

    return (
        <main className="company-list-page-container">
            <div>
                <SearchBar onSubmit={setSearch} placeholder="type industry name"/>
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


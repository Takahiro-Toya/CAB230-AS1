import React, { useState, useContext } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { Spinner, Input, FormGroup, Form, Label } from 'reactstrap';
import useCompanyList from '../management/Api.js'
import { Link, Redirect } from "react-router-dom";

function IndustrySearch(props) {
    return (
        <div>
            <Form className="search_section">
                <FormGroup>
                    <Label>Type search term</Label>
                    <Input
                        type="search"
                        placeholder="type industry name"
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>OR</Label>
                </FormGroup>
                <FormGroup>
                    <Label>Select from category</Label>
                    <Input type="select" onChange={e => props.onChange(e.target.value)}>
                        <option> </option>
                        <option>Health Care</option>
                        <option>Financials</option>
                        <option>Industrials</option>
                        <option>Real Estate</option>
                        <option>Consumer Discretionary</option>
                        <option>Materials</option>
                        <option>Information Technology</option>
                        <option>Energy</option>
                        <option>Consumer Staples</option>
                        <option>Telecommunication Services</option>
                        <option>Utilities</option>
                    </Input>
                </FormGroup>
            </Form>
        </div>
    );
}

export default function Stocks() {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const { loading, companies, uncontrolledError } = useCompanyList(search);
    const columns = [
        { headerName: "Name", field: "name"},
        { headerName: "Symbol", field: "symbol", filter: "agTextColumnFilter", filterParams: { filterOptions: ["startsWith"] }},
        { headerName: "Industry", field: "industry"}
    ]
    const defaultColDef = {
        flex: 1,
        filter: true,
        sortable: true
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
    if (uncontrolledError) {
        return (
        <div>
            <p>Something went wrong: {uncontrolledError.message}</p>
            <Link to="/">Back...</Link>
        </div>
        )
    }

    return (
        <main className="pagebody">
            <IndustrySearch onChange={e => setSearch(e)}/>
            <div>
                <div className="ag-theme-alpine-dark"
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


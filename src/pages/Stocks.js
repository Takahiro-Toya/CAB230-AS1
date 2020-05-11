import React, { useState } from "react";
import { Spinner, Alert } from 'reactstrap';
import useCompanyList from '../management/Api.js'
import { Redirect } from "react-router-dom";
import { CompanyListTable } from "../widgets/StockTables.js";
import { IndustrySearch } from "../widgets/SearchForms.js";
import { ForceRedirect } from "../widgets/ErrorHandler.js";

export default function Stocks() {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const { loading, statusCode, data, uncontrolledError } = useCompanyList(search);

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
        return <ForceRedirect message={uncontrolledError.message}/>
    }

    return (
        <main className="pagebody">
            {statusCode===404 ? <Alert color="danger">Oops! {data.message}</Alert> : null}
            <IndustrySearch onChange={e => setSearch(e)}/>
            <CompanyListTable data={data} rowClicked={rowClicked}/>
        </main>
    );
}


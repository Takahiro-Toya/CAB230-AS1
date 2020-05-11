import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useStockPriceData } from "../management/Api.js";
import { Spinner, Button, Container, Row, Col, Alert } from "reactstrap";
import { LoginStatus } from '../App'
import { StockDatePicker } from "../widgets/SearchForms.js";
import { CandleStickChart, LineChart } from "../widgets/StockCharts.js";
import { StockTable } from "../widgets/StockTables.js"; 
import { ModalLogin } from "../widgets/AuthenticationForm.js";
import { ForceRedirect } from "../widgets/ErrorHandler.js";

/**
 * Price history page
 * @param {*} props Selected company data {name, symbol, industry}
 */
export default function PriceHistory(props) {
    const [loggedIn, setLoggedIn] = useContext(LoginStatus);
    const [companyInfo, setCompanyInfo] = useState(props.location.state === undefined ? null : props.location.state.selected)
    const [range, setDateRange] = useState({start: null, end: new Date()})
    const { loading, statusCode, data, uncontrolledError } = useStockPriceData(companyInfo===null ? "" : companyInfo.symbol, 
                                                                                range.start, 
                                                                                range.end,
                                                                                loggedIn)

    const shouldSearch = (start, end) => {
        setDateRange({ start: start, end: end })
    }

    const [modalVisible, setModalVisible] = useState(false);
    const toggleModalVisible = () => setModalVisible(!modalVisible);

    // redirect to previous page if copmany info is not selected
    // this can happen when the user types URL (../price-history) directly in the browser
    if (companyInfo===null) {
        return <Redirect to="/stocks"/>
    }

    if (loading) {
        return <Spinner color="danger" />
    }

    // network error
    if (uncontrolledError) {
        return <ForceRedirect message={uncontrolledError.message}/>
    }

    return (
        <main>
            <div className="pagebody">
                { /* show alerts according to status code */}
                {statusCode===403 ? <Alert color="danger">{"Oops! Something wrong! Logout and login again!"}</Alert> : null}
                {statusCode===404 ? <Alert color="danger">Sorry {data.message}</Alert> : null}
                <ModalLogin isOpen={modalVisible} toggle={toggleModalVisible}/>
                <Container className="company-info-container">
                    <Row>
                        <Col>{companyInfo.name}</Col>
                        <Col>{companyInfo.symbol}</Col>
                        <Col>{companyInfo.industry}</Col>
                    </Row>
                </Container>
                <div>
                    { /* date pickers are hidden when NOT logged in, instead a button to let then user login is shown */}
                    {loggedIn ?
                    <StockDatePicker onDateSubmit={(a, b) => shouldSearch(a, b)}/> :
                    <Button className="button" color="warning" onClick={toggleModalVisible}>Login to see price history!</Button>}
                </div>
                <StockTable data={data} height={300}/>
                { /* Show charts only when logged in */}
                {loggedIn ? <LineChart data={data} height={90}/> : null}
                {loggedIn ? <CandleStickChart data={data} height={350}/> : null}
            </div>
        </main>
    );
}
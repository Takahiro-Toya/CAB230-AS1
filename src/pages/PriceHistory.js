import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useStockPriceData } from "../management/Api.js";
import { Spinner, Button, Container, Row, Col } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import { LoginStatus } from '../App'
import {ModalLogin} from "../components/Modal.js";


const dateFormatter = (timestamp) => {
    let date = new Date(timestamp);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

/**
 * Convert data fetched through Api.js to table-friendly data
 * 
 * @param {data object} data 
 */
const dataFormatter = (data) => {
    try {
        return data.map(d => ({
            date: dateFormatter(d.timestamp),
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
            volumes: d.volumes
        }));
    } catch {
        return ([{
            // date: dateFormatter(props.timestamp),
            date: dateFormatter(data.timestamp),
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volumes: data.volumes
        }])
    }
}

const LineChartData = (prop) => {
    return {
        labels: prop.map(d => dateFormatter(d.date)).reverse(),
        datasets: [{
            label: 'Close price',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: prop.map(d => d.close).reverse()
        }]
    }
}

function StockDatePicker(props) {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(new Date());
    const submit = (start, end) => {
        props.onDateSubmit(start, end);
    }

    return (
        <div className="date-range-pickers">
            <p>From:</p>
            <DatePicker selected={start} onChange={e => setStart(e)} dateFormat="dd-MM-yyyy"/>
            <Button className="v" color="info" onClick={() => setStart(null)}>×</Button>
            <p>To:</p>
            <DatePicker selected={end} onChange={e => {e===null ? setEnd(new Date()) : setEnd(e)}} dateFormat="dd-MM-yyyy"/>
            <Button color="warning" onClick={() => {submit(start, end)}}>Search</Button>
        </div>
    );
}

export default function PriceHistory(props) {
    const [loggedIn, setLoggedIn] = useContext(LoginStatus);
    const [companyInfo, setCompanyInfo] = useState(props.location.state === undefined ? null : props.location.state.selected)
    const [range, setDateRange] = useState({start: null, end: new Date()})
    const { loading, data, uncontrolledError } = useStockPriceData(companyInfo===null ? "" : companyInfo.symbol, 
                                                                    loggedIn ? range.start : null, 
                                                                    loggedIn ?  range.end : null,
                                                                    loggedIn)
    const columns = [
        { headerName: "Date", field: "date" },
        { headerName: "Open", field: "open", sortable: true, filter: true },
        { headerName: "High", field: "high", sortable: true, filter: true },
        { headerName: "Low", field: "low", sortable: true, filter: true },
        { headerName: "Close", field: "close", sortable: true, filter: true },
        { headerName: "Volumes", field: "volumes", sortable: true, filter: true }
    ]
    const defaultColDef = {
        flex: 1
    }

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
    if (uncontrolledError) {
        return (
            <div>
                <p>Something went wrong: {uncontrolledError.message}</p>
                <Link to="/stocks">Back...</Link>
            </div>
        );
    }

    return (
        <main>
            <div className="pagebody">
                <ModalLogin 
                    isOpen={modalVisible}
                    toggle={toggleModalVisible}
                />
                <Container className="company-info-container">
                    <Row>
                        <Col>{companyInfo.name}</Col>
                        <Col>{companyInfo.symbol}</Col>
                        <Col>{companyInfo.industry}</Col>
                    </Row>
                </Container>
                <div>
                    {loggedIn ?
                    <StockDatePicker onDateSubmit={(a, b) => shouldSearch(a, b)}/> :
                    <Button className="button" color="warning" onClick={toggleModalVisible}>Login to see price history!</Button>}
                </div>
                <div className="ag-theme-alpine-dark"
                    style={{
                        height: "300px",
                        width: "auto",
                        marigin: "auto"
                    }}>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={data.error ? [] : dataFormatter(data)}
                        pagination={true}
                        paginationPageSize={25}
                        overlayNoRowsTemplate={data.error ? data.message : "No record found"}
                        defaultColDef={defaultColDef} />
                </div>
                {loggedIn ?
                    <Line data={LineChartData(dataFormatter(data))} />
                    : null
                }
            </div>
        </main>
    );
}
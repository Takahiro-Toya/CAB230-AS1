import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStockPriceData } from "../Api.js";
import { Spinner, Button } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";

const dateFormatter = (timestamp) => {
    let date = new Date(timestamp);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

/**
 * Convert data fetched through Api.js to table-friendly data
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

let startDate = null;
let endDate = null;


function StockDatePicker(props) {
    const [innerStart, setInnerStart] = useState(null);
    const [innerEnd, setInnerEnd] = useState(null)

    return (
        <div className="company-info-container">
            <p>Start date:</p>
            <DatePicker selected={innerStart} onChange={e => {setInnerStart(e); startDate = e; }}/>
            <p>End date:</p>
            <DatePicker selected={innerEnd} onChange={e => {setInnerEnd(e); endDate = e}}/>
            <Button onClick={() => props.onDateSubmit()}>Search</Button>
        </div>
    );    
}

const LineChartData = (prop) => {
    return {
        labels: prop.map(d => dateFormatter(d.date)).reverse(),
        datasets: [{
            label: 'Close price line chart',
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

export default function PriceHistory(props) {
//     companyInfo = props.location.state===undefined ? "" : props.location.state.selected;
    const [companyInfo, setCompanyInfo] = useState(props.location.state===undefined ? "" : props.location.state.selected)
    const [range, setDateRange] = useState({start: startDate, end: endDate});
    const { loading, data, error } = useStockPriceData(companyInfo.symbol, range.start, range.end);
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
    const shouldSearch = () => {
        // force endDate to be current Date
        if (endDate === null) {
            endDate = new Date();
        }
        setDateRange({start: startDate, end: endDate})
    }

    if (loading) {
        return <Spinner color="danger" />
    }
    if (error) {
        return (
            <div>
                <p>Something went wrong: {error.message}</p>
                <Link to="/stocks">Back...</Link>
            </div>
        );
    }

    return (
        <main>
            <div className="container">
                <div className="company-info-container">
                    <p>{companyInfo.name}</p>
                    <p>{companyInfo.symbol}</p>
                    <p>{companyInfo.industry}</p>
                </div>
                {(localStorage.getItem("loginStatus")==="ON") ? 
                    <div className="company-info-container">
                        <StockDatePicker onDateSubmit={shouldSearch}/>
                    </div> :
                    <div>
                        <Link to="/login" color="warning">Login to see price history!</Link>
                    </div>
                }
                <div className="ag-theme-balham"
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
                {(localStorage.getItem("loginStatus")==="ON") ? 
                    <Line data={LineChartData(dataFormatter(data))}/>
                    : null
                }
            </div>
        </main>
    );
}
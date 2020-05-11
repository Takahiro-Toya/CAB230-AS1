import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { dataFormatter } from "../helpers/Formatters.js";

/**
 * Company list table
 * @param {*} props data: response object {name, symbol, industry} OR {error, message}
 */
export function CompanyListTable(props) {
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
    
    return (
        <div className="ag-theme-alpine-dark"
            style={{
                height: "800px",
                width: "auto",
                marigin: "auto"
            }}>
            <AgGridReact
                columnDefs={columns}
                rowData={props.data.error ? [] : props.data}
                pagination={true}
                paginationPageSize={25}
                overlayNoRowsTemplate={props.data.error ? props.data.message : "no record found"}
                onRowClicked={e => props.rowClicked(e)}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}

/**
 * Price history data table
 * @param {} props data: response objecct (no need to pre-convert)
 *                  height: height of this view
 */
export function StockTable(props) {
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

    return (
        <div className="ag-theme-alpine-dark"
            style={{
                height: props.height,
                width: "auto",
                marigin: "auto"
            }}>
            <AgGridReact
                columnDefs={columns}
                rowData={props.data.error ? [] : dataFormatter(props.data)}
                pagination={true}
                paginationPageSize={25}
                overlayNoRowsTemplate={props.data.error ? props.data.message : "No record found"}
                defaultColDef={defaultColDef} />
        </div>
    );
}
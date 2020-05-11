import React from "react";
import { Line } from "react-chartjs-2";
import ReactApexChart from "react-apexcharts";
import { dataFormatter, dataFormatterForCandleStick, LineChartData } from "../helpers/Formatters.js";

/**
 * Line Chart view
 * @param {*} props data: set of price history data (no need to convert)
 *                  height: chart view height
 */
export function LineChart(props) {
    return (
        <Line data={LineChartData(dataFormatter(props.data))} height={props.height} />
    )
}

/**
 * Candle stick view
 * @param {*} props data: set of data (no need to convert)
 *                  height: chart view height
 */
export function CandleStickChart(props) {

    const candleOptions = {
        chart: {
            type: 'candlestick',
            height: props.height
        },
        title: {
            text: 'CandleStick Chart',
            align: 'center'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "20%"
            }
        }
    };

    const series = [{
        data: dataFormatterForCandleStick(props.data)
    }]

    return (
        <ReactApexChart options={candleOptions} type="candlestick" height={props.height} series={series}/> 
    );
}
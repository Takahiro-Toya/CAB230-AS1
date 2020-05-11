
/**
 * Converts timestamp to format (YYYY-MM-DD);
 * @param {timestamp} timestamp 
 */
const dateFormatter = (timestamp) => {
    let date = new Date(timestamp);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

/**
 * Converts fetched data to table friendly data
 * @param {data object from api (json-ed)} data 
 */
export const dataFormatter = (data) => {
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

/**
 * Converts price history data for candle stick chart
 * @param {price history data object} data 
 */
export const dataFormatterForCandleStick = (data) => {
    return dataFormatter(data).map(d => ({
        x: d.date,
        y: [d.open, d.high, d.low, d.close]
    }));
}

/**
 * Converts price history data for line chart 
 * @param {price history data object} prop 
 */
export const LineChartData = (prop) => {
    return {
        labels: prop.map(d => dateFormatter(d.date)).reverse(),
        datasets: 
        [
            {
            label: 'Close price',
            fill: false,
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
import { useState, useEffect } from 'react'

const baseURL = `http://131.181.190.87:3000/`;

/**
 * Returns fetch result 
 * @param {string} industry 
 */
function getCompanyList(industry = "") {
    if (industry !== "") {
        return (
            fetch(baseURL + `stocks/symbols/?industry=${industry}`)
        );
    } else {    
        return (
            fetch(baseURL + 'stocks/symbols/')
        );
    }
}

/**
 * Format timestamp to the format used in from/to parameter in
 *  /stockes/authed/{symbol}/from...
 * @param {string} timestamp 
 */
const dateAsParameter = (timestamp) => {
    const fullDate = new Date(timestamp);
    const date = ("0" + fullDate.getDate()).slice(-2);
    const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
    return fullDate.getFullYear() + "-" + month + "-" + date;
}

/**
 * Returns stock prices between 'from' Date to 'to' Date
 * @param {string} symbol 
 * @param {string} from 
 * @param {string} to 
 */
function getStocksForSymbol(symbol, from = null, to = null, useDateRange = false) {
    if (useDateRange) {
        const url = baseURL + `stocks/authed/${symbol}?from=${dateAsParameter(from)}&to=${dateAsParameter(to)}`
        const token = sessionStorage.getItem("token");
        const token_type = sessionStorage.getItem("token_type");
        const header = { accept: "application/json", Authorization: `${token_type} ${token}`};
        return fetch(url, {
            method: "GET",
            headers: header
        })
    } else {
        return fetch(baseURL + `stocks/${symbol}`)
    }
}

/**
 * A hook for company list
 * @param {string} industry 
 */
export default function useCompanyList(industry = "") {
    const [loading, setLoading] = useState(true);
    const [statusCode, setStatusCode] = useState(null);
    const [data, setData] = useState([]);
    const [uncontrolledError, setUncontrolledError] = useState(false);
    useEffect(() => {
        getCompanyList(industry)
            .then((res) => {
                const status = res.status;
                const data = res.json()
                return Promise.all([status, data])
            })
            .then(res => {
                setLoading(false);
                setStatusCode(res[0]);
                setData(res[1]);
            })
            .catch((e) => {
                setUncontrolledError(e);
                setLoading(false);
            });
    }, [industry]);

    return {
        loading,
        statusCode,
        data,
        uncontrolledError,
    };
}

/**
 * A hook for price history 
 * @param {string} symbol 
 * @param {string} from 
 * @param {string} to 
 * @param {boolean} useDateRange 
 */
export function useStockPriceData(symbol, from=null, to=new Date(), useDateRange=false) {
    const [loading, setLoading] = useState(true);
    const [statusCode, setStatusCode] = useState(null);
    const [data, setData] = useState([]);
    const [uncontrolledError, setUncontrolledError] = useState(false);
    useEffect(() => {
        getStocksForSymbol(symbol, from, to, useDateRange)
            .then((res) => {
                const status = res.status;
                const data = res.json();
                return Promise.all([status, data])
            })
            .then(res => {
                setLoading(false);
                setStatusCode(res[0]);
                setData(res[1]);
            })
            .catch((e) => {
                setUncontrolledError(e);
                setLoading(false);
            })

    }, [symbol, from, to])
    return {
        loading,
        statusCode, 
        data,
        uncontrolledError
    }
}

/**
 * Requests registering new memer
 * @param {string} email 
 * @param {string} password 
 */
export function register(email, password) {
    const url = baseURL + "user/register";
    return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({email: email, password: password})
    })
    .then(res => {
        const statusCode = res.status;
        const data = res.json();
        return Promise.all([statusCode, data]);
    }).then(res => {
        return {
            statusCode: res[0],
            data: res[1]
        }
    })
}

/**
 * Requests token to the server
 * @param {string} email 
 * @param {string} password 
 */
export function login(email, password) {
    const url = baseURL + "user/login";
    return fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({email: email, password: password})
    })
    .then(res => {
        const statusCode = res.status;
        const data = res.json();
        return Promise.all([statusCode, data]);
    }).then(res => {
        return {
            statusCode: res[0],
            data: res[1]
        }
    })
}
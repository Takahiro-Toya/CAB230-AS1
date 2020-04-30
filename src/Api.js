import { useState, useEffect } from 'react'

const baseURL = `http://131.181.190.87:3000/`;

/**
 * Returns 
 *  Company name, Company symbol, Industry 
 */
function getCompanyList(industry = "") {
    if (industry !== "") {
        return (
            fetch(baseURL + `stocks/symbols/?industry=${industry}`)
            .then((res) => res.json())
        );
    } else {    
        return (
            fetch(baseURL + 'stocks/symbols/')
            .then((res) => res.json())
        );
    }
}

const dateAsParameter = (timestamp) => {
    const fullDate = new Date(timestamp);
    const date = ("0" + fullDate.getDate()).slice(-2);
    const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
    return fullDate.getFullYear() + "-" + month + "-" + date;
}

/**
 * Returns stock prices between 'from' Date to 'to' Date
 * @param {company symbol} symbol 
 * @param {start date} from 
 * @param {end date} to 
 */
function getStocksForSymbol(symbol, from = null, to = null) {
    if (from !== null || to !== null) {
        const url = baseURL + `stocks/authed/${symbol}?from=${dateAsParameter(from)}&to=${dateAsParameter(to)}`
        const token = localStorage.getItem("token");
        const token_type = localStorage.getItem("token_type");
        const header = { accept: "application/json", Authorization: `${JSON.parse(token_type)} ${JSON.parse(token)}`};
        return fetch(url, {
            method: "GET",
            headers: header
        })
        .then((res) => res.json())
    } else {
        return fetch(baseURL + `stocks/${symbol}`)
        .then((res) => res.json())
    }

}

export default function useCompanyList(industry = "") {
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        getCompanyList(industry)
            .then((companies) => {
                setCompanies(companies);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    }, [industry]);

    return {
        loading,
        companies,
        error,
    };
}

export function useStockPriceData(symbol, start=null, end=null) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        getStocksForSymbol(symbol, start, end)
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            })

    }, [symbol, start, end])
    return {
        loading, 
        data,
        error
    }
}

export function register(email, password) {
    const url = `http://131.181.190.87:3000/user/register`;
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
    }).catch(e => {
        return {
            statusCode: e[0],
            data: null
        }
    })
}

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
    }).catch(e => {
        return {
            statusCode: e[0],
            data: null
        }
    })
}
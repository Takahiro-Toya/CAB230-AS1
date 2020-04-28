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

/**
 * Returns stock prices between 'from' Date to 'to' Date
 * @param {company symbol} symbol 
 * @param {start date} from 
 * @param {end date} to 
 */
export function getStocksForSymbol(symbol, from = null, to = null, token=null) {
    if (token != null) {
        return fetch(baseURL + `stocks/authed/${symbol}?from=${from}&to=${to}`)
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

export function useStockPriceData(symbol, start=null, end=null, token=null) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        getStocksForSymbol(symbol, start, end, token)
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            })

    }, [symbol, start, end, token])
    return {
        loading, 
        data,
        error
    }
}
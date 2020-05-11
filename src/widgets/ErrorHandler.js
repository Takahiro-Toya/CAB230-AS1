import React from "react";
import { Link } from "react-router-dom";

/**
 * Call this when uncontrolled error (e.g. network error) happened
 * @param {*} props error message
 */
export function ForceRedirect(props) {
    return (
        <div>
            <p>Something went wrong: {props.message}</p>
            <Link to="/">Back...</Link>
        </div>
    )
}

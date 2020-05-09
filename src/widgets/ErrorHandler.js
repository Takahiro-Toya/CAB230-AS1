import React from "react";
import { Link } from "react-router-dom";

export function ForceRedirect(props) {
    return (
        <div>
            <p>Something went wrong: {props.message}</p>
            <Link to="/">Back...</Link>
        </div>
    )
}

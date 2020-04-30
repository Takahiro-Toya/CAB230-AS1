import React from "react"

export default function SearchBar(props) {
    return (
        <div>
            <input
                aria-labelledby="search-button"
                name="search"
                id="search"
                type="search"
                placeholder={props.placeholder}
                onChange={(e) => props.onSubmit(e.target.value)}
            />
        </div>
    )
}
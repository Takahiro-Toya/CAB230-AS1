import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function StockDatePicker(props) {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(new Date());
    const submit = (start, end) => {
        props.onDateSubmit(start, end);
    }

    return (
        <div className="date-range-pickers">
            <p>From:</p>
            <DatePicker selected={start} onChange={e => setStart(e)} dateFormat="dd-MM-yyyy"/>
            <Button className="v" color="info" onClick={() => setStart(null)}>×</Button>
            <p>To:</p>
            <DatePicker selected={end} onChange={e => {e===null ? setEnd(new Date()) : setEnd(e)}} dateFormat="dd-MM-yyyy"/>
            <Button color="warning" onClick={() => {submit(start, end)}}>Search</Button>
        </div>
    );
}

export function IndustrySearch(props) {
    return (
        <div>
            <Form className="search_section">
                <FormGroup>
                    <Label>Type search term</Label>
                    <Input
                        type="search"
                        placeholder="type industry name"
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>OR</Label>
                </FormGroup>
                <FormGroup>
                    <Label>Select from category</Label>
                    <Input type="select" onChange={e => props.onChange(e.target.value)}>
                        <option> </option>
                        <option>Health Care</option>
                        <option>Financials</option>
                        <option>Industrials</option>
                        <option>Real Estate</option>
                        <option>Consumer Discretionary</option>
                        <option>Materials</option>
                        <option>Information Technology</option>
                        <option>Energy</option>
                        <option>Consumer Staples</option>
                        <option>Telecommunication Services</option>
                        <option>Utilities</option>
                    </Input>
                </FormGroup>
            </Form>
        </div>
    );
}
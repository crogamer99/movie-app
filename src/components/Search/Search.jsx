import React from "react";
import CustomNavbar from "../Navbar/CustomNavbar";
import "./Search.css";
import { Form, FormControl, Button, Row, } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Search() {

    document.title = "Search | Watch series";
    const [isLoaded, setLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("movie");

    function handleChange(e) {
        setSearchQuery({ searchQuery: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&include_adult=false&query=${searchQuery.searchQuery}`
        fetch(url)
            .then(results => results.json())
            .then(data => {
                setResults(data.results)
                setLoaded(true)
                console.log(data.results);
            })
    }

    function chagneType(){
        if(searchType == "movie"){
            setSearchType("tv");
        }
        else{
            setSearchType("movie");
        }
    }

    if (!isLoaded) {
        return (
            <div>
                <CustomNavbar />
                <div className="typeChange">
                <Button className="custom-button type-change" onClick={chagneType} type="button">Change Movie/Series</Button>
                <h2>You are now searching {searchType}</h2>
                </div>
                
                
                <div className="custom-container-search">
                    <h3 className="search-title">What are you looking for</h3>
                    <p className="search-subtitle">We've got everything you're looking for! Come, explore</p>

                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <FormControl type="search" placeholder="Enter your search term..." onChange={handleChange} className="input-search" />
                        <Button className="custom-button" type="submit">Search</Button>
                    </Form>
                </div>
            </div>
        )
    } else if(searchType == "movie"){
        return (
            <div>
                <CustomNavbar />
                <Row>
                    {results.map(results =>
                        <div key={results.id} className="mapped-results col-sm-3 col-sm-pull-12">
                            <Link to={`/view/${searchType}/${results.id}`}>
                                <p className="mapped-title">{results.original_title}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`} className="mapped-image" alt={results.original_title} />
                            </Link>
                        </div>
                        )}
                </Row>
            </div>
        )
    } else{
        return (
            <div>
                <CustomNavbar />
                <Row>
                    {results.map(results =>
                        <div key={results.id} className="mapped-results col-sm-3 col-sm-pull-12">
                            <Link to={`/view/${searchType}/${results.id}`}>
                                <p className="mapped-title">{results.original_name}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`} className="mapped-image" alt={results.original_name} />
                            </Link>
                        </div>
                        )}
                </Row>
            </div>
        )
    }

}
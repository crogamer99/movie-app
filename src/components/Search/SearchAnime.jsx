import React from "react";
import CustomNavbar from "../Navbar/CustomNavbar";
import "./SearchAnime.css";
import { Form, FormControl, Button, Row, } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchAnime() {

    document.title = "Search | Watch series";
    const [isLoaded, setLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    function handleTyping(e) {
        setSearchQuery(e.target.value)
    }

    function handleSubmitA(e) {
        e.preventDefault();
        const url = `https://api.jikan.moe/v4/anime?sfw=true&sort=desc&order_by=type&q=${searchQuery}`
        fetch(url)
            .then(data => data.json())
            .then(results => {
                setResults(results.data)
                setLoaded(true)
            })
    }

    if (!isLoaded) {
        return (
            <div>
                <CustomNavbar />

                <div className="custom-container-search">
                    <h3 className="search-title">What anime you looking for</h3>
                    <p className="search-subtitle">We've got everything you're looking for! Come, explore</p>

                    <Form className="d-flex" onSubmit={handleSubmitA}>
                        <FormControl type="search" placeholder="Enter your search term..." onChange={handleTyping} className="input-searchs" />
                        <Button className="custom-button" type="submit">Search</Button>
                    </Form>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <CustomNavbar />
                <Row>
                    {results?.map(anime => 
                        <div key={anime.mal_id} className="mapped-results col-sm-3 col-sm-pull-12">
                            <Link to={`/view/anime/${anime.mal_id}`}>
                                <p className="mapped-title">{anime.title}</p>
                                <img src={anime.images.jpg.large_image_url} alt={anime.title} className="mapped-image" />
                            </Link>
                        </div>
                    )}
                </Row>
            </div>
        )
    }
}
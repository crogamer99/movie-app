import React, { useEffect } from "react";
import { useState } from "react";
import CustomNavbar from "../../Navbar/CustomNavbar";
import "./MovieDetails.css";
import { Link, useParams } from "react-router-dom"

const API_KEY = process.env.REACT_APP_API_KEY;

export default function MovieDetails(movieID) {

    const [show, setShow] = useState([])
    const params = useParams();
    const url = `https://api.themoviedb.org/3/movie/${params.movieID}?api_key=${API_KEY}`;

    function fetchData() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setShow(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <CustomNavbar />
            <div className="custom-container">
                <img className="title-img" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.original_title} />

                <h3>{show.original_title}</h3>
                <p className="title-tagLine">{show.tagline}</p>

                <p className="title-overview">{show.overview}</p>

                <div className="holder">
                    <a href={show.homepage} className="custom-button">Visit website</a>
                    <Link to={`/rate/${show.id}`} className="custom-button">Rate this movie</Link>
                </div>

                <div className="details">
                    <h5>Audience score</h5>
                    <p>{show.vote_average}</p>

                    <h5>Revenue</h5>
                    <p>${show.revenue?.toLocaleString("de-DE")}</p>

                    <h5>Buget</h5>
                    <p>${show.budget?.toLocaleString("de-DE")}</p>

                    <h5>Rating</h5>
                    <p>{show.adult ? "18+" : "All ages"}</p>

                    <h5>Spoken language</h5>
                    <ul>{show.spoken_languages?.map(spoken_languages =>
                        <li key={spoken_languages.iso_639_1}>
                            {spoken_languages.english_name}
                        </li>
                    )}</ul>
                </div>

            </div>
        </div>
    )
}
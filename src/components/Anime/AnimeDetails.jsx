import React, { useEffect } from "react";
import { useState } from "react";
import CustomNavbar from "../Navbar/CustomNavbar";
import "./AnimeDetails.css";
import { Link, useParams } from "react-router-dom"

export default function AnimeDetails(animeID) {

    const [anime, setAnime] = useState({});
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams();
    const url = `https://api.jikan.moe/v4/anime/${params.animeID}`;

    function fetchData() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAnime(data.data)
                setLoaded(true)
            },
                error => {
                    setError(error)
                    setLoaded(true)
                }
            )
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (!isLoaded) {
        return (<div>Loading</div>)
    } else if (error) {
        return (<div>Error: {error.message}</div>)
    } else {
        const animeGenres = anime.genres;
        const altTitles = anime.title_synonyms;
        return (
            <div>
                <CustomNavbar />
                <div className="custom-container">
                    <h3 className="anime-title">{anime.title}</h3>

                    <img className="title-img" src={anime.images.jpg.large_image_url} alt={anime.title} />

                    <h5>Alternative titles:</h5>
                    <p>{anime.title_english}</p>
                    {altTitles.map(altTitles => (
                        <p className="alternate-titles">{altTitles}</p>
                    ))}
                    <h5>Description:</h5>
                    <p className="title-overview">{anime.synopsis}</p>
                    <h5>Genres:</h5>
                    <div className="title-genres">
                        <ul>
                            {animeGenres.map(animeGenres => (
                                <li key={animeGenres.mal_id}>{animeGenres.name}</li>
                            ))}
                        </ul>
                    </div>
                    <h5>Aired from: {anime.aired.string}</h5>
                </div>
            </div>
        )
    }
}
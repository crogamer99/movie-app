import { React, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./AnimeTop.css";

export default function AnimeTop() {

    const [isLoaded, setLoaded] = useState(false);
    const [results, setResults] = useState([]);

    function fetchData() {
        fetch(`https://api.jikan.moe/v4/top/anime`)
            .then(results => results.json())
            .then(data => {
                setResults(data.data)
                setLoaded(true)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (!isLoaded) {
        return <div>Data is loading...</div>
    } else {
        return (
            <div className="scroll-tray">
                {results.map(results => (
                    <div key={results.mal_id}>
                        <Link to={`/view/anime/${results.mal_id}`}>
                            <img src={results.images.jpg.large_image_url} alt={results.title} className="scroll-tray-image" />
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}
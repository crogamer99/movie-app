import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { AnimeDetails, MovieDetails, Search, SearchAnime, TvDetails } from './components';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />

    <Route path="view/movie" element={<MovieDetails />} >
      <Route path=':movieID' element={<MovieDetails />} />
    </Route>

    <Route path="view/tv" element={<TvDetails />} >
      <Route path=':tvID' element={<TvDetails />} />
    </Route>

    <Route path="view/anime" element={<AnimeDetails />} >
      <Route path=':animeID' element={<AnimeDetails />} />
    </Route>

    <Route path="search" element={<Search />} />

    <Route path="searchanime" element={<SearchAnime />} />
  </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
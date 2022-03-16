import './App.css';
import { CustomNavbar, Trending, AnimeTop } from "./components/index.js"

function App() {
  return (
    <div className='main'>
      <CustomNavbar />
      <div id='hero'>
        <h3 className='trendingHero'>Everything you're looking for. All in one place</h3>
        <p className='trending'>The biggest blockbusters, the boldest stories, andd unforgetable classics that makes us who we are.<br /> All this on <b>WatchTV+*</b></p>
      </div>

      <Trending type="tv"/>
      <Trending type="movie"/>
      <AnimeTop />

      <p className='legal'>&copy; {new Date().getFullYear()} Ivan Herkvi all rights reserved</p>
    </div>
  );
}

export default App;

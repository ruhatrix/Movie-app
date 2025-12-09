// import {useState , useEffect} from 'react'
// const Card= ({ title }) => {
//   const [hasLiked, setHasLiked] = useState(false);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//   console.log(`${title} has been liked: ${hasLiked}`);
// }, [hasLiked]);
  

//   return(
//     <div className="card" onClick={
//       ( )=> setCount(count+1)
//     }>
//       <h2>{title} <br/> {count}</h2>
//       <button onClick={() => setHasLiked(!hasLiked)}>
//         {hasLiked? '❤️' : '🤍'}

//       </button>
//     </div>
//   )
// }

// const App = () => {


//   return (
//     <div className="card-container">
     
//       <Card title="star war" ratings={5} isCool={true}  /> 
//       <Card title="Avatar" />
//       <Card title="The Lion King" />

//     </div>
//   )
// }
// export default App

import React from 'react'
import Search from "./components/Search.jsx"
import Spinner from "./components/Spinner.jsx"
import MovieCard from "./components/MovieCard.jsx"
import {useEffect,useState} from 'react'
import {useDebounce} from 'react-use'
import {updateSearchCount, getTrendingMovies} from './appwrite.js'
const API_BASE_URL="https://api.themoviedb.org/3";
// /discover/movie";
const  API_KEY=import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS={
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const[trendingMovies, setTrendingMovies]=useState([]);

  useDebounce(()=> setDebouncedSearchTerm(searchTerm),600,[searchTerm] )

  const fetchMovies = async(query='')=> {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query
      ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      // alert(response);
      // throw new Error('Failed to fetch movies');
      if(!response.ok){
        throw new Error("Failed to fetch movies");
      }
      const data= await response.json();
      // console.log(data);
      if(data.Response === 'False'){
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;

      }
      setMovieList(data.results || [])
      // updateSearchCount();
     if(query && data.results.length > 0){
      await updateSearchCount(query, data.results[0]);
     }




    } catch(error){
      console.error(`Error fetching movies: ${error};`)
      setErrorMessage('Error fetching movies. please try again later' );
    } finally{
      setIsLoading(false);
    }
  }
  const loadTrendingMovies= async() => {
    try{
        const movies=await getTrendingMovies();
        setTrendingMovies(movies);
    }
    catch(error){
      console.error(`Error fetching movies: ${error};`)


    }
  }
  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm ]);
  useEffect(()=>{
    loadTrendingMovies();
  }, []);


  return (
    <main>
   
  
<div className="pattern" />
  
<div className="wrapper">
  <header className="bg-[url('./BG.png')] bg-cover bg-center bg-no-repeat sm:mt-1 mt-5 relative">
    {/* Logo positioned at top-center of header */}
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      <img 
        src="logo.png" 
        alt="Company Logo" 
        className="h-12 w-auto sm:h-16"
      />
    </div>
    
    <img src="./hero-img.png" alt="hero banner" />
    <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy Without the Hassle  </h1>
    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
  </header>


  {trendingMovies.length>0 &&(
    <section className="trending">
      <h2>Trending Movies</h2>
      <ul>
        {trendingMovies.map((movie,index)=>(
          <li key={movie.$id}>
               <p>{index +1}</p>
               <img src={movie.poster_url} alt={movie.title} />
          </li>
        )
      )}
      </ul>
    </section>
  )}


    <section className="all-movies">
     <h2>All Movies</h2>
     {/* {errorMessage && <p className="text-red-500">{errorMessage}</p> } */}
     {isLoading?(
      // <p className="text-white">Loading...</p>
        < Spinner/>
     ):errorMessage?(
    <p className="text-red-500">{errorMessage}</p>
     ):(
      <ul>
        {movieList.map((movie)=>(
          // <p key={movie.id}  className="text-white">{movie.title}</p>
        <MovieCard key={movie.id} movie={movie}/>
        
        ))}
      </ul>
     )}
    </section>
  
  </div>
   
    </main>
  )
}

export default App
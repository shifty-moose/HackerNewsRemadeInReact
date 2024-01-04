import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {

  // This is defining the the state variable to store fetched News Articles
  const [news, setNews] = useState([]);

  // This is defining the the state variable to store the user's search query. 'React' is the default value on render.
  const [searchQuery, setSearchQuery] = useState('');

  // This is defining the state variable for the current page of news articles
  const [currentPage, setCurrentPage] = useState(0);

  // This is defining a state variable to take the value of the input field
  const [searchSubmitted, setSearchSubmitted] = useState('');

  // This is defining a state variable to check if the API is currently loading
  const [isLoading, setIsLoading] = useState(false);

  // This is defining a state variable to check if the API managed to find results
  const [hasResults, setHasResults] = useState(false);

  // Defining my useEffect hook to fetch the news articles from the API
  useEffect(() => {

    console.log(currentPage);

    // This is the async function that will fetch the news articles from the API
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const page = currentPage;
        const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${searchSubmitted}&page=${page}`);
        const data = await response.json(); //The Hacker News API returns an object with a hits property that contains an array of news articles.
        setNews(data.hits);
        console.log(data);  
        data.nbHits > 0 ? setHasResults(true) : setHasResults(false);
      } catch (error) {
        console.log('Error fetching news articles: ', error);
      }
      setIsLoading(false);
    };

    // Now that I've declared the fetchNews function, I can call it here so that it renders with component mount of changes to the searchQuery state variable.
    fetchNews();


  }, [currentPage, searchSubmitted]); // This is the dependency array. It will run the useEffect hook when the searchQuery or currentPage state variable changes.

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    setSearchSubmitted(searchQuery);
  }

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  const handleDate = (itemDate) => {
    const date = new Date(itemDate);
    const time = date.toLocaleTimeString();
    itemDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    return (
      <p className="dateInfo">{itemDate} at {time}</p>
    );
  };

  return (
    <div className="App">

      <h1 onClick={refreshPage}>Hacker News React</h1>

      <form 
        onSubmit={handleFormSubmit}
        className="inputForm">
          
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleInput} 
          />
        <button 
          type="submit"
          className="submitBtn">Search</button>
      </form>

      {isLoading ? (
        <div className="loading-spinner spinnerDiv">
        </div>
      ) : (

        hasResults ? (
        <div className="resultsDiv">

          <div className="pageButtons">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}>
              Back
            </button>
              <button className="activeNumBtn">{currentPage + 1}</button> 
              <button className="numBtn">{currentPage + 2}</button>
              <button className="numBtn">{currentPage + 3}</button>
              <p>. . .</p>

              <button className="numBtn">{currentPage + 4}</button>

   

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={news.length === 0}>
              Next
            </button>
          </div>

          <ul className="newsItems">
            {news.map((item) => (
              <li key={item.objectID}>
                <div className="itemHead">
                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                {handleDate(item.created_at)}
                </div>
                <div className="itemInfo">
                  <p>Points: {item.points}</p>
                  <p>Author: {item.author}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="pageButtons bottomBtns">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}>
              Back
            </button>
              <button className="activeNumBtn">{currentPage + 1}</button> 
              <button className="numBtn">{currentPage + 2}</button>
              <button className="numBtn">{currentPage + 3}</button>
              <p>. . .</p>

              <button className="numBtn">{currentPage + 4}</button>

   

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={news.length === 0}>
              Next
            </button>
          </div>

        </div> ) : (
          <p>No results found</p>
        )
      )}

    </div>
  );
}

export default App;

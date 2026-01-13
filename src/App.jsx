import { Button, Spinner } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import "./App.css";
import { SimpleCard } from "./SimpleCard"; // Ensure this component is correctly implemented
import Shimmer from "./Components/Shimmer";
import Loader from "./Components/Loader";
import check from "./assets/check.svg";
import errorsvg from "./assets/errorsvg.svg";

function App() {
  const [data, setData] = useState([]); // Use camelCase for state variables
  const [SearchText, setSearchText] = useState("");
  const [SearchQ, setSearchQ] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track if data is loading
  const [firstLoad, setFirstLoad] = useState(true); // State to track if it is the initial load
  const [timedout,setTimedout] = useState(false)

  const fetchData = async (searchQuery) => {
    setTimedout(false);
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://export.arxiv.org/api/query?search_query=all:${
          encodeURIComponent(searchQuery) || "hardware+architecture"
        }&start=0&max_results=50&sortBy=submittedDate&sortOrder=descending`,
        {
          method: "GET",
          
        }
      );

      // Check if the response is okay (status code in the range 200-299)
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      // Parse the XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");

      // Extract entries from the XML
      const entries = xmlDoc.getElementsByTagName("entry");
      const totalResultsElement = xmlDoc.getElementsByTagName('opensearch:totalResults')[0]?.textContent;
      
      totalResultsElement==0?setTimedout(true):setTimedout(false)
      // Add a toast and error message if totalResultsElement ==0  (later) 

      const result = Array.from(entries).map((entry) => {
        
        const title =
          entry.getElementsByTagName("title")[0]?.textContent || "No title";
        const summary =
          entry.getElementsByTagName("summary")[0]?.textContent || "No summary";
        let publishedRaw =
          entry.getElementsByTagName("published")[0]?.textContent.split('T')[0] || "No date";
        if (publishedRaw !== "No date") {
          const publishedDate = new Date(publishedRaw);
          const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Format: Month Day, Year
          publishedRaw = publishedDate.toLocaleDateString('en-US', options);
        } 
        const link= 
          entry.getElementsByTagName("id")[0]?.textContent||"No link";
        return {
          title: title ? title.trim() : "No title available",
          date: publishedRaw ? publishedRaw : "Dates Not found",
          abstract: summary ? summary.trim() : "No abstract available",
          id: link,
        };
      });

      setData(result);
      setIsLoading(false);
      setFirstLoad(false); // After the first load, set firstLoad to false
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoading(false);
      setTimedout(true)
    }
  };
  useEffect(() => {
    fetchData(SearchQ); // Call the async function
  }, []); // Whenever SearchQ change the useEffect will runs

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading true for new searches
    setSearchQ(SearchText);
    fetchData(SearchQ);
  };
  const Cards = () => {
    return (
      <ul className="flex flex-wrap justify-center justify-evenly">
        {data.map((article, index) => (
          <li key={index}>
            <SimpleCard article={article} />
          </li>
        ))}
      </ul>
    );
  };
  const Check = () => {
    return (
      <span>
        <img className="h-9 w-9" src={check} alt="Done!"></img>
      </span>
    );
  };
  const ErrorMsg = () => {
    return (
      <div className="flex flex-col my-5">
        <span className="text-red-900 m-auto">Error Occurred : Not Found</span>
        <img className="m-auto w-full sm:w-1/3" src={errorsvg} alt="NOT FOUND" />
      </div>
    );
  };
  

  
  return (
    <div className="App ">
      <div className="flex justify-center align-middle border-b-4 border-blue-gray-50">
        <div className="flex-col flex-wrap justify-between align-middle mt-5">
          <div className="flex justify-evenly">
            <h1 className="inline">
              {isLoading ? <Spinner className="h-7 w-7 " /> : <Check />}
            </h1>
            <div className="search inline-block sm:mx-3 mx-0 ">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={SearchText}
                  className="border-black border p-1 rounded-md"
                  placeholder="Title"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <Button
                  className="md:ml-2 ml-0"
                  type="submit"
                  color="green"
                  variant="gradient"
                  size="sm"
                  ripple="light"
                  onClick={() => {
                    setSearchQ(SearchText);
                  }}
                >
                  Search
                </Button>
              </form>
            </div>
          </div>

          <h2 className="ml-2 font-serif font-bold text-lg m-3 text-wrap">
            Results for Search : {SearchQ}
          </h2>
        </div>
      </div>

      {timedout? <ErrorMsg/>:isLoading ? firstLoad ? <Shimmer /> : <Loader /> : <Cards />}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

export default function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(
      "https://youtube-v2.p.rapidapi.com/trending/?lang=en&country=in&section=Gaming",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "youtube-v2.p.rapidapi.com",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);
        setVideos(data.videos || []);
        
      });
  }, []);
  
}

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./components/Shimmer";
import VideoCard from "./components/VideoCard";

export default function App() {
  const { section } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef(null);

  const fetchVideos = useCallback(async (pageToken = null) => {
    if (!pageToken) setLoading(true);
    else setLoadingMore(true);

    try {
      const tokenParam = pageToken ? `&pageToken=${pageToken}` : "";
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=12${tokenParam}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );

      const data = await response.json();

      if (!data.items) {
        if (!pageToken) setVideos([]);
        return;
      }

      const formattedVideos = data.items.map((video) => ({
        id: video.id,
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.high.url,
        duration: video.contentDetails?.duration,
        views: video.statistics?.viewCount,
        uploadedAt: video.snippet.publishedAt,
      }));

      if (pageToken) setVideos((prev) => [...prev, ...formattedVideos]);
      else setVideos(formattedVideos);

      setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && nextPageToken && !loadingMore) {
          fetchVideos(nextPageToken);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [nextPageToken, loadingMore, fetchVideos]);

  return (
    <div className="app-container mt-4">
      <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{section ? section.charAt(0).toUpperCase() + section.slice(1) : 'Home'}</h2>
          </div>

          <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, i) => <Shimmer key={i} />)
              : videos.map((v) => <VideoCard key={v.id} video={v} />)}
          </div>

          <div ref={sentinelRef} className="h-6" />

          {loadingMore && (
            <div className="mt-4 flex justify-center">
              <div className="text-sm text-gray-300">Loading more...</div>
            </div>
          )}
        </main>
    </div>
  );
}

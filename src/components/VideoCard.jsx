import { useNavigate } from "react-router-dom";

// Utility function to format duration from ISO 8601 format (PT14M32S -> 14:32)
function formatDuration(duration) {
  if (!duration) return "";
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "";

  const hours = (match[1] || "").slice(0, -1);
  const minutes = (match[2] || "").slice(0, -1);
  const seconds = (match[3] || "").slice(0, -1);

  let timeStr = "";
  if (hours) timeStr += hours + ":";
  timeStr += (minutes || "0").padStart(2, "0") + ":";
  timeStr += (seconds || "0").padStart(2, "0");

  return timeStr;
}

// Utility function to format view count
function formatViews(views) {
  if (!views) return "";
  const num = parseInt(views);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

// Utility function to format uploaded time (e.g., "2 days ago")
function formatUploadTime(publishedAt) {
  if (!publishedAt) return "";
  const published = new Date(publishedAt);
  const now = new Date();
  const diffMs = now - published;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffMs / 604800000);
  const diffMonths = Math.floor(diffMs / 2592000000);
  const diffYears = Math.floor(diffMs / 31536000000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
}

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/watch/${video.id}`)}
      className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
    >
      <div className="w-full aspect-video bg-gray-800 relative group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs font-semibold">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">
          {video.title}
        </h3>

        <p className="text-gray-400 text-xs mt-1">
          {video.channel}
        </p>

        <div className="text-gray-500 text-xs mt-1 flex gap-2">
          {video.views && <span>{formatViews(video.views)} views</span>}
          {video.uploadedAt && <span>•</span>}
          {video.uploadedAt && <span>{formatUploadTime(video.uploadedAt)}</span>}
        </div>
      </div>
    </div>
  );
}

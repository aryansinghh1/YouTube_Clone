import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/watch/${video.id}`)}
      className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
    >
      <div className="w-full aspect-video bg-gray-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">
          {video.title}
        </h3>

        <p className="text-gray-400 text-xs mt-1">
          {video.channel}
        </p>
      </div>
    </div>
  );
}

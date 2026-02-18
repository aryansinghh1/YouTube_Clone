import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ onToggleSidebar }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function submitSearch(e) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate(`/search/${encodeURIComponent(term)}`);
    setQ("");
  }

  return (
    <header className="bg-black/90 border-b border-gray-800 sticky top-0 z-30">
      <div className="app-container flex items-center gap-4 h-16">
        <button
          onClick={onToggleSidebar}
          className="text-xl text-white hover:bg-gray-800 p-2 rounded"
        >
          ☰
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-bold text-xl select-none">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded-md">
              YouTube
            </span>
          </div>
        </Link>

        <form onSubmit={submitSearch} className="flex-1 flex justify-center">
          <div className="w-full max-w-xl flex items-center bg-gray-900/60 rounded-full border border-transparent focus-within:border-gray-700">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent px-4 py-2 outline-none"
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-full mx-1 transition border border-gray-700"
            >
              🔍
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          <button className="text-sm px-3 py-1 border border-gray-700 rounded">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}

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
          <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center text-black font-bold">YT</div>
          <span className="text-lg font-semibold">YouTube Clone</span>
        </Link>

        <form onSubmit={submitSearch} className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full max-w-xl bg-gray-900/60 px-3 py-2 rounded-full outline-none border border-transparent focus:border-gray-700"
          />
        </form>

        <div className="flex items-center gap-3">
          <button className="text-sm px-3 py-1 border border-gray-700 rounded">Sign in</button>
        </div>
      </div>
    </header>
  );
}

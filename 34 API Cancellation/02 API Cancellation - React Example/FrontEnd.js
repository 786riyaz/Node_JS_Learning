import { useState, useEffect } from "react";

export default function SearchProducts() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [controller, setController] = useState(null);

  const handleSearch = async (q) => {
    // Cancel previous request
    if (controller) controller.abort();

    // Create new controller
    const newController = new AbortController();
    setController(newController);

    if (!q) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${q}`, {
        signal: newController.signal,
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request cancelled:", q);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => handleSearch(query), 400);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div>
      <input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}

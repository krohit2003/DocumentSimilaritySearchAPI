import { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://127.0.0.1:8000/api/upload_pdf", formData);
      setUploaded(true);
    } catch (error) {
      console.error("Upload error:", error);
      setUploaded(false);

    }
    setUploading(false);
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/search", {
        params: { query, top_k: 5 },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          📄Document Similarity Search
        </h1>

        {/* Upload Section */}
        <div className="flex flex-col items-center mb-4">
          <input
            type="file"
            className="border p-2 rounded w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUpload}
            className="cursor-pointer mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : uploaded ? "Uploaded" : "Upload PDF"}

          </button>
        </div>

        {/* Search Section */}
        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query..."
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleSearch}
            className="cursor-pointer mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
            disabled={loading || !uploaded}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Results Section */}
        {/* Display Results as a List */}
<div className="mt-6 w-full flex justify-center">
  {results.length > 0 && (
    <div className=" max-w-2xl w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">🔍 Search Results:</h2>
      <ul className="  space-y-4">
        {results.map((res, index) => (
          <li key={index} className="p-4 rounded-lg bg-gray-50 shadow-md">
            <h3 className="font-semibold text-gray-900">Result {index + 1}</h3>
            <div className="max-h-60 overflow-y-auto px-3 py-2 bg-white rounded">
              <ul className="space-y-2">
                {res.chunk.split("\n").map((line, subIndex) => (
                  <li key={subIndex} className="text-gray-700 break-words p-2 border-b">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-600 mt-3">
              <strong>Score:</strong> {res.score.toFixed(4)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

      </div>
    </div>
  );
}

export default App;

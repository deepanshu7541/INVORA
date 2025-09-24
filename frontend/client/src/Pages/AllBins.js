import React, { useEffect, useState } from "react";
import axios from "axios";

const AllBins = () => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/bins", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setBins(response.data.bins);
      }
    } catch (error) {
      console.error("Error fetching bins:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>All Bins</h2>
      {loading ? (
        <p>Loading bins...</p>
      ) : bins.length > 0 ? (
        <ul>
          {bins.map((bin) => (
            <li key={bin._id} style={{ backgroundColor: bin.color, padding: "10px", margin: "5px", color: "white" }}>
              <strong>Bin {bin.binNumber}</strong>
              <br />
              🎨 <strong>Color:</strong> {bin.color.toUpperCase()}
              <br />
              📦 <strong>Items:</strong> {bin.items.length > 0 ? bin.items.join(", ") : "No items"}
              <br />
              🏥 <strong>Room:</strong> {bin.room} {/* Display Room ID */}
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No bins available.</p>
      )}
    </div>
  );
};

export default AllBins;
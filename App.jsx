
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch API data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();

      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>User Details</h1>
        <p>API Integration using React useEffect</p>
      </header>

      <div className="top-section">
        <h2>Users List</h2>

        <button onClick={fetchUsers}>
          Refresh Data
        </button>
      </div>

      {loading ? (
        <h3 className="loading">Loading user details...</h3>
      ) : error ? (
        <h3 className="error">{error}</h3>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-header">
                <span className="user-id">
                  ID: {user.id}
                </span>

                <h3>{user.name}</h3>
                <p>@{user.username}</p>
              </div>

              <div className="user-details">
                <p>
                  <strong>Email:</strong>
                  <span>{user.email}</span>
                </p>

                <p>
                  <strong>Phone:</strong>
                  <span>{user.phone}</span>
                </p>

                <p>
                  <strong>Website:</strong>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

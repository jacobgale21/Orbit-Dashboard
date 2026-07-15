import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, type User } from "../api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setCurrentUser)
      .catch(() => {
        localStorage.clear();
        setError("Session expired");
        navigate("/login");
      });
    console.log(localStorage.getItem("refresh_token"));
  }, [navigate]);

  return (
    <main>
      <h1>Orbit Dashboard</h1>
      <p>Welcome, {currentUser?.username}</p>
      {error && <p>{error}</p>}
    </main>
  );
}

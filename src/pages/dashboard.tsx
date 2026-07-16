import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, type User } from "../api";
import NavBar from "../components/navBar";
import HeroSection from "./hero";
import FeaturedMissions from "./missions";
import SolarSystemPlaceholder from "./solarsystem";
import MissionTimeline from "./timeline";
import CurrentMissions from "./currentMissions";
import Discoveries from "./discoveries";

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <NavBar />

      {/* Main grid */}
      <main>
        {/* panels go here */}
        <HeroSection />
        <FeaturedMissions />
        <SolarSystemPlaceholder />
        <MissionTimeline />
        <CurrentMissions />
        <Discoveries />
      </main>
    </div>
  );
}

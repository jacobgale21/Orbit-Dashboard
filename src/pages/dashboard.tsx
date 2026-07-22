import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, type User } from "../api";
import NavBar from "../components/navBar";
import HeroSection from "./hero";
import FeaturedMissions from "./missions";
import MissionTimeline from "./timeline";
import CurrentMissions from "./currentMissions";
import Discoveries from "./discoveries";
import Destinations from "./destinations";

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
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <NavBar />

      {/* Main grid */}
      <main className="relative min-h-screen overflow-hidden bg-[#05060d] text-slate-100">
        {/* backgrounds — behind everything */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, rgba(88,101,242,0.25), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(236,72,153,0.18), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.1), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 25% 30%, rgba(255,255,255,0.7), transparent), radial-gradient(1px 1px at 75% 60%, rgba(255,255,255,0.55), transparent), radial-gradient(1.5px 1.5px at 40% 80%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 10% 65%, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 90% 15%, rgba(255,255,255,0.6), transparent)",
            backgroundSize: "600px 600px",
          }}
        />

        {/* page content above backgrounds */}
        <div className="relative z-10">
          <HeroSection />
          <FeaturedMissions />
          <MissionTimeline />
          <CurrentMissions />
          <Discoveries />
          <Destinations />
        </div>
      </main>
    </div>
  );
}

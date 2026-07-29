import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Simulator from "./pages/simulator";
import { MapPage } from "./pages/map";
import Future from "./pages/future";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("app")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/future" element={<Future />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>,
);

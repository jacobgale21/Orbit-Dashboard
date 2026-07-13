import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
);

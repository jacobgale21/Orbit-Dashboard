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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chatbot from "./components/chat/chatbot";
import { DependencyGraph } from "./pages/dependencyGraph";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min: don't refetch if data is fresh
      gcTime: 30 * 60 * 1000, // keep unused cache 30 min
      retry: 1,
      refetchOnWindowFocus: false, // optional; catalogs rarely change
    },
  },
});

createRoot(document.getElementById("app")!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/future" element={<Future />} />
          <Route path="/graph" element={<DependencyGraph />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </QueryClientProvider>,
);

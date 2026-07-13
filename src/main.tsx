import { createRoot } from "react-dom/client";
import "./style.css";
import Dashboard from "./pages/dashboard";

createRoot(document.getElementById("app")!).render(<Dashboard />);

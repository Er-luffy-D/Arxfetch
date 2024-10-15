import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Footer } from "./Components/Footer.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Footer/>
  </StrictMode>,
);

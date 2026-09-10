import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { loadTheme, setTheme } from './lib/theme';

setTheme(loadTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

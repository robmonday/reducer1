import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TasksProvider } from "./TasksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TasksProvider>
    <App />
  </TasksProvider>
);

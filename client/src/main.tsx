import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import routes from "./routes/routes";
import { RouterProvider } from "@tanstack/react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

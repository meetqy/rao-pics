import { init } from "@sentry/electron/renderer";
import { init as reactInit } from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

init(
  {
    debug: process.env.NODE_ENV === "development",
  },
  reactInit,
);

const rootEl = document.getElementById("root");

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

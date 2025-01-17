import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { state } from "./data";

// @ts-expect-error Enable testing from the console
window.state = state;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// @ts-expect-error Hack to force a global rerender, for both dev and for future archipelago connections
window.rerender = () =>
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

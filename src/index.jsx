import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./app";

const rootElem = document.getElementById("root");
const root = createRoot(rootElem);

root.render(<App/>);
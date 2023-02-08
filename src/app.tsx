import "./app.css";
import Teste from "./components/teste";
import UI, { UIRef } from "./lib/UI";

import React, { useRef, useEffect, useState } from "react";
import setRef from "./lib/setRef";

const App = () => {
    let uiRef = useRef<UIRef>();

    useEffect(() => {
        if (!uiRef.current) return;

        uiRef.current.addElement(new Teste(3));
    }, [uiRef]);

    return (
        <div>
            <UI
                width={800}
                height={600}
                ref={setRef(uiRef)}
            ></UI>
        </div>
    );
};

export default App;

// const c = document.createElement("canvas");
// c.width = 800;
// c.height = 600;
// c.getContext("2d").fillRect(100, 100, 600, 400);

// document.body.appendChild(c);

// const ui = new UI(c, 800, 600);

// ui.addElement(new Teste());
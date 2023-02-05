import "./app.css"
import Teste from "./components/teste";
import UI from "./lib/UI";

const c = document.createElement("canvas");
c.width = 800;
c.height = 600;
c.getContext("2d").fillRect(100, 100, 600, 400);

document.body.appendChild(c);

const ui = new UI(c, 800, 600);

ui.addElement(new Teste());
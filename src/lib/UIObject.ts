import UI from "./UI";

export default interface UIObject {
    name: string;
    html?: string;
    elem?: HTMLElement

    init: (ui: UI) => void;
    destroy?: () => void;
}

export interface UIConfig {
    position?: {x: number, y: number};
    size?: {x: number, y: number};
    time?: number;
}
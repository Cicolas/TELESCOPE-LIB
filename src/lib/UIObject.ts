import React, { createRef, Ref, useRef } from "react";
import UI from "./UI";

export interface UIProps {
    uuid: string;
}

export type UIReactElement<T = UIProps> = React.FC<T> | React.ForwardRefExoticComponent<T & React.RefAttributes<any>>;
export type UIObjectRef<T = UIProps> = React.RefObject<UIReactElement<T>>;

export default abstract class UIObjectReact {
    name!: string;
    elem!: UIReactElement<any>;
    uuid!: string;
    ref: UIObjectRef = createRef();

    /**
     * this function intercept the props that will be given to the instance
     * @param ui
     * @param props
     * @returns new props
     */
    getProp<T extends UIProps>(ui: UI, props: UIProps): UIProps | T {
        this.uuid = props.uuid;
        return props;
    }

    init?(ui: UI): void {}
}

// export default interface _UIObjectReact {
//     name: string;
//     elem: React.FC<UIProps>;

//     instantiate: (fc: React.FC<UIProps>, ui: UI, props: UIProps) => React.ReactElement;
//     getProp: (ui: UI, props: UIProps) => {};
// // eslint-disable-next-line semi
// }

export interface UIConfig {
    position?: { x: number; y: number };
    size?: { x: number; y: number };
    time?: number;
}

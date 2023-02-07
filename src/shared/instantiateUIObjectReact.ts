import React from "react";
import UI from "../lib/UI";
import UIObjectReact, { UIProps, UIObjectRef } from "../lib/UIObject";

export default function instantiateUIObjectReact(obj: UIObjectReact, ui: UI, props: UIProps): React.ReactElement {
    return React.createElement(obj.elem, {
        ...obj.getProp(ui, props),
        ref: (e: UIObjectRef) => {
            obj.ref = e;
        },
        key: props.uuid,
    });
}
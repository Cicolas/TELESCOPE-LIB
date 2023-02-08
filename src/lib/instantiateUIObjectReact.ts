import React from "react";
import Teste from "../components/teste";
import UI, { UIRef } from "./UI";
import UIObjectReact, { UIProps, UIObjectRef } from "./UIObject";

export default function instantiateUIObjectReact(obj: UIObjectReact, props: UIProps): React.ReactElement {
    return React.createElement(obj.elem, {
        ...obj.getProp(props),
        ref: (e: UIObjectRef) => {
            obj.ref = e;
        },
        key: props.uuid,
    });
}
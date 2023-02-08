import React, { Component, createRef, CSSProperties, forwardRef, ReactElement, useEffect, useImperativeHandle, useRef, useState } from "react";
import Teste from "../components/teste";
import instantiateUIObjectReact from "./instantiateUIObjectReact";
import setRef from "./setRef";
import UIObjectReact, { UIConfig } from "./UIObject";

interface Props {
    canvas?: HTMLElement;
    width: number;
    height: number;
}

// interface State {
    // canvas?: HTMLElement;
    // boundingBox?: DOMRect;
    // width: number;
    // height: number;
    // componentsList: React.ReactElement[];
    // uiElementList: {object: UIObjectReact, mounted: boolean}[];
// }

export interface UIRef {
    addElement: (elem: UIObjectReact, opt?: UIConfig) => void;
    destroyElement: (uuid: string) => void;
    getElement: (uuid: string) => UIObjectReact | undefined;
}

const UI = forwardRef<UIRef, Props>((props: Props, ref) => {
    const [boundingBox, setBoundingBox] = useState<DOMRect>();
    const [width] = useState<number>(props.width);
    const [height] = useState<number>(props.height);
    const [componentsList, setComponentsList] = useState<React.ReactElement[]>([]);
    const [uiElementList, setUIElementList] = useState<{object: UIObjectReact, mounted: boolean}[]>([]);

    let divRef = useRef<HTMLDivElement | null>(null);
    let canvasRef = useRef<HTMLCanvasElement | null>(null);

    const uiRef = {
        getElement, destroyElement, addElement
    };

    function start() {
        const div = divRef.current;
        if(!div) throw new Error("UI div could not be referenced");

        div.id = "UI";
        div.style.position = "absolute";
        div.style.left = boundingBox?.left+"px";
        div.style.top = boundingBox?.top+"px";
        div.style.width = width+"px";
        div.style.height = height+"px";
        div.style.zIndex = "99";
    }

    function addElement(elem: UIObjectReact, opt?: UIConfig) {
        // const elem = elemf({});
        uiElementList.push({ object: elem, mounted: false });

        if (!elem.elem) {
            return;
        }

        const elemStyle: CSSProperties = {
            position: "absolute",
        };

        const uuid = elem.name + "-" + crypto.randomUUID();

        elemStyle.left = opt?.position?.x + "px";
        elemStyle.top = opt?.position?.y + "px";
        elemStyle.width = opt?.size?.x + "px";
        elemStyle.height = opt?.size?.y + "px";
        if (opt?.time) {
            setTimeout(() => {
                destroyElement(uuid);
            }, opt.time);
        }

        const newElem = React.createElement(
            "div",
            {
                key: uuid,
                id: elem.name,
                style: elemStyle,
            },
            instantiateUIObjectReact(elem, { uiRef, uuid: uuid })
        );

        componentsList.push(newElem);

        //TODO: ADD SUPPORT TO HTML ONLY COMPONENTS
    }

    //TODO: IMPLEMENT "getElement"
    function getElement(uuid: string): UIObjectReact | undefined {
        return (uiElementList.find(value =>
            value.object.uuid === uuid
        )??{object: undefined, mounted: false}).object;
    }

    //TODO: IMPLEMENT "destroyElement"
    function destroyElement(uuid: string): void {
        setComponentsList(componentsList.filter(v => v.key !== uuid));
        setUIElementList(uiElementList.filter(v => v.object.uuid !== uuid));

        // TODO: ADD OBJ.DESTROY()
        // if (obj.destroy) {
        //     obj.destroy();
        // }else {
        //     obj.elem.remove();
        // }
    }

    //========================================================================//

    useImperativeHandle(ref, () => uiRef);

    useEffect(() => {
        if (!boundingBox) {
            setBoundingBox(canvasRef.current?.getBoundingClientRect());
            return;
        }

        const elementsToMount = uiElementList
            .filter((v) => !v.mounted)
            .map((v) => v.object);

        for(let uiObj of elementsToMount) {
            if(uiObj.init) uiObj.init(uiRef);
        }

        start();
    }, [boundingBox, canvasRef, addElement, uiElementList, start]);

    //TODO: ADD THE SUPPORT FOR A PRE-EXISTING CANVAS
    return (
        <div className="UI">
            <canvas
                width={props.width}
                height={props.height}
                ref={setRef(canvasRef)}
            ></canvas>
            <div className="UI" ref={setRef(divRef)}>
                {componentsList}
            </div>
        </div>
    );
});

export default UI;
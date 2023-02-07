import React, { Component, createRef, CSSProperties, ReactElement, useRef } from "react";
import Teste from "../components/teste";
import instantiateUIObjectReact from "../shared/instantiateUIObjectReact";
import UIObjectReact, { UIConfig } from "./UIObject";

interface Props {
    canvas?: HTMLElement;
    width: number;
    height: number;
}

interface State {
    canvas?: HTMLElement;
    boundingBox?: DOMRect;
    width: number;
    height: number;
    componentsList: React.ReactElement[];
    uiElementList: {object: UIObjectReact, mounted: boolean}[];
}

export default class UI extends Component<Props, State> {
    private divRef: React.RefObject<HTMLDivElement> = createRef();
    private canvasRef: React.RefObject<HTMLCanvasElement> = createRef();

    constructor(props: Props, state: State) {
        super(props);
        this.state = {
            boundingBox: undefined,
            width: props.width,
            height: props.height,
            componentsList: [],
            uiElementList: [],
        };
    }

    componentDidMount(): void {
        if (!this.state.boundingBox) {
            this.setState((prev) => {return {
                boundingBox: this.canvasRef.current?.getBoundingClientRect(),
            };});
        }

        this.addElement(new Teste(3));
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        const elementsToMount = this.state.uiElementList
            .filter((v) => !v.mounted)
            .map((v) => v.object);

        for(let uiObj of elementsToMount) {
            if(uiObj.init) uiObj.init(this);
        }

        if (this.state.boundingBox)
            this.start();
    }

    //TODO: ADD THE SUPPORT FOR A PRE-EXISTING CANVAS
    render(): React.ReactNode {
        return (
            <div>
                <canvas
                    width={this.state.width}
                    height={this.state.height}
                    ref={this.canvasRef}
                ></canvas>
                <div className="UI" ref={this.divRef}>
                    {this.state.componentsList}
                </div>
            </div>
        );
    }

    start() {
        const div = this.divRef.current;
        if(!div) throw new Error("UI div could not be referenced");

        div.id = "UI";
        div.style.position = "absolute";
        div.style.left = this.state.boundingBox?.left+"px";
        div.style.top = this.state.boundingBox?.top+"px";
        div.style.width = this.state.width+"px";
        div.style.height = this.state.height+"px";
        div.style.zIndex = "99";
    }

    addElement(elem: UIObjectReact, opt?: UIConfig) {
        // const elem = elemf({});
        this.setState((prev) => {return {
            uiElementList: [...prev.uiElementList, {object: elem, mounted: false}]
        };});

        if (!elem.elem) {
            return;
        }

        const elemStyle: CSSProperties = {
            position: "absolute"
        };

        const uuid = elem.name+"-"+crypto.randomUUID();

        if (opt) {
            if (opt.position) {
                elemStyle.left = opt.position.x + "px";
                elemStyle.top = opt.position.y + "px";
            }
            if (opt.size) {
                elemStyle.width = opt.size.x + "px";
                elemStyle.height = opt.size.y + "px";
            }
            if (opt.time) {
                setTimeout(() => {
                    this.destroyElement(uuid);
                }, opt.time);
            }
        }

        const newElem = React.createElement(
            'div',
            {
                key: uuid,
                id: elem.name,
                style: elemStyle,
            },
            instantiateUIObjectReact(elem, this, {uuid: uuid})
        );

        this.setState((prev) => {return {
            componentsList: [...prev.componentsList, newElem]
        };});

        //TODO: ADD SUPPORT TO HTML ONLY COMPONENTS
    }

    //TODO: IMPLEMENT "getElement"
    public getElement(uuid: string): Object | undefined {
        return this.state.uiElementList.find(value =>
            value.object.uuid === uuid
        );
    }

    //TODO: IMPLEMENT "destroyElement"
    public destroyElement(uuid: string): void {
        this.setState((prev) => {return {
            componentsList: prev.componentsList.filter(v => v.key !== uuid),
            uiElementList: prev.uiElementList.filter(v => v.object.uuid !== uuid),
        };});

        // TODO: ADD OBJ.DESTROY()
        // if (obj.destroy) {
        //     obj.destroy();
        // }else {
        //     obj.elem.remove();
        // }
    }
}
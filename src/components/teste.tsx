import React, { Component, useImperativeHandle } from 'react';
import UI, { UIRef } from '../lib/UI';
import UIObjectReact, { UIProps, UIReactElement } from '../lib/UIObject';

interface ITesteProps extends UIProps {
    n: number;
}

const testeComponent = React.forwardRef<any, ITesteProps>((props, ref: any) => {
    useImperativeHandle(ref, () => ({

    }));

    return <div>{props.n}</div>;
});

//TODO: Try implement as a decorator
export default class Teste extends UIObjectReact {
    name: string = "teste";
    elem: UIReactElement<ITesteProps> = testeComponent;

    constructor(private n: number) {
        super();
    }

    getProp<T extends UIProps>(props: UIProps): UIProps | T {
        return {...super.getProp(props), n: this.n} as ITesteProps;
    }

    init(ui: UIRef): void {}
}
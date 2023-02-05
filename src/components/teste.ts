import UI from '../lib/UI';
import UIObject from '../lib/UIObject';
import html from './teste.html';

export default class Teste implements UIObject {
    name: string = "teste";
    html: string = html;

    init(ui: UI){}
}
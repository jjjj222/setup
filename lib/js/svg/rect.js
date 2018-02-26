import { xmlns } from './xmlns.js';

//------------------------------------------------------------------------------
//   Rect
//------------------------------------------------------------------------------
export class Rect {
    constructor(parent) {
        this.root = document.createElementNS(xmlns, 'rect');
    }

    set width(w) {
        this.root.setAttributeNS(null, 'width', w);
    }

    set height(h) {
        this.root.setAttributeNS(null, 'height', h);
    }

    set color(c) {
        this.root.style.fill = c;
    }

    set border_color(c) {
        this.root.style.stroke = c;
    }

    get x() {
        return this.root.getAttributeNS(null, 'x');
    }

    get y() {
        return this.root.getAttributeNS(null, 'y');
    }

    get width() {
        return this.root.getAttributeNS(null, 'width');
    }

    get height() {
        return this.root.getAttributeNS(null, 'height');
    }

    get bbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
    }
}

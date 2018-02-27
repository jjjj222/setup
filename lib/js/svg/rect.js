import { SvgObj } from './base_obj.js';

//------------------------------------------------------------------------------
//   Rect
//------------------------------------------------------------------------------
export class Rect extends SvgObj {
    constructor() {
        super('rect');
    }

    set width(w) {
        this.root.setAttributeNS(null, 'width', w);
    }

    set height(h) {
        this.root.setAttributeNS(null, 'height', h);
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

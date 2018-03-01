import { SvgObj } from './base_obj.js';

//------------------------------------------------------------------------------
//   
//------------------------------------------------------------------------------
export class Text extends SvgObj {
    constructor() {
        super('text');
        this.root.setAttributeNS(null, "dominant-baseline", "hanging");
    }

    set x(val) {
        this.root.setAttributeNS(null, "x", val);
    }

    set y(val) {
        this.root.setAttributeNS(null, "y", val);
    }

    set text(val) {
        this.root.textContent = val;
    }

    set color(c) {
        this.root.style.fill = c;
    }

    set fontSize(val) {
        this.root.style.fontSize = val;
    }

    get width() {
        return this.root.getComputedTextLength();
    }

    get height() {
        return this.root.getBBox().height;
    }
}

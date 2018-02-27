import { SvgObj } from './base_obj.js';

//------------------------------------------------------------------------------
//   
//------------------------------------------------------------------------------
export class Tspan extends SvgObj {
    constructor() {
        super('tspan');
        //this.root.setAttributeNS(null, "dominant-baseline", "hanging");
    }

    set x(val) {
        this.root.setAttributeNS(null, "x", val);
    }

    set dy(val) {
        this.root.setAttributeNS(null, "dy", val);
    }

    set text(val) {
        this.root.textContent = val;
    }

    get text() {
        return this.root.textContent;
    }

    get width() {
        return this.root.getComputedTextLength();
    }
}

//Tspan.prototype.push = function(str) {
//    this.root.textContent += str;
//}

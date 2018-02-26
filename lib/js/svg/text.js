import { xmlns } from './xmlns.js';

//------------------------------------------------------------------------------
//   
//------------------------------------------------------------------------------
export class Text {
    constructor() {
        this.root = document.createElementNS(xmlns, 'text');
        const t = this.root;
        //t.setAttributeNS(null, "x", text_style.padding.x);
        //t.setAttributeNS(null, "y", text_style.padding.y);
        this.root.setAttributeNS(null, "dominant-baseline", "hanging");
        //if (n.data.key) {
        //    t.textContent = n.data.key;
        //  //return n.data.key;
        //} else {
        //    t.textContent = n.data.property.name;
        //  //return n.data.property.name;
        //}
        //g.root.appendChild(t);
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
}

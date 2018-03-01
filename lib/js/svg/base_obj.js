import { xmlns } from './xmlns.js';

import * as util from '../util/util.js';
//------------------------------------------------------------------------------
//   SvgObj
//------------------------------------------------------------------------------
export class SvgObj {
    constructor(type) {
        this.root = document.createElementNS(xmlns, type);
    }

    set color(c) {
        this.root.style.fill = c;
    }

    set border_color(c) {
        this.root.style.stroke = c;
    }

    set display(val) {
        this.root.style.display = val;
    }

    get childCount() {
        return this.root.childElementCount;
    }
}

//------------------------------------------------------------------------------
SvgObj.prototype.add = function(svg_obj) {
    this.root.appendChild(svg_obj.root);
}

SvgObj.prototype.remove = function(svg_obj) {
    this.root.removeChild(svg_obj.root);
}

SvgObj.prototype.clear = function() {
    while (this.root.lastChild) {
        this.root.removeChild(this.root.lastChild);
    }
}

SvgObj.prototype.forEach = function(callback) {
    for (let i = 0; i < this.root.children.length; ++i) {
        callback(this.root.children[i]);
    }
}


SvgObj.prototype.transform = function(x, y, scale) {
    this.root.setAttributeNS(null, 'transform', "translate(" + x + "," + y + ")");
}

SvgObj.prototype.toFront = function() {
    this.root.parentNode.appendChild(this.root);
}

//------------------------------------------------------------------------------
SvgObj.prototype.on = util.on;

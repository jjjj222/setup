import { xmlns } from './xmlns.js';

//------------------------------------------------------------------------------
//   SvgObj
//------------------------------------------------------------------------------
export class SvgObj {
    constructor(type) {
        this.root = document.createElementNS(xmlns, type);
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

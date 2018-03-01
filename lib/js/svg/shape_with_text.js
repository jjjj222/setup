import { Rect, G } from './svg.js';
import { Text } from './text.js';
import { BoundedText } from './bounded_text.js';
import { Polygon } from './polygon.js';
import { TriangleRight } from './triangle_right.js';
import { TrapezoidRight } from './trapezoid_right.js';

import * as util from '../util/util.js';
//------------------------------------------------------------------------------
//   ShapeWithText
//------------------------------------------------------------------------------
export class ShapeWithText {
    constructor(bbox) {
        this.bbox = bbox;
        this.g = new G();
        this.root = this.g.root;
        //this.acv_node = acv_node;

        this.g.transform(bbox.x, bbox.y);

        this._shape = null;
        this._backup_text = "";
        this._text = null;
        this.text_bbox = null;

        this.shape = 'rect';
    }

    set text(val) {
        this._backup_text = val;
        this._text.text = val;
    }

    set text_color(c) {
        this._text.color = c;
    }

    set fontSize(val) {
        this._backup_fontSize = val;
        this._text.fontSize = val;
    }

    set shape(val) {
        if (val == 'trapezoid'){
            this._setShape_trapezoid();
        } else if (val == 'triangle') {
            this._setShape_triangle();
        } else {
            this._setShape_rect();
        }

        this._text = new BoundedText(this.text_bbox);
        this.g.add(this._text);
        this.fontSize = this._backup_fontSize;
        this.text = this._backup_text;
    }

    set color(c) {
        this._shape.color = c;
    }

    set display(val) {
        this.g.root.style.display = val;
    }
}

//------------------------------------------------------------------------------
ShapeWithText.prototype.clear = function() {
    this.root.innerHTML = "";
}
//------------------------------------------------------------------------------
ShapeWithText.prototype._setShape_rect = function() {
    this.clear();
    this._shape = new Rect();
    this._shape.width = this.bbox.width;
    this._shape.height = this.bbox.height;
    this._shape.color = 'white';
    this._shape.border_color = 'black';
    this.g.add(this._shape)

    const padding = 2;

    this.text_bbox = {
        x: padding,
        y: padding,
        width: this.bbox.width - 2 * padding,
        height: this.bbox.height - 2 * padding,
    }
}

//------------------------------------------------------------------------------
ShapeWithText.prototype._setShape_triangle = function() {
    this.clear();
    this._shape = new TriangleRight();
    this._shape.width = this.bbox.width;
    this._shape.height = this.bbox.height;
    this._shape.color = 'white';
    this._shape.border_color = 'black';
    this.g.add(this._shape)

    const padding = 2;

    this.text_bbox = {
        x: padding,
        y: padding,
        width: this.bbox.width - 2 * padding,
        height: this.bbox.height - 2 * padding,
    }
}

//------------------------------------------------------------------------------
ShapeWithText.prototype._setShape_trapezoid = function() {
    this.clear();
    this._shape = new TrapezoidRight();
    this._shape.width = this.bbox.width;
    this._shape.height = this.bbox.height;
    this._shape.color = 'white';
    this._shape.border_color = 'black';
    this.g.add(this._shape)

    const padding = 2;
    const diff = this._shape.ratio * this.bbox.height / 2;

    this.text_bbox = {
        x: padding,
        y: padding + diff,
        width: this.bbox.width - 2 * padding,
        height: this.bbox.height - 2 * padding - diff,
    }
}

//------------------------------------------------------------------------------
ShapeWithText.prototype.on = util.on;

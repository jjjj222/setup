import { Rect, G } from './svg.js';
import { Text } from './text.js';
import { BoundedText } from './bounded_text.js';
import { Polygon } from './polygon.js';
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

    set fontSize(val) {
        this._backup_fontSize = val;
        this._text.fontSize = val;
    }

    set shape(val) {
        if (val == 'rect'){
            this._setShape_rect();
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
}

//------------------------------------------------------------------------------
ShapeWithText.prototype.clear = function() {
    this.root.innerHTML = "";
}
//------------------------------------------------------------------------------
ShapeWithText.prototype._setShape_rect = function() {
    this.clear();
    const rect = new Rect(this.g);
    rect.width = this.bbox.width;
    rect.height = this.bbox.height;
    rect.color = 'white';
    rect.border_color = 'black';
    this._shape = rect;

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
    const polygon = new Polygon(this.g);
    polygon.points = "0,0 " + this.bbox.width + "," + this.bbox.height / 2 + " 0," + this.bbox.height;
    //.append("polygon")
    //.classed("shape", true)
    //.attr("points", (n) => { return "0,0 " + n.width + "," + n.height / 2 + " 0," + n.height; })
    //const rect = new Rect(this.g);
    //rect.width = this.bbox.width;
    //rect.height = this.bbox.height;
    polygon.color = 'white';
    polygon.border_color = 'black';
    //this._shape = rect;

    const padding = 2;

    this.text_bbox = {
        x: padding,
        y: padding,
        width: this.bbox.width - 2 * padding,
        height: this.bbox.height - 2 * padding,
    }
}

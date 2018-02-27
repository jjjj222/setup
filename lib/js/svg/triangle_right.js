import { Polygon } from './polygon.js';

//------------------------------------------------------------------------------
//   TriangleRight
//------------------------------------------------------------------------------
export class TriangleRight extends Polygon {
    constructor() {
        super();

        this._width = 0;
        this._height = 0;
    }

    set width(w) {
        this._width = w;
        this._redraw();
    }

    set height(h) {
        this._height = h;
        this._redraw();
    }
}

//------------------------------------------------------------------------------
TriangleRight.prototype._redraw = function() {
    this.points = [
        {x: 0, y: 0},
        {x: this._width, y: this._height / 2},
        {x: 0, y: this._height},
    ]
}

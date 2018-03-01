import { Polygon } from './polygon.js';

//------------------------------------------------------------------------------
//   TrapezoidRight
//------------------------------------------------------------------------------
export class TrapezoidRight extends Polygon {
    constructor() {
        super();

        this.ratio = 0.25;
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
TrapezoidRight.prototype._redraw = function() {
    const diff = this.ratio * this._height / 2;

    this.points = [
        {x: 0, y: 0},
        {x: this._width, y: diff},
        {x: this._width, y: this._height - diff},
        {x: 0, y: this._height},
    ]
}

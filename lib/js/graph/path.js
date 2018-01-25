import { Point } from "./point.js";

//------------------------------------------------------------------------------
//   Path
//------------------------------------------------------------------------------
export class Path {
    constructor(points) {
        this._points = points;
    }

    // getter
    get points() {
        return this._points
    }

    // function
    get max_x() {
        return Math.max(...this.points.map(p => p.x))
    }

    get min_x() {
        return Math.min(...this.points.map(p => p.x))
    }

    get max_y() {
        return Math.max(...this.points.map(p => p.y))
    }

    get min_y() {
        return Math.min(...this.points.map(p => p.y))
    }

    get bbox() {
        return {
            x: this.min_x,
            y: this.min_y,
            width: this.max_x - this.min_x,
            height: this.max_y - this.min_y,
        }
    }
}

//------------------------------------------------------------------------------
//   static function
//------------------------------------------------------------------------------
Path.parsePath = function(str, delimiter=' ') {
    const tokens = str.split(delimiter);
    const points = tokens.map(t => {
        return Point.parsePoint(t);
    })
    return new Path(points);
}



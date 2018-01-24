//------------------------------------------------------------------------------
//   Point
//------------------------------------------------------------------------------
export class Point {
    constructor(x, y) {
        this._x = Number(x);
        this._y = Number(y);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

//------------------------------------------------------------------------------
Point.prototype.toStrSpace = function() {
  return this.x + " " + this.y;
}

//------------------------------------------------------------------------------
Point.prototype.toStr = function() {
  return "(" + this.x + ", " + this.y + ")"
}

//------------------------------------------------------------------------------
//   static function
//------------------------------------------------------------------------------
Point.parseString = function(str, delimiter=",") {
    let x_str, y_str;
    [x_str, y_str] = str.split(delimiter);
    return new Point(x_str, y_str);
}


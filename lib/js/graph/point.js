//------------------------------------------------------------------------------
//   Point
//------------------------------------------------------------------------------
export function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toStrSpace = function() {
  return this.x + " " + this.y;
}

Point.prototype.toStr = function() {
  return "(" + this.x + ", " + this.y + ")"
}

import { Point } from "./point.js";

//------------------------------------------------------------------------------
//   Node
//------------------------------------------------------------------------------
export class Node {
    constructor(id) {
        this._id = id;
        this.data = null;
        this.inputs = [];
        this.outputs = [];
        this.pos = null;
        this.width = 60;
        this.height = 50;
    }

    get id() {
        return this._id;
    }
}

//------------------------------------------------------------------------------
Node.prototype.setPosXY = function(x, y) {
    this.pos = new Point(x, y);
}

Node.prototype.addInput = function(edge) {
    this.inputs.push(edge);
}

Node.prototype.addOutput = function(edge) {
    this.outputs.push(edge);
}

Node.prototype.getOutputEdge = function(dst_id) {
    return this.outputs.find((e) => {
        return e.dst.some((n) => {
            return n.id == dst_id;
        })
    });
}

Node.prototype.getPortId = function() {
    return "p" + this.id;
}

//------------------------------------------------------------------------------
Node.prototype.toElk = function() {
  return {
    "id": this.id,
    "width": this.width,
    "height": this.height,
    "ports" : [
        { "id": this.getPortId() }
    ]
  }
}

Node.prototype.readElk = function(elk) {
  this.width = elk.width;
  this.height = elk.height;
  this.setPosXY(elk.x, elk.y);
}

//------------------------------------------------------------------------------

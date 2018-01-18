//------------------------------------------------------------------------------
//   Node
//------------------------------------------------------------------------------
export class Node {
    constructor(id) {
        this._id = id;
        this.data = null;
        this.inputs = [];
        this.outputs = [];
        this.x = 0;
        this.y = 0;
        this.width = 60;
        this.height = 50;
    }

    get id() {
        return this._id;
    }

    get port_id() {
        return "p" + this.id;
    }
}

//------------------------------------------------------------------------------
Node.prototype.addInput = function(edge) {
    this.inputs.push(edge);
}

Node.prototype.addOutput = function(edge) {
    this.outputs.push(edge);
}

Node.prototype.getOutputEdge = function(dst_id) {
    return this.outputs.find((e) => {
        return e.target.id == dst_id;
    });
}

//------------------------------------------------------------------------------
Node.prototype.toElk = function() {
    return {
        "id": this.id,
        "width": this.width,
        "height": this.height,
        "ports" : [
            { "id": this.port_id }
        ]
    }
}

Node.prototype.readElk = function(elk) {
    this.width = elk.width;
    this.height = elk.height;
    this.x = elk.x;
    this.y = elk.y;
}

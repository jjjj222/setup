import { GraphBaseObj } from "./graph_base_obj.js";

//------------------------------------------------------------------------------
//   Node
//------------------------------------------------------------------------------
export class Node extends GraphBaseObj {
    constructor(id) {
        super(id);
        this.inputs = [];
        this.outputs = [];

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    get port_id() {
        return "p" + this.id;
    }

    //get bbox() {
    //    return {
    //        x: this.x,
    //        y: this.y,
    //        width: this.width,
    //        height:this.height,
    //    }
    //}

    //set bbox(val) {
    //    this.x = val.x;
    //    this.y = val.y;
    //    this.width = val.width;
    //    this.height = val.height;
    //}


    isNode() {
        return true;
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

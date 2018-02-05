import { GraphBaseObj } from "./graph_base_obj.js";
import { Point } from "./point.js";
import { d3_min, d3_max } from '../util/array.js';

import * as class_util from "../util/class.js";

//------------------------------------------------------------------------------
//   Edge
//------------------------------------------------------------------------------
export class Edge extends GraphBaseObj{
    constructor(id, source, target) {
        super(id);
        class_util.set_readonly(this, 'source', source);
        class_util.set_readonly(this, 'target', target);

        this.path = [];
    }

    isEdge() {
        return true;
    }
}

//------------------------------------------------------------------------------
Edge.prototype.toElk = function() {
    return {
        "id": this.id,
        "sources": [ this.source.port_id ],
        "targets": [ this.target.id ],
    }
}

Edge.prototype.readElk = function(elk) {
    const p = elk.sections[0];
    this.path.push(new Point(p.startPoint.x, p.startPoint.y));
    if ('bendPoints' in p) {
        for (let i = 0; i < p.bendPoints.length; ++i) {
            this.path.push(new Point(p.bendPoints[i].x, p.bendPoints[i].y));
        }
    }

    this.path.push(new Point(p.endPoint.x, p.endPoint.y));
}

//------------------------------------------------------------------------------
Edge.prototype.getMaxY = function() {
  return d3_max(this.path, (n) => { return n.y; });
}

Edge.prototype.getMinY = function() {
  return d3_min(this.path, (n) => { return n.y; });
}

Edge.prototype.getMaxX = function() {
  return d3_max(this.path, (n) => { return n.x; });
}

Edge.prototype.getMinX = function() {
  return d3_min(this.path, (n) => { return n.x; });
}

//------------------------------------------------------------------------------
Edge.prototype.toDot = function() {
    let result = "";
    result += this.src[0].id;
    result += "->";
    result += this.dst[0].id;
    return result;
}

import { Point } from "./point.js";
import { Node } from "./node.js";
import { Edge } from "./edge.js";
import { d3_min, d3_max } from '../util/array.js';

export { Node, Edge }

//------------------------------------------------------------------------------
//   Graph
//------------------------------------------------------------------------------
export function Graph() {
  this.nodes = [];
  this.edges = [];
  this.id_to_node = {};
  this.id_to_edge = {};
  this.NodeType = Node;
  this.EdgeType = Edge;
}

Graph.prototype.addNode = function() {
  const new_id = "n" + this.nodes.length;

  const new_node = new this.NodeType(new_id);

  this.nodes.push(new_node);
  this.id_to_node[new_id] = new_node;
  return new_node;
}

Graph.prototype.addEdge = function(source_node, target_node) {
  const new_id = "e" + this.edges.length;
  const new_edge = new this.EdgeType(new_id);
  new_edge.addSrc(source_node);
  new_edge.addDst(target_node);

  source_node.addOutput(new_edge);
  target_node.addInput(new_edge);

  this.edges.push(new_edge);
  this.id_to_edge[new_id] = new_edge;

  return new_edge;
}

Graph.prototype.getBBox = function() {
    if (this.nodes.length == 0) {
        return {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
        };
    }

    let min_x = d3_min(this.nodes, (n) => { return n.pos.x; });
    let min_y = d3_min(this.nodes, (n) => { return n.pos.y; });
    let max_x = d3_max(this.nodes, (n) => { return n.pos.x + n.width; });
    let max_y = d3_max(this.nodes, (n) => { return n.pos.y + n.height; });

    if (this.edges.length != 0) {
      const edge_min_x = d3_min(this.edges, (e) => { return e.getMinX(); });
      const edge_min_y = d3_min(this.edges, (e) => { return e.getMinY(); });
      const edge_max_x = d3_max(this.edges, (e) => { return e.getMaxX(); });
      const edge_max_y = d3_max(this.edges, (e) => { return e.getMaxY(); });

      min_x = Math.min(min_x, edge_min_x);
      min_y = Math.min(min_y, edge_min_y);
      max_x = Math.max(max_x, edge_max_x);
      max_y = Math.max(max_y, edge_max_y);
    }

    const w = max_x - min_x;
    const h = max_y - min_y;

    return {
        "x": min_x,
        "y": min_y,
        "width": w,
        "height": h
    };
}

//------------------------------------------------------------------------------
Graph.prototype.toElk = function() {
    return {
        id: "root",
        children: this.nodes.map((n) => { return n.toElk(); }),
        edges: this.edges.map((e) => { return e.toElk(); })
    };
}

Graph.prototype.readElk = function(elk) {
    elk.children.forEach((n) => {
        const node = this.id_to_node[n.id];
        node.readElk(n);
    });

    elk.edges.forEach((e) => {
        const edge = this.id_to_edge[e.id];
        edge.readElk(e);
    });
}

//------------------------------------------------------------------------------
Graph.prototype.toDot = function() {
    let result = "";
    result += "digraph";
    result += "{";
    this.edges.forEach((e) => {
        result += e.toDot();
        result += ";";
    });
    result += "}";
    return result;
}


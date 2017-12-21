import { Point } from "./point.js";
import { d3_min, d3_max } from '../util/array.js';

//------------------------------------------------------------------------------
//   Node
//------------------------------------------------------------------------------
export function Node(id) {
  this.id = id;
  this.data = null;
  this.inputs = [];
  this.outputs = [];
  this.pos = null;
  this.width = 60;
  this.height = 50;
}

Node.prototype.setPosXY = function(x, y) {
  this.pos = new Point(x, y);
}

Node.prototype.addInput = function(edge) {
  this.inputs.push(edge);
}

Node.prototype.addOutput = function(edge) {
  this.outputs.push(edge);
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
//   Edge
//------------------------------------------------------------------------------
export function Edge(id) {
  this.id = id;
  this.data = null;
  this.src = [];
  this.dst = [];
  this.path = [];
}

Edge.prototype.addSrc = function(node) {
  this.src.push(node);
}

Edge.prototype.addDst = function(node) {
  this.dst.push(node);
}

Edge.prototype.getSrcs = function() {
    return this.src;
}

Edge.prototype.toElk = function() {
  return {
    "id": this.id,
    "sources": this.src.map((n) => { return n.getPortId(); }),
    "targets": this.dst.map((n) => { return n.id; })
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

    const w = max_x + min_x;
    const h = max_y + min_y;

    return {
        "x": 0,
        "y": 0,
        "width": w,
        "height": h
    };
}

Graph.prototype.toElk = function() {
  return {
    id: "root",
    properties: { 'algorithm': 'layered' },
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

import { Graph, Node, Edge } from "../graph.js";


describe('constructor', () => {
    test('new Graph()', () => {
        const g = new Graph();

        expect(g.nodes.length).toBe(0)
        expect(g.edges.length).toBe(0)
        expect(g.id_to_node).toEqual({});
        expect(g.id_to_edge).toEqual({});
        expect(g.NodeType).toBe(Node)
        expect(g.EdgeType).toBe(Edge)
    });
});


describe('member functions', () => {
    let graph = null;
    beforeEach(() => {
        graph = new Graph();
    });

    test('addNode()', () => {
        const n0 = graph.addNode();
        const n1 = graph.addNode();

        expect(graph.nodes.length).toBe(2);
        expect(graph.nodes[0]).toBe(n0);
        expect(graph.nodes[1]).toBe(n1);
        expect(graph.id_to_node["n0"]).toBe(n0);
        expect(graph.id_to_node["n1"]).toBe(n1);

        expect(n0.id).toBe("n0");
        expect(n1.id).toBe("n1");
    });

    test('addEdge()', () => {
        const n0 = graph.addNode();
        const n1 = graph.addNode();
        const e = graph.addEdge(n0, n1);

        expect(graph.edges.length).toBe(1);
        expect(graph.edges[0]).toBe(e);
        expect(graph.id_to_edge["e0"]).toBe(e);

        expect(e.id).toBe("e0");
        expect(e.getSrcs()).toContain(n0);
        expect(e.getDsts()).toContain(n1);
    });

    describe('getBBox()', () => {
        
    });
})

//Graph.prototype.getBBox = function() {
//    if (this.nodes.length == 0) {
//        return {
//            "x": 0,
//            "y": 0,
//            "width": 0,
//            "height": 0
//        };
//    }
//
//
//    let min_x = d3_min(this.nodes, (n) => { return n.pos.x; });
//    let min_y = d3_min(this.nodes, (n) => { return n.pos.y; });
//    let max_x = d3_max(this.nodes, (n) => { return n.pos.x + n.width; });
//    let max_y = d3_max(this.nodes, (n) => { return n.pos.y + n.height; });
//
//    if (this.edges.length != 0) {
//      const edge_min_x = d3_min(this.edges, (e) => { return e.getMinX(); });
//      const edge_min_y = d3_min(this.edges, (e) => { return e.getMinY(); });
//      const edge_max_x = d3_max(this.edges, (e) => { return e.getMaxX(); });
//      const edge_max_y = d3_max(this.edges, (e) => { return e.getMaxY(); });
//
//      min_x = Math.min(min_x, edge_min_x);
//      min_y = Math.min(min_y, edge_min_y);
//      max_x = Math.max(max_x, edge_max_x);
//      max_y = Math.max(max_y, edge_max_y);
//    }
//
//    const w = max_x + min_x;
//    const h = max_y + min_y;
//
//    return {
//        "x": 0,
//        "y": 0,
//        "width": w,
//        "height": h
//    };
//}
//
//Graph.prototype.toElk = function() {
//  return {
//    id: "root",
//    properties: { 'algorithm': 'layered' },
//    children: this.nodes.map((n) => { return n.toElk(); }),
//    edges: this.edges.map((e) => { return e.toElk(); })
//  };
//}
//
//Graph.prototype.readElk = function(elk) {
//  elk.children.forEach((n) => {
//    const node = this.id_to_node[n.id];
//    node.readElk(n);
//  });
//
//  elk.edges.forEach((e) => {
//    const edge = this.id_to_edge[e.id];
//    edge.readElk(e);
//  });
//}

import { Point } from "../point.js";
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
        test('normal', () => {
            const n0 = graph.addNode();
            const n1 = graph.addNode();
            const e = graph.addEdge(n0, n1);
            n0.setPosXY(12, 13);
            n0.height = 5;
            n0.width = 6;

            n1.setPosXY(30, 40);
            n1.height = 7;
            n1.width = 8;

            e.path.push(new Point(15, 15));
            e.path.push(new Point(50, 60));

            const bbox = graph.getBBox();

            expect(bbox.x).toBe(12);
            expect(bbox.y).toBe(13);
            expect(bbox.width).toBe(38);
            expect(bbox.height).toBe(47);
        });

        test('no nodes', () => {
            const bbox = graph.getBBox();

            expect(bbox.x).toBe(0);
            expect(bbox.y).toBe(0);
            expect(bbox.width).toBe(0);
            expect(bbox.height).toBe(0);
        });

        test('no edges', () => {
            const n0 = graph.addNode();
            const n1 = graph.addNode();
            n0.setPosXY(12, 13);
            n0.height = 5;
            n0.width = 6;

            n1.setPosXY(30, 40);
            n1.height = 7;
            n1.width = 8;

            const bbox = graph.getBBox();

            expect(bbox.x).toBe(12);
            expect(bbox.y).toBe(13);
            expect(bbox.width).toBe(26);
            expect(bbox.height).toBe(34);
        });
    });
})

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

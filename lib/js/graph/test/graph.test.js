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
        expect(e.source).toBe(n0);
        expect(e.target).toBe(n1);
    });

    describe('getBBox()', () => {
        test('normal', () => {
            const n0 = graph.addNode();
            const n1 = graph.addNode();
            const e = graph.addEdge(n0, n1);
            n0.x = 12;
            n0.y = 13;
            n0.height = 5;
            n0.width = 6;

            n1.x = 30;
            n1.y = 40;
            n1.height = 7;
            n1.width = 8;

            e.path.push(new Point(15, 15));
            e.path.push(new Point(30, 60));

            const bbox = graph.getBBox();

            expect(bbox.x).toBe(12);
            expect(bbox.y).toBe(13);
            expect(bbox.width).toBe(26);
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
            n0.x = 12;
            n0.y = 13;
            n0.height = 5;
            n0.width = 6;

            n1.x = 30;
            n1.y = 40;
            n1.height = 7;
            n1.width = 8;

            const bbox = graph.getBBox();

            expect(bbox.x).toBe(12);
            expect(bbox.y).toBe(13);
            expect(bbox.width).toBe(26);
            expect(bbox.height).toBe(34);
        });
    });

    test('toElk()', () => {
        const n0 = graph.addNode();
        const n1 = graph.addNode();
        const e = graph.addEdge(n0, n1);

        n0.width = 5;
        n0.height = 6;

        n1.width = 7;
        n1.height = 8;

        expect(graph.toElk()).toEqual({
            id: "root",
            //properties: { 'algorithm': 'layered' },
            children: [
                {
                    id: "n0",
                    width: 5,
                    height: 6,
                    ports: [
                        {
                            id: "pn0"
                        }
                    ]
                },
                {
                    id: "n1",
                    width: 7,
                    height: 8,
                    ports: [
                        {
                            id: "pn1"
                        }
                    ]
                }
            ],
            edges: [
                {
                    id: "e0",
                    sources: [
                        "pn0"
                    ],
                    targets: [
                        "n1"
                    ]
                }
            ]
        });
    });

    test('readElk(json)', () => {
        const n0 = graph.addNode();
        const n1 = graph.addNode();
        const e = graph.addEdge(n0, n1);

        n0.width = 50;
        n0.height = 60;

        n1.width = 70;
        n1.height = 80;

        const elk_json = {
            children: [
                {
                    id: "n0",
                    x: 10,
                    y: 11,
                    width: 5,
                    height: 6,
                },
                {
                    id: "n1",
                    x: 12,
                    y: 13,
                    width: 7,
                    height: 8,
                }
            ],
            edges: [
                {
                    id: "e0",
                    "sections": [{
                        "startPoint": { "x": 1, "y": 2 },
                        "endPoint": { "x": 5, "y": 4 },
                        "bendPoints": [
                            {
                                "x": 3,
                                "y": 2
                            }
                        ]
                    }]
                }
            ]
        };

        graph.readElk(elk_json);

        expect(n0.x).toBe(10);
        expect(n0.y).toBe(11);
        expect(n0.width).toBe(5);
        expect(n0.height).toBe(6);
        expect(n1.x).toBe(12);
        expect(n1.y).toBe(13);
        expect(n1.width).toBe(7);
        expect(n1.height).toBe(8);
        expect(e.path[0].x).toBe(1);
        expect(e.path[0].y).toBe(2);
        expect(e.path[1].x).toBe(3);
        expect(e.path[1].y).toBe(2);
        expect(e.path[2].x).toBe(5);
        expect(e.path[2].y).toBe(4);
    });
})

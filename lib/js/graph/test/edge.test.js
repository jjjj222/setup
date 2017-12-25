import { Edge } from "../edge.js";
import { Node } from "../node.js";

describe('constructor', () => {
    test('Edge(string)', () => {
        const edge = new Edge("abc");

        expect(edge.id).toBe("abc");
        expect(edge.src.length).toBe(0);
        expect(edge.dst.length).toBe(0);
        expect(edge.path.length).toBe(0);
    });

    test('Edge(number)', () => {
        const edge = new Edge(3);

        expect(edge.id).toBe(3);
    });
});

describe('member functions', () => {
    let edge = null;
    beforeEach(() => {
        edge = new Edge("id");
    });

    test('addSrc(Node)', () => {
        const mock_node = new Object();

        edge.addSrc(mock_node);

        expect(edge.src).toContain(mock_node);
    })

    test('addDst(Node)', () => {
        const mock_node = new Object();

        edge.addDst(mock_node);

        expect(edge.dst).toContain(mock_node);
    })

    test('getSrcs()', () => {
        const mock_node = new Object();

        edge.addSrc(mock_node);

        expect(edge.getSrcs()).toEqual([mock_node]);
    })

    test('toElk()', () => {
        const node_1 = new Node("node1")
        const node_2 = new Node("node2")
        const node_3 = new Node("node3")

        edge.addSrc(node_1);
        edge.addDst(node_2);
        edge.addDst(node_3);
        expect(edge.toElk()).toEqual({
            id: "id",
            sources: [ "pnode1" ],
            targets: [ "node2", "node3" ]
        });
    })

    test('readElk(json)', () => {
        const elk_json = {
            "sections": [{
                "startPoint": { "x": 1, "y": 2 },
                "endPoint": { "x": 5, "y": 4 },
                "bendPoints": [
                    {
                        "x": 3,
                        "y": 2
                    },
                    {
                        "x": 3,
                        "y": 4
                    }
                ]
            }]
        }

        edge.readElk(elk_json);

        expect(edge.path.length).toBe(4);
        expect(edge.path[0].x).toBe(1);
        expect(edge.path[0].y).toBe(2);
        expect(edge.path[1].x).toBe(3);
        expect(edge.path[1].y).toBe(2);
        expect(edge.path[2].x).toBe(3);
        expect(edge.path[2].y).toBe(4);
        expect(edge.path[3].x).toBe(5);
        expect(edge.path[3].y).toBe(4);
    })

});

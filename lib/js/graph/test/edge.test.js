import { Edge } from "../edge.js";
import { Node } from "../node.js";

describe('constructor', () => {
    test('Edge(string, Node, Node)', () => {
        const mock_node_1 = new Object();
        const mock_node_2 = new Object();

        const edge = new Edge("abc", mock_node_1, mock_node_2);

        expect(edge.id).toBe("abc");
        expect(edge.source).toBe(mock_node_1);
        expect(edge.target).toBe(mock_node_2);
        expect(edge.path.length).toBe(0);
    });
});

describe('member functions', () => {
    let edge = null;
    let node_1 = null;
    let node_2 = null;
    beforeEach(() => {
        node_1 = new Node("node1")
        node_2 = new Node("node2")
        edge = new Edge("id", node_1, node_2);
    });

    test('get source()', () => {
        expect(edge.source).toBe(node_1);
    })

    test('get target()', () => {
        expect(edge.target).toBe(node_2);
    })

    test('toElk()', () => {
        expect(edge.toElk()).toEqual({
            id: "id",
            sources: [ "pnode1" ],
            targets: [ "node2" ]
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

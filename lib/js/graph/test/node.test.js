import { Node } from "../node.js";

describe('constructor', () => {
    test('new Node(string)', () => {
        const node = new Node("abc");

        expect(node.id).toBe("abc");
        expect(node.inputs.length).toBe(0);
        expect(node.outputs.length).toBe(0);
    });

    test('new Node(number)', () => {
        const id = 3
        const node = new Node(id);

        expect(node.id).toBe(id);
    });
});

describe('member functions', () => {
    let node = null;
    beforeEach(() => {
        node = new Node("id");
        node.width = 10;
        node.height = 20;
    });

    test('get id()', () => {
        expect(node.id).toBe("id");
    });

    test('get port_id()', () => {
        expect(node.port_id).toBe("pid");
    });

    test('addInput(Edge)', () => {
        const mock_edge = new Object();
        node.addInput(mock_edge);

        expect(node.inputs).toContain(mock_edge);
    });

    test('addOutput(Edge)', () => {
        const mock_edge = new Object();
        node.addOutput(mock_edge);

        expect(node.outputs).toContain(mock_edge);
    });

    test('toElk()', () => {
        expect(node.toElk()).toEqual({
            id: "id",
            width: 10,
            height: 20,
            ports: [
                {
                    id: "pid"
                }
            ]
        })
    });

    test('readElk(json)', () => {
        const elk_json = {
            width: 30,
            height: 40,
            x: 5,
            y: 6
        };

        node.readElk(elk_json);

        expect(node.width).toBe(30);
        expect(node.height).toBe(40);
        expect(node.x).toBe(5);
        expect(node.y).toBe(6);
    });
});

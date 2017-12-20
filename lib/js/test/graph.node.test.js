import { Point } from "../src/js/lib/point.js";
import { Node, Edge } from "../src/js/graph.js";

test('Node(string)', () => {
    const n = new Node("abc");

    expect(n.id).toBe("abc");
    expect(n.inputs.length).toBe(0);
    expect(n.outputs.length).toBe(0);
});

test('Node(number)', () => {
    const id = 3
    const n = new Node(id);

    expect(n.id).toBe(id);
});

describe('member functions', () => {
    let n = null;
    let e = null;
    beforeEach(() => {
        n = new Node("id");
        n.width = 10;
        n.height = 20;
        e = new Edge("eid");
    });

    test('setPosXY(number, number)', () => {
        n.setPosXY(1, 2);

        expect(n.pos).toEqual(new Point(1, 2))
    });

    test('addInput(Edge)', () => {
        n.addInput(e);

        expect(n.inputs).toContain(e);
    });

    test('addOutput(Edge)', () => {
        n.addOutput(e);

        expect(n.outputs).toContain(e);
    });

    test('getPortId()', () => {
        expect(n.getPortId()).toBe("pid");
    });

    test('toElk()', () => {
        expect(n.toElk()).toEqual({
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

        n.readElk(elk_json);

        expect(n.width).toBe(30);
        expect(n.height).toBe(40);
        expect(n.pos.x).toBe(5);
        expect(n.pos.y).toBe(6);
    });
});

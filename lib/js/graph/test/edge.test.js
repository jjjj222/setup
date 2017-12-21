import { Edge } from "../edge.js";
import { Node } from "../node.js";

test('Edge(string)', () => {
    const id = "abc"
    const edge = new Edge(id);

    expect(edge.id).toBe(id);
    expect(edge.src.length).toBe(0);
    expect(edge.dst.length).toBe(0);
});

test('Edge(number)', () => {
    const id = 3
    const edge = new Edge(id);

    expect(edge.id).toBe(id);
});

describe('member functions', () => {
    let e = null;
    beforeEach(() => {
        e = new Edge("eid");
    });

    test('addSrc(Node)', () => {
        const mock_node = new Object();

        e.addSrc(mock_node);

        expect(e.src).toContain(mock_node);
    })

    test('addDst(Node)', () => {
        const mock_node = new Object();

        e.addDst(mock_node);

        expect(e.dst).toContain(mock_node);
    })

    test('getSrcs()', () => {
        const mock_node = new Object();

        e.addSrc(mock_node);

        expect(e.getSrcs()).toEqual([mock_node]);
    })

    test('toElk()', () => {
        const node_1 = new Node("node1")
        const node_2 = new Node("node2")
        //let mock_node = null;
        //mock_node = new Node("id");
        //const n2 = new Node("node2")

        e.addSrc(node_1);
        e.addDst(node_2);
        expect(e.toElk()).toEqual({
            id: "eid",
            sources: [ "pnode1" ],
            targets: [ "node2" ]
        });
    })

    test('readElk(json)', () => {
        // TODO
    })

});

//Edge.prototype.readElk = function(elk) {
//  const p = elk.sections[0];
//  this.path.push(new Point(p.startPoint.x, p.startPoint.y));
//  if ('bendPoints' in p) {
//    for (let i = 0; i < p.bendPoints.length; ++i) {
//      this.path.push(new Point(p.bendPoints[i].x, p.bendPoints[i].y));
//    }
//  }
//
//  this.path.push(new Point(p.endPoint.x, p.endPoint.y));
//}


import { Node, Edge } from "../graph.js";

test('Edge(string)', () => {
    const id = "abc"
    const n = new Edge(id);

    expect(n.id).toBe(id);
    expect(n.src.length).toBe(0);
    expect(n.dst.length).toBe(0);
});

test('Edge(number)', () => {
    const id = 3
    const e = new Edge(id);

    expect(e.id).toBe(id);
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

    test('addSrc(Node)', () => {
        e.addSrc(n);
        expect(e.src).toContain(n);
    })

    test('addDst(Node)', () => {
        e.addDst(n);
        expect(e.dst).toContain(n);
    })

    test('getSrcs()', () => {
        e.addSrc(n);

        expect(e.getSrcs()).toEqual([n]);
    })

    test('toElk()', () => {
        const n2 = new Node("node2")

        e.addSrc(n);
        e.addDst(n2);
        expect(e.toElk()).toEqual({
            id: "eid",
            sources: [ "pid" ],
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


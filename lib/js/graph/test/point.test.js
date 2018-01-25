import { Point } from "../point.js";

describe('constructor', () => {
    test('new Point(number, number)', () => {
        const p = new Point(3, 4);

        expect(p.x).toBe(3);
        expect(p.y).toBe(4);
    });
});

describe('member functions', () => {
    test('toStrSpace()', () => {
        const p = new Point(1, 2);

        expect(p.toStrSpace()).toBe("1 2");
    });

    //test('toStr()', () => {
    //    const p = new Point(1, 2);

    //    expect(p.toStr()).toBe("(1, 2)");
    //});
});

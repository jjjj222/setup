import { Point } from "../src/js/point.js";

test('Point(number, number)', () => {
    const p = new Point(3, 4);

    expect(p.x).toBe(3);
    expect(p.y).toBe(4);
});

test('toStrSpace()', () => {
    const p = new Point(1, 2);

    expect(p.toStrSpace()).toBe("1 2");
});

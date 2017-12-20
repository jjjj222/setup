import { Graph, Node, Edge } from "../src/js/graph.js";

test('constructor', () => {
    const g = new Graph();

    expect(g.nodes.length).toBe(0)
});



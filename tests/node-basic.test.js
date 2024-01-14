import { Node, NodeType } from "../b-plus-src/node.js";

var instanceA;
var instanceB;
beforeEach( () => {
    instanceA = new Node(NodeType.internal, 2);
    instanceB = new Node(NodeType.leaf, 2);
});

test("Can initiate instance", () => {
    expect(instanceA).toBeDefined();
    expect(instanceB).toBeDefined();
});

test("An internal node has type internal", () => {
    expect(instanceA.type).toMatch(NodeType.internal);
});

test("A leaf node has type leaf", () => {
    expect(instanceB.type).toMatch(NodeType.leaf);
});

test("A empty string as type throws an exceptions", () => {
    expect(() => {new Node("");}).toThrow("A node have to be ether of type internal or leaf");
});

test("The 'enum' as type throws an exceptions", () => {
    expect(() => {new Node(NodeType);}).toThrow("A node have to be ether of type internal or leaf");
});

test("A string with 'internal' or 'leaf' as type throws an exceptions", () => {
    expect(() => {new Node("internal");}).toThrow("A node have to be ether of type internal or leaf");
    expect(() => {new Node("leaf");}).toThrow("A node have to be ether of type internal or leaf");
});

test("A number as type throws an exceptions", () => {
    expect(() => {new Node(42);}).toThrow("A node have to be ether of type internal or leaf");
});

test("An internal node returns true from property isInternal", () => {
    expect(instanceA.isInternal).toBeTruthy();
});

test("An leaf node returns false from property isInternal", () => {
    expect(instanceB.isInternal).toBeFalsy();
});

test("An leaf node returns true from property isLeaf", () => {
    expect(instanceB.isLeaf).toBeTruthy();
});

test("An internal node returns false from property isLeaf", () => {
    expect(instanceA.isLeaf).toBeFalsy();
});

test("A new internal node has zero child's.", () => {
    expect(instanceA.childCount).toBe(0);
});

test("A new internal node has zero blocks.", () => {
    expect(instanceA.blockCount).toBe(0);
});

test("A new leaf node has zero child's.", () => {
    expect(instanceB.childCount).toBe(0);
});

test("A new leaf node has zero blocks.", () => {
    expect(instanceB.blockCount).toBe(0);
});

test("A internal node has a child array", () => {
    expect(instanceA.childArray).toBeDefined();
});

test("A leaf node has not a child array", () => {
    expect(instanceB.childArray).toBeUndefined();
});

test("A internal node has not a block array", () => {
    expect(instanceA.blockArray).toBeUndefined();
});

test("A leaf node has a block array", () => {
    expect(instanceB.blockArray).toBeDefined();
});

test("A internal node of order 10 has has a 11 size child array", () => {
    const instanceC = new Node(NodeType.internal, 10);
    expect(instanceC.childArray.length).toBe(11);
})

test("A leaf node of order 10 has has a 10 size block array", () => {
    const instanceC = new Node(NodeType.leaf, 10);
    expect(instanceC.blockArray.length).toBe(10);
})

test("A new node has key count equal to zero", () => {
    expect(instanceA.keyCount).toBe(0);
    expect(instanceB.keyCount).toBe(0);
});

test("A new node has zero keys", () => {
    expect(instanceA.keyArray).toEqual([, ]);
    expect(instanceB.keyArray).toEqual([, ]);
})




import { LeafBlock } from "../b-plus-src/LeafBlock.js";
import { Node, NodeType } from "../b-plus-src/node.js";

var instance;
beforeEach( () => {
    instance = new Node(NodeType.leaf, 2);
});

test("Adding a block increases block count.", () => {
    const elm = [{key:1}];
    instance.addBlock(new LeafBlock(elm));
    expect(instance.blockCount).toBe(1);
});

test("Adding a block populates block array", () => {
    const elm = [{key:1}];
    const block = new LeafBlock(elm)
    instance.addBlock(block);
    expect(instance.blockArray[0]).toStrictEqual(block);
});

test("Adding two blocks gives a block count of two.", () => {
    const elm1 = [{key:1}];
    const elm2 = [{key:2}];
    instance.addBlock(new LeafBlock(elm1));
    instance.addBlock(new LeafBlock(elm2));
    expect(instance.blockCount).toBe(2);
});

test("Adding two blocks with identical keys throws an exception", () => {
    const elm1 = [{key:1}];
    const elm2 = [{key:1}];
    instance.addBlock(new LeafBlock(elm1));
    expect(() => {instance.addBlock(new LeafBlock(elm2));}).toThrow("Key has to be unique.");
})

test("Adding 10 blocks to a node of order 11 gives a count of 10.", () => {
    const instanceA = makeNodeWithBlocks(10);
    expect(instanceA.blockCount).toBe(10);
});

test("Adding 35 blocks to a node of order 36 gives a key count of 35.", () => {
    const instanceA = makeNodeWithBlocks(35);
    expect(instanceA.keyCount).toBe(35);
})

test("Adding 8 blocks to a node with order 10 gives a correct key array.", () => {
    const instanceA = makeNodeWithBlocks(8, 10);
    expect(instanceA.keyArray).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, , ,]);
});

function makeNodeWithBlocks(num, order = num+1) {
    const instanceA = new Node(NodeType.leaf, order);
    for (let i = 0; i < num; i++) {
        instanceA.addBlock(new LeafBlock([{key:i}]));
    }
    return instanceA;
}

test("Adding 4 blocks out of order gives a correct key array", () => {
    const instanceA = new Node(NodeType.leaf, 5);
    instanceA.addBlock(new LeafBlock([{key: 10}]));
    instanceA.addBlock(new LeafBlock([{key: 5}]));
    instanceA.addBlock(new LeafBlock([{key: 7}]));
    instanceA.addBlock(new LeafBlock([{key: 3}]));
    expect(instanceA.keyArray).toHaveLength(5);
    expect(instanceA.keyArray).toStrictEqual([3, 5, 7, 10, ,]);
});
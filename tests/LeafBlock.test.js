import { LeafBlock } from "../b-plus-src/LeafBlock.js";

var instance;
beforeEach( () => {
    instance = new LeafBlock([{key:12}]);
});

test("Can initiate instance", () => {
    expect(instance).toBeDefined();
});

test("Initiate with no argument throws an exception", () => {
    expect(() => {new LeafBlock();}).toThrow("A block have to contain at least one element.");
});

test("Initiate with no elements throws an exception", () => {
    expect(() => {new LeafBlock([]);}).toThrow("A block have to contain at least one element.");
});

test("Initiated with 10 elements as argument has size of 10", () => {
    const elements = [
        {key: 23}, {key:24}, {key:25}, {key:26}, {key:27},
        {key: 28}, {key:29}, {key:30}, {key:31}, {key:32}
    ];
    const instanceA = new LeafBlock(elements);
    expect(instanceA.size).toBe(10);
})

test("BlockKey returns a number if element has number as key", () => {
    const key = instance.blockKey;
    const isNumber = isNaN(key) == false;
    expect(isNumber).toBeTruthy();
});

test("blockKey return the key of the block.", () => {
    expect(instance.blockKey).toBe(12);
});

test("No blockKey throws an exception", () => {
    expect(() => {new LeafBlock([{}]);}).toThrow("blockKey has to be defined.");
});

test("blockKey that is not a number throws an exception", () => {
    expect(() => {new LeafBlock([{key:"a"}]);}).toThrow("blockKey has to be a number.");
});

test("previousBlock is undefined if not set", () => {
    expect(instance.previousBlock).toBeUndefined();
});

test("previousBlock is set to different instance", () => {
    const instanceA = new LeafBlock([{key:10}]);
    instance.previousBlock = instanceA;
    expect(instance.previousBlock === instanceA).toBeTruthy(); 
})

test("previousBlock changes to a different block with bigger key", () => {
    const instanceA = new LeafBlock([{key:10}]);
    instance.previousBlock = instanceA;
    const instanceB = new LeafBlock([{key:11}]);
    instance.previousBlock = instanceB;
    expect(instanceA === instanceB).toBeFalsy();
    expect(instance.previousBlock === instanceB).toBeTruthy(); 
});

test("previousBlock changes to a different block with smaller key", () => {
    const instanceA = new LeafBlock([{key:10}]);
    instance.previousBlock = instanceA;
    const instanceB = new LeafBlock([{key:7}]);
    instance.previousBlock = instanceB;
    expect(instanceA === instanceB).toBeFalsy();
    expect(instance.previousBlock === instanceB).toBeTruthy(); 
});

test("previousBlock is set to undefined after set to an instance", () => {
    const instanceA = new LeafBlock([{key:1}]);
    instance.previousBlock = instanceA;
    instance.previousBlock = undefined;
    expect(instance.previousBlock).toBeUndefined();
})

test("previousBlock with equal key throws an exception", () => {
    const instanceA = new LeafBlock([{key:12}]);
    expect(() => {instance.previousBlock = instanceA}).toThrow("Previous blocks key have to be smaller then this blocks key.");
});

test("previousBlock with bigger key throws an exception", () => {
    const instanceA = new LeafBlock([{key:42}]);
    expect(() => {instance.previousBlock = instanceA}).toThrow("Previous blocks key have to be smaller then this blocks key.");
})

test("previousBlock with smaller key is set", () => {
    const instanceA = new LeafBlock([{key:8}]);
    instance.previousBlock = instanceA;
    expect(instance.previousBlock.blockKey).toBeLessThan(instance.blockKey);
});

test("nextBlock is undefined if not set", () => {
    expect(instance.nextBlock).toBeUndefined();
});

test("nextBlock is set to different instance", () => {
    const instanceA = new LeafBlock([{key:15}]);
    instance.nextBlock = instanceA;
    expect(instance.nextBlock === instanceA).toBeTruthy(); 
})

test("nextBlock changes to a different block with smaller key", () => {
    const instanceA = new LeafBlock([{key:15}]);
    instance.nextBlock = instanceA;
    const instanceB = new LeafBlock([{key:14}]);
    instance.nextBlock = instanceB;
    expect(instanceA === instanceB).toBeFalsy();
    expect(instance.nextBlock === instanceB).toBeTruthy(); 
});

test("nextBlock changes to a different block with bigger key", () => {
    const instanceA = new LeafBlock([{key:15}]);
    instance.nextBlock = instanceA;
    const instanceB = new LeafBlock([{key:28}]);
    instance.nextBlock = instanceB;
    expect(instanceA === instanceB).toBeFalsy();
    expect(instance.nextBlock === instanceB).toBeTruthy(); 
});

test("nextBlock is set to undefined after set to an instance", () => {
    const instanceA = new LeafBlock([{key:23}]);
    instance.nextBlock = instanceA;
    instance.nextBlock = undefined;
    expect(instance.nextBlock).toBeUndefined();
})

test("nextBlock with equal key throws an exception", () => {
    const instanceA = new LeafBlock([{key:12}]);
    expect(() => {instance.nextBlock = instanceA}).toThrow("Next blocks key have to be bigger then this blocks key.");
});

test("nextBlock with smaller key throws an exception", () => {
    const instanceA = new LeafBlock([{key:9}]);
    expect(() => {instance.nextBlock = instanceA}).toThrow("Next blocks key have to be bigger then this blocks key.");
})

test("nextBlock with bigger key is set", () => {
    const instanceA = new LeafBlock([{key:16}]);
    instance.nextBlock = instanceA;
    expect(instance.nextBlock.blockKey).toBeGreaterThan(instance.blockKey);
});





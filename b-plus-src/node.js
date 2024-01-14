
class Node {

    #type;
    #orderOfTheTree;
    #objectCount = 0;
    #objectArray
    #keyArray
    

    get type() {
        return this.#type;
    }

    get isInternal() {
        return this.#type == NodeType.internal;
    }

    get isLeaf() {
        return this.#type == NodeType.leaf;
    }

    get childCount() {
        return this.#type == NodeType.internal ? this.#objectCount : 0;
    }

    get blockCount() {
        return this.#type == NodeType.leaf ? this.#objectCount : 0;
    }

    get childArray() {
        return this.#type == NodeType.internal ? this.#objectArray : undefined;
    }

    get blockArray() {
        return this.#type == NodeType.leaf ? this.#objectArray : undefined;
    }

    get keyCount() {
        if (this.#type == NodeType.leaf) {
            return this.#objectCount;
        }
        const count = this.#objectCount - 1;
        if (count == -1) {
            return 0;
        }
        return count;
    }

    get keyArray() {
        return this.#keyArray;
    }

    constructor(type, orderOfTheTree, underflow = Math.ceil(orderOfTheTree/2), overflow = Math.ceil(orderOfTheTree/2)) {
        this.#testType(type);
        this.#testOrderOfTheTree(orderOfTheTree);
        this.#type = type;
        this.#orderOfTheTree = orderOfTheTree;
        this.#initArrays();
    }

    #testOrderOfTheTree(orderOfTheTree) {
        if (isNaN(orderOfTheTree) || orderOfTheTree < 2) {
            throw new Error("The order of the tree has to be 2 or greater.");
        }
    }

    #testType(type) {
        if ((type == NodeType.internal || type == NodeType.leaf) == false) {
            throw new Error("A node have to be ether of type internal or leaf");
        }
    }

    #initArrays() {
        if (this.#type == NodeType.internal) {
            this.#objectArray = new Array(this.#orderOfTheTree + 1);
        }
        else {
            this.#objectArray = new Array(this.#orderOfTheTree);
        }
        this.#keyArray = new Array(this.#orderOfTheTree);
    }

    addBlock(block) {
        if (this.isLeaf) {
            this.#addBlock(block);
        }
        else {
            const index = this.#findKeyIndex(block.blockKey);
            this.#objectArray[index].addBlock(block);
        }
    }

    #addBlock(block) {
        const index = this.#findKeyIndex(block.blockKey);
        this.#throwErrorIfKeyIsNotUnique(block.blockKey, index);
        this.#placeKeyInArray(block.blockKey, index);
        this.#placeBlockInArray(block, index);
        this.#objectCount++;
    }

    #findKeyIndex(key) {
        const keyCount = this.keyCount;
        for (let i = 0; i < keyCount; i++) {
            if (key < this.#keyArray[i]) {
                return i;
            }
        }
        return keyCount;
    }

    #throwErrorIfKeyIsNotUnique(key, index) {
        if (this.#objectArray[index-1] != undefined && this.#objectArray[index-1].blockKey == key) {
            throw new Error("Key has to be unique.");
        }
    }

    #placeKeyInArray(key, index) {
        this.#placeInArray(this.#keyArray, key, index);
    }

    #placeBlockInArray(block, index) {
        this.#placeInArray(this.#objectArray, block, index);
    }

    #placeInArray(array, element, index) {
        for (let i = this.#objectCount-1; i >= index; i--) {
            array[i + 1] = array[i];
        }
        array[index] = element;
        console.log(element);
    }

}

const NodeType = {
    internal: "nodeType-internal",
    leaf: "nodeType-leaf"
};

export { Node, NodeType };
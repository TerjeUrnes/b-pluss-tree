
class LeafBlock {
    #elements;
    #previousBlock;
    #nextBlock;

    get blockKey() {
        return this.#elements[0].key;
    }

    get size() {
        return this.#elements.length;
    }
    
    get previousBlock() {
        return this.#previousBlock;
    }

    set previousBlock(block) {
        if (block != undefined && block.blockKey >= this.blockKey) {
            throw new Error("Previous blocks key have to be smaller then this blocks key.")
        }
        this.#previousBlock = block;
    }

    get nextBlock() {
        return this.#nextBlock;
    }

    set nextBlock(block) {
        if (block != undefined && block.blockKey <= this.blockKey) {
            throw new Error("Next blocks key have to be bigger then this blocks key.")
        }
        this.#nextBlock = block;
    }

    constructor(elements) {
        if (elements == undefined || elements.length == 0) {
            throw new Error("A block have to contain at least one element.")
        }
        if(elements[0].key == undefined) {
            throw new Error("blockKey has to be defined.")
        }
        if (isNaN(elements[0].key)) {
            throw new Error("blockKey has to be a number.");
        }
        this.#elements = elements;
    }
}

export { LeafBlock }
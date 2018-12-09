console.log("Starting...");
console.time("whole");
const players = 426;
const maxMarble = 72058 * 100;
let player = 0;
const scores = [];
for (let i = 0; i < players; i++) {
    scores.push(0);
}

class Node {
    constructor(val, next, prev) {
        this._val = val;
        this._next = next;
        this._prev = prev;
    }

    get val() {
        return this._val;
    }

    get next() {
        return this._next;
    }

    set next(node) {
        this._next = node;
    }

    get prev() {
        return this._prev;
    }

    set prev(node) {
        this._prev = node;
    }
}

const head = new Node(0);
head.next = head;
head.prev = head;
let curNode = head;
console.log("Playing game");
console.time("game");
for (let marble = 1; marble <= maxMarble; marble++) {
    if (marble % 23 === 0) {
        scores[player] += marble;
        for (let i = 0; i < 7; i++) {
            curNode = curNode.prev;
        }
        scores[player] += curNode.val;
        curNode.prev.next = curNode.next;
        curNode.next.prev = curNode.prev;
        curNode = curNode.next;
    } else {
        const firstNode = curNode.next;
        const secNode = firstNode.next;
        const newNode = new Node(marble, secNode, firstNode);
        firstNode.next = newNode;
        secNode.prev = newNode;
        curNode = newNode;
    }
    player = (player + 1) % players;
}
console.timeEnd("game");
console.log("Finding max score");
let max = 0;
for (const score of scores) {
    if (score > max) {
        max = score;
    }
}
console.timeEnd("whole");
console.log(max);

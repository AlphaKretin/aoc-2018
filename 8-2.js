const fs = require("fs");

const parseDec = i => parseInt(i, 10);

function generateNode(numbers) {
    const node = {
        header: {
            children: numbers.shift(),
            meta: numbers.shift()
        },
        children: [],
        meta: []
    };
    for (let i = 0; i < node.header.children; i++) {
        node.children.push(generateNode(numbers));
    }
    for (let i = 0; i < node.header.meta; i++) {
        node.meta.push(numbers.shift());
    }
    return node;
}

function sumValue(node) {
    let value = 0;
    if (node.header.children < 1) {
        for (const meta of node.meta) {
            value += meta;
        }
        return value;
    }
    for (const meta of node.meta) {
        const index = meta - 1;
        if (index in node.children) {
            value += sumValue(node.children[index]);
        } // else value += 0
    }
    return value;
}

console.log("Reading input");
console.time("whole");
fs.readFile("input8.txt", "utf8", (err, input) => {
    console.log("Parsing input");
    console.time("input");
    const numbers = input.split(" ").map(parseDec);
    console.timeEnd("input");
    console.log("Building tree");
    console.time("tree");
    const head = generateNode(numbers);
    console.timeEnd("tree");
    console.log("Calculating answer");
    console.time("ans");
    console.log(sumValue(head));
    console.timeEnd("ans");
    console.timeEnd("whole");
});

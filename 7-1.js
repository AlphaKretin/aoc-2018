const fs = require("fs");

const RE = /Step (.) must be finished before step (.) can begin\./;

console.log("Reading input");
console.time("whole");
fs.readFile("input7.txt", "utf8", (err, input) => {
    console.log("Parsing input");
    console.time("input");
    const steps = [];
    input = input.split("\n");
    const map = {};
    for (let order of input) {
        const result = RE.exec(order);
        const a = result[1];
        const b = result[2];
        if (map[b]) {
            map[b].push(a);
        } else {
            map[b] = [a];
        }
        if (steps.indexOf(a) === -1) {
            steps.push(a);
        }
        if (steps.indexOf(b) === -1) {
            steps.push(b);
        }
    }
    console.timeEnd("input");
    console.log("Finding answer");
    console.time("ans");
    const ans = [];
    while (steps.length > 0) {
        const readySteps = [];
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            if (!(step in map) || map[step].length === 0) {
                readySteps.push(step);
            }
        }
        readySteps.sort();
        const step = readySteps[0];
        ans.push(step);
        for (const s in map) {
            const index = map[s].indexOf(step);
            if (index > -1) {
                map[s].splice(index, 1);
            }
        }
        steps.splice(steps.indexOf(step), 1);
    }
    console.timeEnd("ans");
    console.timeEnd("whole");
    console.log(ans.join(""));
});

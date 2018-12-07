const fs = require("fs");

const RE = /Step (.) must be finished before step (.) can begin\./;

const alpha = "qwertyuiopasdfghjklzxcvbnm"
    .toUpperCase()
    .split("")
    .sort();
alpha.unshift(" ");

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
    const workers = [
        {
            task: undefined,
            free: true,
            remaining: 0
        },
        {
            task: undefined,
            free: true,
            remaining: 0
        },
        {
            task: undefined,
            free: true,
            remaining: 0
        },
        {
            task: undefined,
            free: true,
            remaining: 0
        },
        {
            task: undefined,
            free: true,
            remaining: 0
        }
    ];
    let readySteps = [];
    while (ans.length < 26) {
        for (const worker of workers) {
            if (!worker.free) {
                worker.remaining--;
                if (worker.remaining < 1) {
                    const step = worker.task;
                    ans.push(step);
                    for (const s in map) {
                        const index = map[s].indexOf(step);
                        if (index > -1) {
                            map[s].splice(index, 1);
                        }
                    }
                    worker.task = undefined;
                    worker.free = true;
                    worker.remaining = 0;
                }
            }
        }
        const newSteps = [];
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            if (!(step in map) || map[step].length === 0) {
                newSteps.push(step);
                steps.splice(i, 1);
            }
        }
        newSteps.sort();
        readySteps = readySteps.concat(newSteps);
        for (const step of readySteps) {
            for (const worker of workers) {
                if (worker.free) {
                    worker.task = step;
                    worker.free = false;
                    worker.remaining = 60 + alpha.indexOf(step);
                    readySteps.splice(readySteps.indexOf(step), 1);
                    break;
                }
            }
        }
    }
    console.timeEnd("ans");
    console.timeEnd("whole");
    console.log(ans.join(""));
});

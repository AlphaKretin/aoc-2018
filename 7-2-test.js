const fs = require("fs");

const RE = /Step (.) must be finished before step (.) can begin\./;

const alpha = "qwertyuiopasdfghjklzxcvbnm"
    .toUpperCase()
    .split("")
    .sort();
alpha.unshift(" ");

console.log("Reading input");
console.time("whole");
fs.readFile("input7-test.txt", "utf8", (err, input) => {
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
        }
    ];
    console.dir(map);
    let readySteps = [];
    const origLength = steps.length;
    let second = 0;
    const log = ["Second\tW1\tW2\tDone"];
    while (ans.length < origLength) {
        const newSteps = [];
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
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            if (!(step in map) || map[step].length === 0) {
                newSteps.push(step);
                steps.splice(i, 1);
                i--;
            }
        }
        newSteps.sort();
        readySteps = readySteps.concat(newSteps);
        for (const worker of workers) {
            if (worker.free && readySteps.length > 0) {
                worker.task = readySteps.shift();
                worker.free = false;
                worker.remaining = alpha.indexOf(worker.task);
            }
        }
        log.push(second + "\t" + (workers[0].task || ".") + "\t" + (workers[1].task || ".") + "\t" + ans.join(""));
        second++;
    }
    console.timeEnd("ans");
    console.timeEnd("whole");
    console.log(log.join("\n"));
    console.log(ans.join(""));
});

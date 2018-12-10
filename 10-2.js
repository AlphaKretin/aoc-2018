const fs = require("fs");

const RE = /position=<([- \d]+), ([- \d]+)> velocity=<([- \d]+), ([- \d]+)>/;

function check(coords, t) {
    // checks for size of bounds, word should exist when they're smallest
    let minX = coords[0].curX(t);
    let maxX = coords[0].curX(t);
    let minY = coords[0].curY(t);
    let maxY = coords[0].curY(t);
    for (const coord of coords) {
        minX = Math.min(minX, coord.curX(t));
        maxX = Math.max(maxX, coord.curX(t));
        minY = Math.min(minY, coord.curY(t));
        maxY = Math.max(maxY, coord.curY(t));
    }
    return (maxX - minX) * (maxY - minY);
}

function drawField(coords, t) {
    let minX = coords[0].curX(t);
    let minY = coords[0].curY(t);
    for (const coord of coords) {
        minX = Math.min(minX, coord.curX(t));
        minY = Math.min(minY, coord.curY(t));
    }

    let maxX = coords[0].curX(t) - minX;
    let maxY = coords[0].curY(t) - minY;
    for (const coord of coords) {
        maxX = Math.max(maxX, coord.curX(t) - minX);
        maxY = Math.max(maxY, coord.curY(t) - minY);
    }

    const row = [];
    for (let x = 0; x <= maxX; x++) {
        row.push(0);
    }
    const field = [];
    for (let y = 0; y <= maxY; y++) {
        field.push(row.slice());
    }

    for (const coord of coords) {
        field[coord.curY(t) - minY][coord.curX(t) - minX] = 1;
    }

    console.log(field.map(row => row.map(c => (c === 1 ? "#" : ".")).join("")).join("\n"));
}

console.log("Reading input");
console.time("whole");
fs.readFile("input10.txt", "utf8", (err, input) => {
    console.log("Parsing input");
    console.time("input");

    const coords = [];
    const lines = input.split("\n");
    for (const line of lines) {
        const result = RE.exec(line);
        if (result) {
            const coord = {
                x: parseInt(result[1]),
                y: parseInt(result[2]),
                vx: parseInt(result[3]),
                vy: parseInt(result[4]),
                curX: function(t) {
                    return this.x + this.vx * t;
                },
                curY: function(t) {
                    return this.y + this.vy * t;
                }
            };
            coords.push(coord);
        }
    }

    console.timeEnd("input");
    console.log("Finding answer");
    console.time("ans");
    let t = 1;
    let prevSize = check(coords, 0);
    let curSize = check(coords, 1);
    while (curSize < prevSize) {
        t++;
        prevSize = curSize;
        curSize = check(coords, t);
    }
    console.timeEnd("ans");
    console.log("Drawing answer...");
    console.time("draw");
    console.log(--t);
    console.timeEnd("draw");
    console.timeEnd("whole");
});

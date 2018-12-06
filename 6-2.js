const fs = require("fs");

const parseDec = i => parseInt(i, 10);

console.log("Reading input");
console.time("whole");
fs.readFile("input6.txt", "utf8", (err, input) => {
    console.time("input");
    let maxX = 0;
    let maxY = 0;
    const coords = input.split("\n").map(i => {
        let coord = i.split(", ").map(parseDec);
        if (coord[0] > maxX) {
            maxX = coord[0];
        }
        if (coord[1] > maxY) {
            maxY = coord[1];
        }
        return coord;
    });
    console.timeEnd("input");
    console.log("Building space");
    const col = [];
    for (let i = 0; i <= maxY; i++) {
        col.push(0);
    }
    const field = [];
    for (let i = 0; i <= maxX; i++) {
        field.push(col.slice());
    }
    console.log("Calculating distances and answer");
    console.time("distance");
    let regionSize = 0;
    for (let x = 0; x < field.length; x++) {
        const col = field[x];
        for (let y = 0; y < col.length; y++) {
            let totalDist = 0;
            for (const coord of coords) {
                const dist = Math.abs(coord[0] - x) + Math.abs(coord[1] - y);
                totalDist += dist;
            }
            if (totalDist < 10000) {
                regionSize++;
                field[x][y] = 1;
            }
        }
    }
    console.timeEnd("distance");
    console.timeEnd("whole");
    console.log(regionSize);
});

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
    console.log("Calculating distances");
    console.time("distance");
    const counts = {};
    for (let x = 0; x < field.length; x++) {
        const col = field[x];
        for (let y = 0; y < col.length; y++) {
            let minDist = maxX + maxY;
            let closestCoordIndex = -1;
            let mult = false;
            for (let i = 0; i < coords.length; i++) {
                const coord = coords[i];
                dist = Math.abs(coord[0] - x) + Math.abs(coord[1] - y);
                if (dist < minDist) {
                    minDist = dist;
                    closestCoordIndex = i;
                    mult = false;
                } else if (dist === minDist) {
                    mult = true;
                }
            }
            if (mult) {
                closestCoordIndex = -1;
            }
            field[x][y] = closestCoordIndex;
            if (closestCoordIndex in counts) {
                counts[closestCoordIndex]++;
            } else {
                counts[closestCoordIndex] = 1;
            }
        }
    }
    console.timeEnd("distance");
    console.log("Calculating answer");
    console.time("ans");
    //area is infinite if on edge
    const infiniteAreas = [];
    for (let i = 0; i < field.length; i++) {
        const col = field[i];
        if (i === 1 || i === field.length - 1) {
            for (const index of col) {
                if (infiniteAreas.indexOf(index) === -1) {
                    infiniteAreas.push(index);
                    delete counts[index];
                }
            }
        } else {
            for (const j of [0, col.length - 1]) {
                const index = col[j];
                if (infiniteAreas.indexOf(index) === -1) {
                    infiniteAreas.push(index);
                    delete counts[index];
                }
            }
        }
    }

    let maxCount = 0;
    for (const index in counts) {
        const count = counts[index];
        if (count > maxCount) {
            maxCount = count;
        }
    }
    console.timeEnd("ans");
    console.timeEnd("whole");
    console.log(maxCount);
});

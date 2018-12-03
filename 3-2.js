const fs = require("fs");

const ID = /#(\d+)/;
const POS = /@ (\d+),(\d+)/;
const SIZE = /(\d+)x(\d+)/;

function parseClaim(input) {
    const claim = {};
    claim.id = ID.exec(input)[1];
    const po = POS.exec(input);
    claim.x = parseInt(po[1]);
    claim.y = parseInt(po[2]);
    const si = SIZE.exec(input);
    claim.width = parseInt(si[1]);
    claim.height = parseInt(si[2]);
    claim.wall = claim.x + claim.width;
    claim.ciel = claim.y + claim.height;
    return claim;
}

console.log("Reading input");
fs.readFile("input3.txt", "utf8", (err, file) => {
    const input = file.split("\n");
    const claims = [];
    let wid = 0;
    let hei = 0;
    console.log("Parsing input");
    for (const put of input) {
        const claim = parseClaim(put);
        claims.push(claim);
        if (claim.wall > wid) {
            wid = claim.wall;
        }
        if (claim.ciel > hei) {
            hei = claim.ciel;
        }
    }
    const col = [];
    for (let i = 0; i < hei; i++) {
        col.push(0);
    }
    const field = [];
    for (let i = 0; i < wid; i++) {
        field.push(JSON.parse(JSON.stringify(col)));
    }
    console.log("Processing claims");
    for (const claim of claims) {
        for (let i = 0; i < claim.width; i++) {
            for (let j = 0; j < claim.height; j++) {
                field[claim.x + i][claim.y + j]++;
            }
        }
    }
    console.log("Finding answer");
    for (const claim of claims) {
        let overlaps = 0;
        for (let i = 0; i < claim.width; i++) {
            for (let j = 0; j < claim.height; j++) {
                if (field[claim.x + i][claim.y + j] > 1) {
                    overlaps++;
                }
            }
        }
        if (overlaps === 0) {
            console.log(claim.id);
        }
    }
});

const init = "#.#####.#.#.####.####.#.#...#.......##..##.#.#.#.###..#.....#.####..#.#######.#....####.#....##....#";
let row = init.split("");

const GENERATION_CAP = 50000000000;

const map = {
    "##.##": ".",
    "#.#..": ".",
    ".....": ".",
    "##..#": "#",
    "###..": "#",
    ".##.#": ".",
    "..#..": "#",
    "##.#.": "#",
    ".##..": ".",
    "#..#.": ".",
    "###.#": "#",
    ".####": "#",
    ".#.##": ".",
    "#.##.": "#",
    ".###.": "#",
    "#####": ".",
    "..##.": ".",
    "#.#.#": ".",
    "...#.": "#",
    "..###": ".",
    ".#.#.": "#",
    ".#...": "#",
    "##...": "#",
    ".#..#": "#",
    "#.###": "#",
    "#..##": "#",
    "....#": ".",
    "####.": ".",
    "#...#": "#",
    "#....": ".",
    "...##": ".",
    "..#.#": "#"
};

function get(i) {
    return i - 2 in row ? row[i - 2] : ".";
}

function count(r, offset) {
    let ans = 0;
    for (let i = 0; i < r.length; i++) {
        if (r[i] === "#") {
            ans += i - offset;
        }
    }
    return ans;
}

console.log("Starting...");
console.time("whole");
console.log("Applying generations");
console.time("gen");
let offset = 0;
let lastScore = 0;
let lastDiff = 0;
for (let generation = 1; generation <= 2000; generation++) {
    if (generation % 1000 === 0) {
        console.log(generation);
    }
    let oldRow = row.slice();
    oldRow.unshift(".", ".", ".", ".");
    offset += 4;
    oldRow.push(".", ".", ".", ".");
    let newRow = [];
    for (let i = 0; i < oldRow.length; i++) {
        const sample = get(i - 2) + get(i - 1) + get(i) + get(i + 1) + get(i + 2);
        if (sample in map) {
            newRow.push(map[sample]);
        } else {
            newRow.push(".");
        }
    }
    row = newRow;
    while (row[0] === ".") {
        row.shift();
        offset--;
    }
    const ct = count(row, offset);
    console.log(generation);
    console.log(ct);
    console.log(ct - lastScore);
    lastScore = ct;
    if (ct - lastScore === lastDiff) {
        break;
    }
    lastDiff = ct - lastScore;
}
console.timeEnd("gen");
console.timeEnd("whole");

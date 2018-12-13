const init = "#..#.#..##......###...###";
let row = init.split("");

const map = {
    "...##": "#",
    "..#..": "#",
    ".#...": "#",
    ".#.#.": "#",
    ".#.##": "#",
    ".##..": "#",
    ".####": "#",
    "#.#.#": "#",
    "#.###": "#",
    "##.#.": "#",
    "##.##": "#",
    "###..": "#",
    "###.#": "#",
    "####.": "#"
};

function get(i) {
    return i - 2 in row ? row[i - 2] : ".";
}

console.log("Starting...");
console.time("whole");
console.log("Applying generations");
console.time("gen");
for (let generation = 1; generation <= 20; generation++) {
    let oldRow = row.slice();
    oldRow.unshift(".", ".");
    oldRow.push(".", ".");
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
}
console.timeEnd("gen");
console.log("Calculating answer");
console.time("ans");
let ans = 0;
const offset = 20 * 2;
for (let i = 0; i < row.length; i++) {
    if (row[i] === "#") {
        ans += i - offset;
    }
}
console.timeEnd("ans");
console.timeEnd("whole");
console.log(ans);

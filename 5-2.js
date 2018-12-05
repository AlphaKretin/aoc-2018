const fs = require("fs");

function reactPolymer(input) {
    let check = true;
    while (check) {
        check = false;
        for (let i = 0; i < input.length - 1; i++) {
            const a = input.charAt(i);
            const b = input.charAt(i + 1);
            if ((a === b.toLowerCase() || a === b.toUpperCase()) && a !== b) {
                input = input.slice(0, i) + input.slice(i + 2);
                check = true;
                break;
            }
        }
    }
    return input;
}
const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];
console.log("Reading input");
console.time("whole");
fs.readFile("input5.txt", "utf8", (err, input) => {
    let minLength = input.length;
    for (const letter of letters) {
        console.log("Removing " + letter);
        console.time(letter);
        const re = new RegExp(letter, "gi");
        let newInput = input.replace(re, "");
        console.log("Reacting polymer for " + letter);
        newInput = reactPolymer(newInput);
        console.log("len: " + newInput.length);
        console.timeEnd(letter);
        if (newInput.length < minLength) {
            minLength = newInput.length;
        }
    }
    console.timeEnd("whole");
    console.log(minLength);
});

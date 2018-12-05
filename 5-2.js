const fs = require("fs");

function reactPolymer(input) {
    const stack = [];
    for (const letter of input) {
        const peek = stack[stack.length - 1];
        if ((peek === letter.toLowerCase() || peek === letter.toUpperCase()) && peek !== letter) {
            stack.pop();
        } else {
            stack.push(letter);
        }
    }
    return stack.join("");
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

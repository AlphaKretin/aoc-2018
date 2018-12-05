const fs = require("fs");

console.log("Reading input");
console.time("whole");
fs.readFile("input5.txt", "utf8", (err, input) => {
    const stack = [];
    for (const letter of input) {
        const peek = stack[stack.length - 1];
        if ((peek === letter.toLowerCase() || peek === letter.toUpperCase()) && peek !== letter) {
            stack.pop();
        } else {
            stack.push(letter);
        }
    }
    input = stack.join("");
    console.log(input.length);
    console.timeEnd("whole");
});

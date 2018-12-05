const fs = require("fs");

console.log("Reading input");
console.time("whole");
fs.readFile("input5.txt", "utf8", (err, input) => {
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
    console.log(input.length);
    console.timeEnd("whole");
});

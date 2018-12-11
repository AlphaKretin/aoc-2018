console.log("Starting...");
console.time("whole");
const serial = 9798;

const getPower = (x, y) => {
    const rackID = x + 10;
    let power = rackID * y;
    power += serial;
    power *= rackID;
    power = ((power % 1000) - (power % 100)) / 100;
    power -= 5;
    return power;
};

let maxPower = 0;
let maxX = 1;
let maxY = 1;

const memo = {};

for (let x = 1; x <= 300 - 2; x++) {
    for (let y = 1; y <= 300 - 2; y++) {
        let power = 0;
        for (let xoff = 0; xoff < 3; xoff++) {
            for (let yoff = 0; yoff < 3; yoff++) {
                if (memo[x + xoff] && y + yoff in memo[x + xoff]) {
                    power += memo[x + xoff][y + yoff];
                } else {
                    const p = getPower(x + xoff, y + yoff);
                    if (!(x + xoff in memo)) {
                        memo[x + xoff] = {};
                    }
                    memo[x + xoff][y + yoff] = p;
                    power += p;
                }
            }
        }
        if (power > maxPower) {
            maxPower = power;
            maxX = x;
            maxY = y;
        }
    }
}
console.timeEnd("whole");
console.log(maxX);
console.log(maxY);
console.log(maxPower);

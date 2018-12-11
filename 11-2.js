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
let maxSize = 1;

const memo = {};

for (let size = 1; size <= 300; size++) {
    console.time(size.toString());
    const sizeBound = 300 - size + 1;
    for (let x = 1; x <= sizeBound; x++) {
        for (let y = 1; y <= sizeBound; y++) {
            let power = 0;
            for (let xoff = 0; xoff < size; xoff++) {
                for (let yoff = 0; yoff < size; yoff++) {
                    if (size === 1) {
                        const p = getPower(x + xoff, y + yoff);
                        if (y === 1) {
                            memo[x + xoff] = {};
                        }
                        memo[x + xoff][y + yoff] = p;
                        power += p;
                    } else {
                        power += memo[x + xoff][y + yoff];
                    }
                }
            }
            if (power > maxPower) {
                maxPower = power;
                maxX = x;
                maxY = y;
                maxSize = size;
            }
        }
    }
    console.timeEnd(size.toString());
}

console.timeEnd("whole");
console.log(maxX);
console.log(maxY);
console.log(maxSize);
console.log(maxPower);

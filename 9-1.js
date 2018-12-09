console.log("Starting...");
console.time("whole");
const players = 426;
const maxMarble = 72058;
let player = 0;
const scores = [];
for (let i = 0; i < players; i++) {
    scores.push(0);
}
const marbles = [0];
let currentMarble = 0;
console.log("Playing game");
console.time("game");
for (let marble = 1; marble <= maxMarble; marble++) {
    if (marble % 23 === 0) {
        scores[player] += marble;
        let removeIndex = currentMarble - 7;
        if (removeIndex < 0) {
            removeIndex = marbles.length + removeIndex;
        }
        scores[player] += marbles[removeIndex];
        marbles.splice(removeIndex, 1);
        currentMarble = removeIndex;
    } else {
        const nextIndex = (currentMarble + 2) % marbles.length;
        marbles.splice(nextIndex, 0, marble);
        currentMarble = nextIndex;
    }
    player = (player + 1) % players;
}
console.timeEnd("game");
console.log("Finding max score");
let max = 0;
for (const score of scores) {
    if (score > max) {
        max = score;
    }
}
console.timeEnd("whole");
console.log(max);

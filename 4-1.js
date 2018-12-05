const EXTRACT_DATE = /\[\d{4}-(\d{2})-(\d{2}) (\d{2}):(\d{2})] (.+)/;

function parseRecord(entry) {
    const reg = EXTRACT_DATE.exec(entry);
    const result = {
        month: parseInt(reg[1]),
        day: parseInt(reg[2]),
        hour: parseInt(reg[3]),
        minute: parseInt(reg[4]),
        info: reg[5]
    };
    return result;
}

const fs = require("fs");

console.log("Reading input");
console.time("whole");
fs.readFile("input4.txt", "utf8", (err, file) => {
    const input = file.split("\n");
    console.log("Parsing and sorting records");
    console.time("records");
    const records = input.map(parseRecord);
    records.sort((a, b) => {
        if (a.month === b.month) {
            if (a.day === b.day) {
                if (a.hour === b.hour) {
                    return a.minute - b.minute;
                }
                return a.hour - b.hour;
            }
            return a.day - b.day;
        }
        return a.month - b.month;
    });
    console.timeEnd("records");
    console.log("Analysing guards");
    console.time("guards");
    const GUARD_ID = /Guard #(\d+) begins shift/;
    const guards = {};
    let currentGuard = -1;
    let lastMinute = -1;
    let asleep = false;
    for (let record of records) {
        const id = GUARD_ID.exec(record.info);
        if (id) {
            //new guard
            currentGuard = id[1];
            asleep = false;
        }
        if (!(currentGuard in guards)) {
            guards[currentGuard] = {
                id: currentGuard,
                awake: [],
                asleep: []
            };
        }
        if (record.info === "falls asleep") {
            for (let i = lastMinute; i < record.minute; i++) {
                guards[currentGuard].awake.push(i);
            }
            asleep = true;
        }
        if (record.info === "wakes up") {
            for (let i = lastMinute; i < record.minute; i++) {
                guards[currentGuard].asleep.push(i);
            }
            asleep = false;
        }
        lastMinute = record.minute;
    }
    console.timeEnd("guards");
    console.log("Finding sleepiest guard and answer");
    console.time("sleep");
    let maxGuard = Object.keys(guards)[0];
    for (const id in guards) {
        if (guards[id].asleep.length > guards[maxGuard].asleep.length) {
            maxGuard = id;
        }
    }
    const freqs = {};
    for (const minute of guards[maxGuard].asleep) {
        if (minute in freqs) {
            freqs[minute]++;
        } else {
            freqs[minute] = 0;
        }
    }
    let maxMinute = Object.keys(freqs)[0];
    for (const minute in freqs) {
        if (freqs[minute] > freqs[maxMinute]) {
            maxMinute = minute;
        }
    }
    console.timeEnd("sleep");
    console.log("id " + maxGuard + " min " + maxMinute + " ans " + maxGuard * maxMinute);
    console.timeEnd("whole");
});

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
    console.log("Finding answer");
    console.time("answer");
    let ansGuard = -1;
    let ansMinute = -1;
    let maxFreq = 0;
    for (let i = 0; i < 60; i++) {
        let maxGuard = -1;
        let maxCount = 0;
        for (let id in guards) {
            const guard = guards[id];
            let count = 0;
            for (const minute of guard.asleep) {
                if (minute === i) {
                    count++;
                }
            }
            if (count > maxCount) {
                maxCount = count;
                maxGuard = id;
            }
        }
        if (maxCount > maxFreq) {
            maxFreq = maxCount;
            ansGuard = maxGuard;
            ansMinute = i;
        }
    }
    console.timeEnd("answer");
    console.log("id " + ansGuard + " min " + ansMinute + " ans " + ansGuard * ansMinute);
    console.timeEnd("whole");
});

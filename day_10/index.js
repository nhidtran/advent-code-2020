const fs = require('fs')


fs.readFile("input.txt", "utf-8", function(err, data) {
    /** sample input ***/
    const arr = data.split(/\r?\n/).map(str => +str);

    const allCorrespondingAdapters = arr.reduce((acc, curr, idx) => {
        if (!acc.temp.has(curr)) {
            acc.temp.set(curr, []);
        }
        if (acc.temp.has(curr - 1)) {
            acc.temp.set(curr - 1, [ ...acc.temp.get(curr-1), curr])
        }
        if (acc.temp.has(curr - 2)) {
            acc.temp.set(curr - 2, [ ...acc.temp.get(curr-2), curr])
        }
        if (acc.temp.has(curr - 3)) {
            acc.temp.set(curr - 3, [ ...acc.temp.get(curr-3), curr])
        }
    
        if (acc.temp.has(curr + 1)) {
            acc.temp.set(curr, [ ...acc.temp.get(curr), curr + 1 ])
        }
        if (acc.temp.has(curr + 2)) {
            acc.temp.set(curr, [ ...acc.temp.get(curr), curr + 2 ])
        }
        if (acc.temp.has(curr + 3)) {
            acc.temp.set(curr, [ ...acc.temp.get(curr), curr + 3 ])
        }
    
        return acc;
    }, {
        currMax: 0,
        temp: new Map([[0, []]])
    })
    

    
    let joltDiff1 = 0; // should be 1
    let joltDiff3 = 0; // should be 5

    let frontier = [];
    let explored = new Set();
    console.log("Map:", allCorrespondingAdapters.temp)

    allCorrespondingAdapters.temp.forEach((value, key) => {
        if (!explored.has(key)) {
          frontier.push(key)
        }
    while(frontier.length) {
        const curr = frontier.shift();
        if (!explored.has(curr)) {
            explored.add(curr)
        }
        const adapters = allCorrespondingAdapters.temp.get(curr);
        adapters
        .map(n => {
            const diff = n - curr;
            if (diff == 1) {
                ++joltDiff1
            }
            if (diff == 3) {
                ++joltDiff3
            }
            if (!explored.has(n)) {
                frontier.push(n)
                explored.add(n)

            }
        })
    }
    })
    
    console.log('joltDiff1:', joltDiff1)
    console.log('joltDiff3:', joltDiff3)


})
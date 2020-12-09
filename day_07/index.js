const { count } = require('console');
const fs = require('fs');
const { parse } = require('path');

function parseForKey(line) {
    return line.substr(line, line.indexOf('contain')).trim();
}


function createKey(line) {
    return {
        [parseForKey[line]]: parseForValue(line)
    }
}

function parseForValues(line) {
    const key = line.splice(0).trim();
    return {
        [key]: line
    }
}


fs.readFile("input.txt", "utf-8", function(err, data) {
    const arr =  data.split(/\r?\n/);

    const map = new Map()

    const res = arr.reduce((acc, curr, idx) => {
        const key = parseForKey(curr).replace("bags", "bag");
        const bags = curr.substr(curr.indexOf("contain") + 7).replace('.', '').split(',').map(bag => 
            bag.replace("bags", "bag").trim()
        );

        const values = bags.reduce((acc, bagStr, idx) => {
            if (bagStr.includes("no other bag")) {
                return acc
            }
            const numOfBags = bagStr[0];
            const bag = bagStr.substr(1).replace("bags", "bag").trim()
    
            if (!map.has(bag)) {
                map.set(bag);
            }
            return {
                ...acc,
                [bag]: numOfBags
            }
        }, {})

        
        map.set(key, values);

        return acc
    }, map)

    // TODO - do the BFS better..

    const target = "shiny gold bag"
    let stack = [];
    let visited = []

    const mapKeys =  Array.from(res.keys())
    const bagsThatHoldGold = Array.from(res.keys()).reduce((count, curr) => {
        const values = Object.keys(map.get(curr));
        if (values.includes(target) && !visited[curr]) {
            visited[curr] = true;
            stack.push(curr);
        }
        while(stack.length) {
            const temp = stack.pop();
            ++count
            mapKeys.map(key => {
                if (Object.keys(map.get(key)).includes(temp) && !visited[key]) {
                    visited[key] = true;
                    stack.push(key);
                }
            })
        }
        return count;
    }, 0)
    console.log('%cres', 'color:pink', bagsThatHoldGold);
})


module.exports = {
    parseForKey,
    parseForValues
}
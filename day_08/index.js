const fs = require('fs');



function executeInstructions(instructions = [], visited, idx = 0, acc = 0) {
    if (visited[idx]) {
        return acc;
    }
    const instruction = (instructions[idx].match('nop') || instructions[idx].match('acc') || instructions[idx].match('jmp') )[0];
    const stepValue = (instructions[idx].match(/\d+/))[0]
    const direction = (instructions[idx].match(/[-+]/))[0]

    visited[idx] = true;
    switch(instruction) {
        case 'nop':
            ++idx;
            break;
        case 'acc':
            if (direction == '+') acc += +stepValue;
            if (direction == '-') acc -= +stepValue;
            ++idx;
            break;
        case 'jmp':
            if (direction == '+') idx += +stepValue;
            if (direction == '-') idx -= +stepValue;
            break;
    }
    return executeInstructions(instructions, visited, idx, acc);
}


fs.readFile("input.txt", "utf-8", function(err, data) {
    const arr = data.split(/\r?\n/);
    let visited = Array(Object.keys(arr).length).fill(0)

    const count = executeInstructions(arr, visited, 0, 0)
    console.log('count:', count)

})
const ParseInput = require('./InputOperations/Parser');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let inputBuffer = ''; 

rl.on('line', (line) => {
    if (line.trim().toLowerCase() === 'end') {
        if (inputBuffer.trim()) { 
            let FullInput = ParseInput(inputBuffer);
            
            inputBuffer = ''; 
        }
        console.log('Ready for more input...');
    } else {
        inputBuffer += line + '\n'; 
    }
});

console.log('Please enter Team Information and Match Results (or "exit" to quit):');
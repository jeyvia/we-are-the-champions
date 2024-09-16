const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput() {
    rl.question('Enter some input (or "exit" to quit): ', (input) => {
        if (input === 'exit') {
            rl.close();
        } else {
            console.log('You entered:', input);
            getInput();
        }
    });
}

getInput();
function ParseInput(input) {
    const lines = input.split('\n');
    const teams = [];
    const results = [];
    let maxGroupNumber = 0;
    let index = 1;
    let matchResultsFound = false;
    if (lines[0].toLowerCase().includes('team information:')) {
        for (; index < lines.length && !matchResultsFound; index++) {
            const line = lines[index];
            if (line !== undefined) {
                if (lines[index].toLowerCase().includes("match results:")) {
                    matchResultsFound = true;
                    index++;
                } else {
                    const args = line.split(' ');
                    if (args.length === 3) {
                        teams.push({
                            teamName: args[0],
                            registrationDate: args[1],
                            groupNumber: parseInt(args[2])
                        });
                        if (parseInt(args[2]) > maxGroupNumber) {
                            maxGroupNumber = parseInt(args[2]);
                        }
                    }
                }
            }
        }
        for (; index < lines.length; index++) {
            const line = lines[index];
            const args = line.split(' ');
            if (args.length === 4) {
                results.push({
                    team1: args[0],
                    team2: args[1],
                    team1Score: parseInt(args[2]),
                    team2Score: parseInt(args[3])
                });
            }
        }
        return {
            Type: "TeamInfoResults",
            Teams: teams,
            Results: results,
            NumOfGroups: maxGroupNumber
        };
    } else if (lines[0].toLowerCase().includes('/')) {

    }
}

function ParseDateString(dateStr) {
    const [day, month] = dateStr.split('/').map(Number);
    const year = new Date().getFullYear(); 
    return new Date(year, month - 1, day);
}

module.exports = { ParseInput, ParseDateString };
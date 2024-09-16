function ParseInput(input) {
    const lines = input.split('\n');
    const teams = [];
    const results = [];
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
            type: "teamInfoResults",
            teams: teams,
            results: results
        };
    } else if (lines[0].toLowerCase().includes('/')) {
        
    }
}

module.exports = ParseInput;
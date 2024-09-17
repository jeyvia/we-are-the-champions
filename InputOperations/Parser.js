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
        const command = lines[0].split(' ')[0];
        if (command.toLowerCase().includes('/print')) {
            const args = lines[0].split(' ');
            if (args.length === 2) {
                return {
                    Type: "TeamDetails",
                    TeamName: args[1]
                };
            } else {
                return {
                    Type: "PrintTable"
                };
            }
        } else if (command.toLowerCase().includes('/edit')) {
            for (let i = 1; i < lines.length; i++) {
                const args = lines[i].split(' ');
                if (args.length === 4) {
                    results.push({
                        team1: args[0],
                        team2: args[1],
                        team1Score: parseInt(args[2]),
                        team2Score: parseInt(args[3])
                    });
                } else if (args.length === 3) {
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
            return {
                Type: "Edit",
                Teams: teams,
                Results: results,
                NumOfGroups: maxGroupNumber
            };
        } else if (command.toLowerCase().includes('/clear')) {
            return {
                Type: "Delete"
            };
        } else {
            return {
                Type: "Invalid"
            };
        }
    } else if (lines[0].toLowerCase().includes('exit')) {
        return {
            Type: "Exit"
        };
    }
    return {
        Type: "Invalid"
    };
}

function ParseDateString(dateStr) {
    const [day, month] = dateStr.split('/').map(Number);
    const year = new Date().getFullYear(); 
    return new Date(year, month - 1, day);
}

module.exports = { ParseInput, ParseDateString };
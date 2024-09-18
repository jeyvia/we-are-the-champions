const { ValidateTeamInformationInput, ValidateMatchResultsInput, ValidatePrintInput, ValidateEditInput } = require('./InputValidation');

const TYPES = {
    FormTable: "FormTable",
    PrintTeam: "PrintTeam",
    PrintTable: "PrintTable",
    Edit: "Edit",
    Delete: "Delete",
    Exit: "Exit",
    Invalid: "Invalid",
}

const COMMANDS = {
    TeamInformation: "team information:",
    MatchResults: "match results:",
    Print: "/print",
    Edit: "/edit",
    Delete: "/delete",
    Exit: "/exit"
}

function ParseInput(input) {
    const lines = input.split('\n');
    const teams = [];
    const results = [];
    let maxGroupNumber = 0;
    let index = 1;
    let matchResultsFound = false;
    if (lines[0].toLowerCase() === (COMMANDS.TeamInformation)) {
        for (; index < lines.length - 1 && !matchResultsFound; index++) {
            const line = lines[index];
            if (line !== undefined) {
                if (lines[index].toLowerCase() === (COMMANDS.MatchResults)) {
                    matchResultsFound = true;
                } else {
                    try {
                        const args = ValidateTeamInformationInput(line);
                        teams.push({
                            teamName: args[0],
                            registrationDate: args[1],
                            groupNumber: parseInt(args[2])
                        });
                        if (parseInt(args[2]) > maxGroupNumber) {
                            maxGroupNumber = parseInt(args[2]);
                        }
                    } catch (error) {
                        console.log("Error:", error.message);
                    }
                }
            }
        }
        for (; index < lines.length-1; index++) {
            try {
                const line = lines[index];
                const args = ValidateMatchResultsInput(line);
                results.push({
                    team1: args[0],
                    team2: args[1],
                    team1Score: parseInt(args[2]),
                    team2Score: parseInt(args[3])
                });
            } catch (error) {
                console.log("Error:", error.message);
            }
        }
        return {
            Type: TYPES.FormTable,
            Teams: teams,
            Results: results,
            NumOfGroups: maxGroupNumber
        };
    } else if (lines[0].toLowerCase().includes('/')) {
        const command = lines[0].split(' ')[0];
        if (command.toLowerCase() === (COMMANDS.Print)) {
            try {
                const args = ValidatePrintInput(lines[0]);
                if (args.length === 2) {
                    return {
                        Type: TYPES.PrintTeam,
                        TeamName: args[1]
                    };
                } else {
                    return {
                        Type: TYPES.PrintTable
                    };
                }
            } catch (error) {
                console.log("Error:", error.message);
                return {
                    Type: TYPES.Invalid
                };
            }
        } else if (command.toLowerCase() === (COMMANDS.Edit)) {
            for (let i = 1; i < lines.length-1; i++) {
                try {
                    const args = ValidateEditInput(lines[i]);
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
                } catch (error) {
                    console.log("Error:", error.message);
                }
            }
            return {
                Type: TYPES.Edit,
                Teams: teams,
                Results: results,
                NumOfGroups: maxGroupNumber
            };
        } else if (command.toLowerCase() === COMMANDS.Delete) {
            return {
                Type: TYPES.Delete
            };
        } else if (command.toLowerCase() === COMMANDS.Exit) {
            return {
                Type: TYPES.Exit
            };
        } else {
            return {
                Type: TYPES.Invalid
            };
        }
    }
    return {
        Type: TYPES.Invalid
    };
}

module.exports = { ParseInput };
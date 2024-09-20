const {
    ValidateTeamInformationInput,
    ValidateMatchResultsInput,
    ValidatePrintInput,
    ValidateEditInput,
    ValidateDeleteInput,
    ValidateExitInput,
    ValidateHelpInput,
    ValidateAdminEditCommand,
    ValidateAdminDeleteCommand
} = require('./InputValidation');

const TYPES = {
    FormTable: "FormTable",
    PrintTeam: "PrintTeam",
    PrintTable: "PrintTable",
    Edit: "Edit",
    Delete: "Delete",
    Exit: "Exit",
    Help: "Help",
    Invalid: "Invalid",
    AdminEdit: "AdminEdit",
    AdminDelete: "AdminDelete"
};

const COMMANDS = {
    TeamInformation: "team information:",
    MatchResults: "match results:",
    Print: "/print",
    Edit: "/edit",
    Delete: "/delete",
    Exit: "/exit",
    Help: "/help",
    AdminEdit: "/adminedit",
    AdminDelete: "/admindelete"
};

function ParseInput(input, user) {
    const lines = input.split('\n');
    const teams = [];
    const results = [];
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
                    } catch (error) {
                        console.error('Error:', error.message); // Optional if you want to log the error
                    }
                }
            }
        }
        for (; index < lines.length - 1; index++) {
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
                console.error('Error:', error.message); // Optional if you want to log the error
            }
        }
        return {
            Type: TYPES.FormTable,
            Teams: teams,
            Results: results
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
                console.error("Error:", error.message);
                return {
                    Type: TYPES.Invalid
                };
            }
        } else if (command.toLowerCase() === (COMMANDS.Edit)) {
            for (let i = 1; i < lines.length - 1; i++) {
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
                    }
                } catch (error) {
                    console.error('Error:', error.message); // Optional if you want to log the error
                }
            }
            return {
                Type: TYPES.Edit,
                Teams: teams,
                Results: results
            };
        } else if (command.toLowerCase() === COMMANDS.Delete) {
            try {
                ValidateDeleteInput(lines[0]);
                return {
                    Type: TYPES.Delete
                };
            } catch (error) {
                console.error("Error:", error.message);
                return {
                    Type: TYPES.Invalid
                };
            }
        } else if (command.toLowerCase() === COMMANDS.Exit) {
            try {
                ValidateExitInput(lines[0]);
                return {
                    Type: TYPES.Exit
                };
            } catch (error) {
                console.error("Error:", error.message);
                return {
                    Type: TYPES.Invalid
                };
            }
        } else if (command.toLowerCase() === COMMANDS.Help) {
            try {
                ValidateHelpInput(lines[0]);
                return {
                    Type: TYPES.Help
                };
            } catch (error) {
                console.error("Error:", error.message);
                return {
                    Type: TYPES.Invalid
                };
            }
        } else if (command.toLowerCase() === COMMANDS.AdminEdit) {
            try {
                const TargetUsername = ValidateAdminEditCommand(lines[0], user);
                for (let i = 1; i < lines.length - 1; i++) {
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
                        }
                    } catch (error) {
                        console.error('Error:', error.message); // Optional if you want to log the error
                    }
                }
                return {
                    Type: TYPES.AdminEdit,
                    User: TargetUsername,
                    Teams: teams,
                    Results: results
                };
            } catch (error) {
                console.error("Error:", error.message);
                return {
                    Type: TYPES.Invalid
                };
            }
        } else if (command.toLowerCase() === COMMANDS.AdminDelete) {
            try {
                const TargetUsername = ValidateAdminDeleteCommand(lines[0], user);
                return {
                    Type: TYPES.AdminDelete,
                    User: TargetUsername
                };
            } catch (error) {
                console.error("Error:", error.message);
                return {
                    Type: TYPES.Invalid
                };
            }
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
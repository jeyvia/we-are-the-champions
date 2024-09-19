const { FormTable, UpdateResults, PrintTable, PrintTeam, UpdateTable, DeleteTable } = require('./TableOperations');
const Logger = require('../Logger/Logger');
const { SaveJsonWithHash } = require('../Data/LocalStorage');
const { AuthenticateRole } = require('../Authentication/RoleAuthentication');

const TYPES = {
    FormTable: "FormTable",
    PrintTeam: "PrintTeam",
    PrintTable: "PrintTable",
    Edit: "Edit",
    Delete: "Delete",
    Exit: "Exit",
    Help: "Help",
    InsufficientPermissionsType: "InsufficientPermissions",
    AdminEdit: "AdminEdit",
    AdminDelete: "AdminDelete"
};

const FullHelpMessageOutput =
    "Commands:\n" +
    "---- To add team(s) to the table: ----\n" +
    "Team Information:\nTeamX MM/DD GroupNumber\nEND\n\n" +
    "---- To add match results: ----\n" +
    "Match Results:\nTeamX TeamY TeamXScore TeamYScore\nEND\n\n" +
    "---- To print the full table by groups: ----\n" +
    "/Print\nEND\n\n" +
    "---- To print a specific team's information: ----\n" +
    "/Print TeamX\nEND\n\n" +
    "---- To edit a specific team's information: ----\n" +
    "/Edit\nTeamX MM/DD GroupNumber\nEND\n\n" +
    "---- To edit a specific match result: ----\n" +
    "/Edit\nTeamX TeamY TeamXScore TeamYScore\nEND\n\n" +
    "---- To clear all previously entered data: ----\n" +
    "/Delete\nEND\n\n" +
    "---- To exit the program: ----\n" +
    "/Exit\nEND\n";

function Command(ParsedInput, inputBuffer, user, callback) {
    const CommandType = ParsedInput.Type;
    switch (CommandType) {
        case TYPES.FormTable:
            FormTable(ParsedInput.Teams, ParsedInput.NumOfGroups);
            UpdateResults(ParsedInput.Results);
            PrintTable();
            SaveJsonWithHash(user.username);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                User: user.username
            }, callback);
            break;
        case TYPES.PrintTable:
            PrintTable();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                User: user.username
            }, callback);
            break;
        case TYPES.PrintTeam:
            PrintTeam(ParsedInput.TeamName);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                TeamName: ParsedInput.TeamName,
                User: user.username
            }, callback);
            break;
        case TYPES.Edit: {
            const BeforeData = UpdateTable(ParsedInput.Teams, ParsedInput.Results, ParsedInput.NumOfGroups);
            SaveJsonWithHash(user.username);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                BeforeData: BeforeData,
                User: user.username
            }, callback);
            break;
        }
        case TYPES.Delete:
            DeleteTable();
            SaveJsonWithHash(user.username);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                User: user.username
            }, callback);
            break;
        case TYPES.Exit:
            console.log('Exiting WeAreTheChampions... Goodbye!');
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                User: user.username
            }, () => {
                process.exit();
            });
            break;
        case TYPES.Help:
            console.log(FullHelpMessageOutput);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                User: user.username
            }, callback);
            break;
        case TYPES.AdminEdit:
            if (AuthenticateRole(user.role)) {
                Logger({
                    Type: CommandType,
                    InputBuffer: inputBuffer,
                    User: user.username
                }, callback);
            } else {
                console.error(`Error: Insufficient Permissions for ${user.role} Role to run ${CommandType} Command`);
                Logger({
                    Type: TYPES.InsufficientPermissionsType,
                    InputBuffer: inputBuffer,
                    User: user.username
                }, callback);
            }
            break;
        case TYPES.AdminDelete:
            if (AuthenticateRole(user.role)) {
                Logger({
                    Type: CommandType,
                    InputBuffer: inputBuffer,
                    User: user.username
                }, callback);
            } else {
                console.error(`Error: Insufficient Permissions for ${user.role} Role to run ${CommandType} Command`);
                Logger({
                    Type: TYPES.InsufficientPermissionsType,
                    InputBuffer: inputBuffer,
                    User: user.username
                }, callback);
            }
            break;
        default:
            console.error('Error: Invalid Command Entered');
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                User: user.username
            }, callback);
            break;
    }
}


module.exports = Command;
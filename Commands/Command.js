const { FormTable, UpdateResults, PrintTable, PrintTeam, UpdateTable, DeleteTable } = require('./TableOperations');
const Logger = require('../Logger/Logger');
const { LoadAndVerifyJson, SaveJsonWithHash, DeleteUserData } = require('../Data/LocalStorage');

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

const FullHelpMessageOutput =
    "Commands:\n" +
    "---- To add team(s) to the table: ----\n" +
    "Team Information:\nTeamName Date GroupNumber\nEND\n\n" +
    "---- To add match results: ----\n" +
    "Match Results:\nTeam1 Team2 Team1Score Team2Score\nEND\n\n" +
    "---- To print the full table by groups: ----\n" +
    "/Print\nEND\n\n" +
    "---- To print a specific team's information: ----\n" +
    "/Print TeamName\nEND\n\n" +
    "---- To edit a specific team's information: ----\n" +
    "/Edit\nTeamName Date GroupNumber\nEND\n\n" +
    "---- To edit a specific match result: ----\n" +
    "/Edit\nTeam1 Team2 Team1Score Team2Score\nEND\n\n" +
    "---- To clear all previously entered data: ----\n" +
    "/Delete\nEND\n\n" +
    "---- To exit the program: ----\n" +
    "/Exit\nEND\n";

function Command(ParsedInput, inputBuffer, user, callback) {
    const CommandType = ParsedInput.Type;
    switch (CommandType) {
        case TYPES.FormTable:
            FormTable(ParsedInput.Teams);
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
            const BeforeData = UpdateTable(ParsedInput.Teams, ParsedInput.Results);
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
        case TYPES.AdminEdit: {
            try {
                LoadAndVerifyJson(ParsedInput.User);
                const BeforeData = UpdateTable(ParsedInput.Teams, ParsedInput.Results);
                SaveJsonWithHash(ParsedInput.User);
                Logger({
                    Type: CommandType,
                    InputBuffer: inputBuffer,
                    BeforeData: BeforeData,
                    User: user.username,
                    TargetUser: ParsedInput.User
                }, callback);
                console.log(`Reloading data for ${user.username}`);
                LoadAndVerifyJson(user.username);
                break;
            } catch (error) {
                console.error('Error:', error.message);
                Logger({
                    Type: TYPES.Invalid,
                    InputBuffer: inputBuffer,
                    User: user.username
                }, callback);
                break;
            }
        }
        case TYPES.AdminDelete:
            try {
                DeleteUserData(ParsedInput.User);
                Logger({
                    Type: CommandType,
                    InputBuffer: inputBuffer,
                    User: user.username,
                    TargetUser: ParsedInput.User
                }, callback);
                break;
            } catch (error) {
                console.error('Error:', error.message);
                Logger({
                    Type: TYPES.Invalid,
                    InputBuffer: inputBuffer,
                    User: user.username
                }, callback);
                break;
            }
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
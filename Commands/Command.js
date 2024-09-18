const { FormTable, UpdateResults, PrintTable, PrintTeam, UpdateTable, DeleteTable } = require('./TableOperations');
const Logger = require('../Logger/Logger');
const { SaveJsonWithHash } = require('../Data/LocalStorage');

const TYPES = {
    FormTable: "FormTable",
    PrintTeam: "PrintTeam",
    PrintTable: "PrintTable",
    Edit: "Edit",
    Delete: "Delete",
    Exit: "Exit",
    Help: "Help",
}

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


function Command(ParsedInput, inputBuffer, callback) {
    const CommandType = ParsedInput.Type;
    switch (CommandType) {
        case TYPES.FormTable:
            FormTable(ParsedInput.Teams, ParsedInput.NumOfGroups);
            UpdateResults(ParsedInput.Results);
            PrintTable();
            SaveJsonWithHash();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
        case TYPES.PrintTable:
            PrintTable();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
        case TYPES.PrintTeam:
            PrintTeam(ParsedInput.TeamName);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                TeamName: ParsedInput.TeamName
            }, callback);
            break;
        case TYPES.Edit:
            const BeforeData = UpdateTable(ParsedInput.Teams, ParsedInput.Results, ParsedInput.NumOfGroups);
            SaveJsonWithHash();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                BeforeData: BeforeData
            }, callback);
            break;
        case TYPES.Delete:
            DeleteTable();
            SaveJsonWithHash();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
        case TYPES.Exit:
            console.log('Exiting WeAreTheChampions... Goodbye!');
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, () => {
                process.exit();
            });
            break;
        case TYPES.Help:
            console.log(FullHelpMessageOutput);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
        default:
            console.log('Invalid Command Entered');
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
    }
}


module.exports = Command;
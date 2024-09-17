const { FormTable, UpdateResults, PrintTable, PrintTeam, UpdateTable, DeleteTable } = require('./TableOperations');
const Logger = require('../Logger/Logger');

function Command(ParsedInput, inputBuffer, callback) {
    const CommandType = ParsedInput.Type;
    switch (CommandType) {
        case 'FormTable':
            FormTable(ParsedInput.Teams, ParsedInput.NumOfGroups);
            UpdateResults(ParsedInput.Results);
            PrintTable();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
        case 'PrintTable':
            PrintTable();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
        case 'PrintTeam':
            PrintTeam(ParsedInput.TeamName);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                TeamName: ParsedInput.TeamName
            }, callback);
            break;
        case 'Edit':
            const BeforeData = UpdateTable(ParsedInput.Teams, ParsedInput.Results, ParsedInput.NumOfGroups);
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer,
                BeforeData: BeforeData
            }, callback);
            break;
        case 'Delete':
            DeleteTable();
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, callback);
            break;
        case 'Exit':
            console.log('Exiting WeAreTheChampions... Goodbye!');
            Logger({
                Type: CommandType,
                InputBuffer: inputBuffer
            }, () => {
                process.exit();
            });
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
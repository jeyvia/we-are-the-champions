const { FormTable, UpdateResults, PrintTable, PrintTeam, UpdateTable, DeleteTable } = require('./TableOperations');

function Command(ParsedInput) {
    const CommandType = ParsedInput.Type;
    switch (CommandType) {
        case 'TeamInfoResults':
            FormTable(ParsedInput.Teams, ParsedInput.NumOfGroups);
            UpdateResults(ParsedInput.Results);
            PrintTable();
            break;
        case 'PrintTable':
            PrintTable();
            break;
        case 'TeamDetails':
            PrintTeam(ParsedInput.TeamName);
            break;
        case 'Edit':
            UpdateTable(ParsedInput.Teams, ParsedInput.Results, ParsedInput.NumOfGroups);
            break;
        case 'Delete':
            DeleteTable();
            break;
        case 'Exit':
            console.log('Exiting WeAreTheChampions... Goodbye!');
            process.exit();
        default:
            console.log('Invalid Command Entered');
            break;
    }
}

module.exports = Command;
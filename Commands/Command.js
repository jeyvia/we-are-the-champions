const { FormTable, UpdateTable, PrintTable, PrintTeam } = require('./TableOperations');

function Command(ParsedInput) {
    const CommandType = ParsedInput.Type;
    switch (CommandType) {
        case 'TeamInfoResults':
            FormTable(ParsedInput.Teams, ParsedInput.NumOfGroups);
            UpdateTable(ParsedInput.Results);
            PrintTable();
            break;
        case 'PrintTable':
            PrintTable();
            break;
        case 'TeamDetails':
            PrintTeam(ParsedInput.TeamName);
            break;
        case 'Edit':

            break;
        case 'Delete':
            
            break;
        default:
            console.log('Invalid Command Entered');
            break;
    }
}

module.exports = Command;
const fs = require('fs');
const TableManager = require('../Commands/Table');
const { UpdateRanks } = require('../Commands/TableOperations');

const FORMTABLE_MESSAGE = 'WeAreTheChampions has formed a table, with the corresponding match results:\n';
const PRINTTABLE_MESSAGE = 'WeAreTheChampions has printed the table:\n';
const PRINTTEAM_MESSAGE = 'WeAreTheChampions has printed the team:\n';
const EDITTABLE_MESSAGE = 'WeAreTheChampions has edited the table with the following changes:\n';
const DELETETABLE_MESSAGE = 'WeAreTheChampions has deleted the table\n';
const EXIT_MESSAGE = 'WeAreTheChampions has initiated exit based on User Input\n';
const HELP_MESSAGE = 'WeAreTheChampions has printed the help message\n';
const INVALIDCOMMAND_MESSAGE = 'WeAreTheChampions did not recognise the command entered\nWeAreTheChampions classified User Input as invalid\n';

const TYPES = {
    FormTable: "FormTable",
    PrintTeam: "PrintTeam",
    PrintTable: "PrintTable",
    Edit: "Edit",
    Delete: "Delete",
    Exit: "Exit",
    Help: "Help",
    AdminEdit: "AdminEdit",
    AdminDelete: "AdminDelete"
};

function getDateTime() {
    const now = new Date();
    const gmt8Time = new Date(now.getTime());
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return gmt8Time.toLocaleString('en-US', options);
}

function logsToFile(message, user, callback) {
    const timestamp = getDateTime();
    const logMessage = '-'.repeat(150) + '\n' + `${timestamp} - ${message}\n`;
    const LOGS_FILEPATH = `./Logger/logs-${user}.txt`;

    fs.appendFile(LOGS_FILEPATH, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('');
        }
        if (callback) callback();
    });
}

function PrintTableForLogs() {
    const maxGroupNumber = TableManager.getNumOfGroups();
    if (maxGroupNumber === 0) {
        return 'No table data found';
    }
    let returnMessage = '';
    for (let i = 1; i <= maxGroupNumber; i++) {
        const CurrentTable = TableManager.getTable(i);
        if (Array.isArray(CurrentTable) && CurrentTable.length > 0) {
            returnMessage += `Group ${i}\n`;

            const TableWithRanks = UpdateRanks(CurrentTable);

            const excludedKeys = ['RegistrationDate', 'GroupNumber', "MatchHistory"];
            const columns = Object.keys(TableWithRanks[0]).filter(key => !excludedKeys.includes(key));

            const columnWidths = columns.map(column =>
                Math.max(...TableWithRanks.map(row => row[column].toString().length), column.length)
            );
            returnMessage += columns.map((col, i) => col.padEnd(columnWidths[i])).join(' | ');
            returnMessage += '\n';
            returnMessage += columnWidths.map(width => '-'.repeat(width)).join('-|-');
            returnMessage += '\n';

            TableWithRanks.forEach(row => {
                returnMessage += columns.map((col, i) => row[col].toString().padEnd(columnWidths[i])).join(' | ');
                returnMessage += '\n';
            });
        }
    }
    return returnMessage;
}

function PrintTeamforLogs(TeamData) {
    let returnMessage = '';
    returnMessage += `Team: ${TeamData.TeamName}\n`;
    returnMessage += `Matches Played: ${TeamData.MatchesPlayed}\n`;
    returnMessage += `Wins: ${TeamData.Wins}\n`;
    returnMessage += `Draws: ${TeamData.Draws}\n`;
    returnMessage += `Losses: ${TeamData.Losses}\n`;
    returnMessage += `Points: ${TeamData.Points}\n`;
    returnMessage += `Goals Scored: ${TeamData.GoalsScored}\n`;
    returnMessage += `Registration Date: ${TeamData.RegistrationDate}\n`;
    returnMessage += `Group Number: ${TeamData.GroupNumber}\n`;
    returnMessage += `Match History:\n`;
    for (let i = 0; i < TeamData.MatchHistory.length; i++) {
        returnMessage += `${TeamData.MatchHistory[i].Opponent}: ${TeamData.MatchHistory[i].TeamScore}-${TeamData.MatchHistory[i].OpponentScore}\n`;
    }
    return returnMessage;
}

function FormatLogsForEdit(BeforeData) {
    let returnMessage = '';
    for (let i = 0; i < BeforeData.Teams.length; i++) {
        const CurrentTeamBefore = BeforeData.Teams[i];
        const CurrentTeamAfter = TableManager.getTeam(CurrentTeamBefore.TeamName);
        if (CurrentTeamBefore.RegistrationDate !== CurrentTeamAfter.RegistrationDate) {
            returnMessage += `Team ${CurrentTeamBefore.TeamName} registration date changed from ${CurrentTeamBefore.RegistrationDate} to ${CurrentTeamAfter.RegistrationDate}\n`;
        }
        if (CurrentTeamBefore.GroupNumber !== CurrentTeamAfter.GroupNumber) {
            returnMessage += `Team ${CurrentTeamBefore.TeamName} group number changed from ${CurrentTeamBefore.GroupNumber} to ${CurrentTeamAfter.GroupNumber}\n`;
        }
    }
    for (let i = 0; i < BeforeData.Results.length; i++) {
        const ResultsBefore = BeforeData.Results[i];
        const Team1Before = ResultsBefore.Team;
        const Team1 = Team1Before.TeamName;
        const Team2Before = ResultsBefore.OpponentTeam;
        const Team2 = Team2Before.TeamName;
        const Team1After = TableManager.getTeam(Team1);
        const Team2After = TableManager.getTeam(Team2);
        const MatchIndex = TableManager.getMatch(Team1After, Team2);
        const CurrentMatch = Team1After.MatchHistory[MatchIndex];
        returnMessage += `Match between ${Team1} and ${Team2} changed from ${ResultsBefore.TeamScore}-${ResultsBefore.OpponentScore} to ${CurrentMatch.TeamScore}-${CurrentMatch.OpponentScore}\n`;
        returnMessage += `${Team1} data changed from:\n`;
        returnMessage += PrintTeamforLogs(Team1Before);
        returnMessage += '\n';
        returnMessage += `${Team1} data changed to:\n`;
        returnMessage += PrintTeamforLogs(Team1After);
        returnMessage += '\n';
        returnMessage += `${Team2} data changed from:\n`;
        returnMessage += PrintTeamforLogs(Team2Before);
        returnMessage += '\n';
        returnMessage += `${Team2} data changed to:\n`;
        returnMessage += PrintTeamforLogs(Team2After);
    }
    return returnMessage;
}

function Logger(CommandsInfo, callback) {
    const CommandType = CommandsInfo.Type;
    let message = `${CommandsInfo.User} entered the following input:\n`;
    const inputBuffer = CommandsInfo.InputBuffer;
    switch (CommandType) {
        case TYPES.FormTable:
            for (let i = 0; i < inputBuffer.length; i++) {
                message += inputBuffer[i];
            }
            message += '\n';
            message += FORMTABLE_MESSAGE;
            message += PrintTableForLogs();
            break;
        case TYPES.PrintTable:
            message += inputBuffer;
            message += '\n';
            message += PRINTTABLE_MESSAGE;
            message += PrintTableForLogs();
            break;
        case TYPES.PrintTeam: {
            message += inputBuffer;
            message += '\n';
            message += PRINTTEAM_MESSAGE;
            const TeamData = TableManager.getTeam(CommandsInfo.TeamName);
            message += PrintTeamforLogs(TeamData);
            break;
        }
        case TYPES.Edit:
            for (let i = 0; i < inputBuffer.length; i++) {
                message += inputBuffer[i];
            }
            message += '\n';
            message += EDITTABLE_MESSAGE;
            message += FormatLogsForEdit(CommandsInfo.BeforeData);
            break;
        case TYPES.Delete:
            message += inputBuffer;
            message += '\n';
            message += DELETETABLE_MESSAGE;
            break;
        case TYPES.Exit:
            message += inputBuffer;
            message += '\n';
            message += EXIT_MESSAGE;
            break;
        case TYPES.Help:
            message += inputBuffer;
            message += '\n';
            message += HELP_MESSAGE;
            break;
        case TYPES.AdminEdit:
            for (let i = 0; i < inputBuffer.length; i++) {
                message += inputBuffer[i];
            }
            message += '\n';
            message += `WeAreTheChampions has edited the ${CommandsInfo.TargetUser}'s table with the following changes:\n`;
            message += FormatLogsForEdit(CommandsInfo.BeforeData);
            break;
        case TYPES.AdminDelete:
            message += inputBuffer;
            message += '\n';
            message += `WeAreTheChampions has deleted ${CommandsInfo.TargetUser}'s table\n`;
            break;
        default:
            message += inputBuffer;
            message += '\n';
            message += INVALIDCOMMAND_MESSAGE;
            break;
    }
    logsToFile(message, CommandsInfo.User, callback);
}

module.exports = Logger;
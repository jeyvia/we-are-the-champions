const fs = require('fs');
const TableManager = require('../Commands/Table');
const { UpdateRanks } = require('../Commands/TableOperations');
const LOGS_FILEPATH = './Logger/logs.txt';

const USER_INPUT_MESSAGE = 'User entered the following input:\n';
const FORMTABLE_MESSAGE = 'WeAreTheChampions has formed a table, with the corresponding match results:\n';
const PRINTTABLE_MESSAGE = 'WeAreTheChampions has printed the table:\n';
const PRINTTEAM_MESSAGE = 'WeAreTheChampions has printed the team:\n';
const EDITTABLE_MESSAGE = 'WeAreTheChampions has edited the table with the following changes:\n';
const DELETETABLE_MESSAGE = 'WeAreTheChampions has deleted the table\n';
const EXIT_MESSAGE = 'WeAreTheChampions has initiated exit based on User Input\n';
const HELP_MESSAGE = 'WeAreTheChampions has printed the help message\n';
const INVALIDCOMMAND_MESSAGE = 'WeAreTheChampions did not recognise the command entered\nWeAreTheChampions classified User Input as invalid\n';

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

function logsToFile(message, callback) {
    const timestamp = getDateTime();
    const logMessage = '-'.repeat(150) + '\n' + `${timestamp} - ${message}\n`;

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
    let returnMessage = '';
    for (let i = 1; i <= maxGroupNumber; i++) {
        returnMessage += `Group ${i}\n`;
        const CurrentTable = TableManager.getTable(i);
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
        const Team1Before = ResultsBefore.Team
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
    let message = USER_INPUT_MESSAGE;
    const inputBuffer = CommandsInfo.InputBuffer;
    switch (CommandType) {
        case 'FormTable':
            for (let i = 0; i < inputBuffer.length; i++) {
                message += inputBuffer[i];
            }
            message += '\n';
            message += FORMTABLE_MESSAGE;
            message += PrintTableForLogs();
            break;
        case 'PrintTable':
            message += inputBuffer;
            message += '\n';
            message += PRINTTABLE_MESSAGE;
            message += PrintTableForLogs();
            break;
        case 'PrintTeam':
            message += inputBuffer;
            message += '\n';
            message += PRINTTEAM_MESSAGE;
            const TeamData = TableManager.getTeam(CommandsInfo.TeamName);
            message += PrintTeamforLogs(TeamData);
            break;
        case 'Edit':
            for (let i = 0; i < inputBuffer.length; i++) {
                message += inputBuffer[i];
            }
            message += '\n';
            message += EDITTABLE_MESSAGE;
            message += FormatLogsForEdit(CommandsInfo.BeforeData);
            break;
        case 'Delete':
            message += inputBuffer;
            message += '\n';
            message += DELETETABLE_MESSAGE;
            break;
        case 'Exit':
            message += inputBuffer;
            message += '\n';
            message += EXIT_MESSAGE;
            break;
        case 'Help':
            message += inputBuffer;
            message += '\n';
            message += HELP_MESSAGE;
            break;
        default:
            message += inputBuffer;
            message += '\n';
            message += INVALIDCOMMAND_MESSAGE;
            break;
    }
    logsToFile(message, callback);
}

module.exports = Logger;
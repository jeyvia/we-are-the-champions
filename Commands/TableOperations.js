const TableManager = require('./Table');
const ParseDateString = require('../InputOperations/Parser');

function FormTable(TableInput, NumOfGroups) {
    for (let i = 0; i < TableInput.length; i++) {
        TableManager.addTeam({
            TeamName: TableInput[i].teamName,
            MatchesPlayed: 0,
            Wins: 0,
            Draws: 0,
            Losses: 0,
            Points: 0,
            GoalsScored: 0,
            RegistrationDate: TableInput[i].registrationDate,
            GroupNumber: parseInt(TableInput[i].groupNumber),
            MatchHistory: []
        });
    }
    TableManager.assignNumOfGroups(NumOfGroups);
}

function SortTable(Table) {
    return Table.sort((a, b) => {
        if (a.Points === b.Points) {
            if (a.GoalsScored === b.GoalsScored) {
                const aAlternatePoints = a.Wins * 5 + a.Draws * 3 + a.Losses;
                const bAlternatePoints = b.Wins * 5 + b.Draws * 3 + b.Losses;
                if (aAlternatePoints === bAlternatePoints) {
                    return ParseDateString(a.registrationDate) - ParseDateString(b.registrationDate);
                } else {
                    return bAlternatePoints - aAlternatePoints;
                }
            } else {
                return b.GoalsScored - a.GoalsScored;
            }
        } else {
            return b.Points - a.Points;
        }
    });
}

function UpdateTable(Results) {
    for (let i = 0; i < Results.length; i++) {
        const Team1 = Results[i].team1;
        const Team2 = Results[i].team2;
        const Team1Data = TableManager.getTeam(Team1);
        const Team2Data = TableManager.getTeam(Team2);
        const Team1Score = Results[i].team1Score;
        const Team2Score = Results[i].team2Score;
        if (Team1Score > Team2Score) {
            Team1Data.Wins++;
            Team1Data.Points += 3;
            Team2Data.Losses++;
        } else if (Team1Score < Team2Score) {
            Team1Data.Losses++;
            Team2Data.Wins++;
            Team2Data.Points += 3;
        } else {
            Team1Data.Draws++;
            Team1Data.Points++;
            Team2Data.Draws++;
            Team2Data.Points++;
        }
        Team1Data.GoalsScored += Team1Score;
        Team2Data.GoalsScored += Team2Score;
        Team1Data.MatchesPlayed++;
        Team2Data.MatchesPlayed++;
        Team1Data.MatchHistory.push({ Opponent: Team2, Score: `${Team1Score}-${Team2Score}` });
        Team2Data.MatchHistory.push({ Opponent: Team1, Score: `${Team2Score}-${Team1Score}` });
        TableManager.updateTeamResults(Team1, Team1Data);
        TableManager.updateTeamResults(Team2, Team2Data);
    }
}

function updateRanks(Table) {
    return Table.map((item, index) => ({
        Rank: index + 1,
        ...item
    }));
}

function PrintTable() {
    const maxGroupNumber = TableManager.getNumOfGroups();
    for (let i = 1; i <= maxGroupNumber; i++) {
        console.log(`Group ${i}`);
        const CurrentTable = TableManager.getTable(i)
        const SortedTable = SortTable(CurrentTable);
        const SortedTableWithRanks = updateRanks(SortedTable);

        const excludedKeys = ['RegistrationDate', 'GroupNumber'];
        const columns = Object.keys(SortedTableWithRanks[0]).filter(key => !excludedKeys.includes(key));

        const columnWidths = columns.map(column =>
            Math.max(...SortedTableWithRanks.map(row => row[column].toString().length), column.length)
        );
        console.log(columns.map((col, i) => col.padEnd(columnWidths[i])).join(' | '));
        console.log(columnWidths.map(width => '-'.repeat(width)).join('-|-'));

        SortedTableWithRanks.forEach(row => {
            console.log(columns.map((col, i) => row[col].toString().padEnd(columnWidths[i])).join(' | '));
        });
        console.log(
            'Teams that have qualified for the next round:', 
            SortedTableWithRanks[0].TeamName, ",",
            SortedTableWithRanks[1].TeamName, ",",
            SortedTableWithRanks[2].TeamName, ",",
            SortedTableWithRanks[3].TeamName);
    }
}

function PrintTeam(TeamName) {
    const TeamData = TableManager.getTeam(TeamName);
    console.log(`\x1b[1mTeam:\x1b[0m ${TeamData.TeamName}`);
    console.log(`\x1b[1mMatches Played:\x1b[0m ${TeamData.MatchesPlayed}`);
    console.log(`\x1b[1mWins:\x1b[0m ${TeamData.Wins}`);
    console.log(`\x1b[1mDraws:\x1b[0m ${TeamData.Draws}`);
    console.log(`\x1b[1mLosses:\x1b[0m ${TeamData.Losses}`);
    console.log(`\x1b[1mPoints:\x1b[0m ${TeamData.Points}`);
    console.log(`\x1b[1mGoals Scored:\x1b[0m ${TeamData.GoalsScored}`);
    console.log(`\x1b[1mRegistration Date:\x1b[0m ${TeamData.RegistrationDate}`);
    console.log(`\x1b[1mGroup Number:\x1b[0m ${TeamData.GroupNumber}`);
    console.log(`\x1b[1mMatch History:\x1b[0m`);    
    for (let i = 0; i < TeamData.MatchHistory.length; i++) {
        console.log(`${TeamData.MatchHistory[i].Opponent}: ${TeamData.MatchHistory[i].Score}`);
    }
}

function DeleteTable() {

}

module.exports = { FormTable, UpdateTable, PrintTable, PrintTeam, DeleteTable };
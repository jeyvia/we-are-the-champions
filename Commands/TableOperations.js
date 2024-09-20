const TableManager = require('./Table');

function FormTable(Teams) {
    const maxGroupNumber = TableManager.getNumOfGroups();
    for (let i = 0; i < Teams.length; i++) {
        if (TableManager.getTeam(Teams[i].teamName)) {
            console.log(`Team with name ${Teams[i].teamName} already exists`);
        } else {
            TableManager.addTeam({
                TeamName: Teams[i].teamName,
                MatchesPlayed: 0,
                Wins: 0,
                Draws: 0,
                Losses: 0,
                Points: 0,
                GoalsScored: 0,
                RegistrationDate: Teams[i].registrationDate,
                GroupNumber: Teams[i].groupNumber,
                MatchHistory: []
            });
            if (Teams[i].groupNumber > maxGroupNumber) {
                TableManager.assignNumOfGroups(Teams[i].groupNumber);
            }
        }
    }
}

function UpdateResults(Results) {
    let updated = false;
    for (let i = 0; i < Results.length; i++) {
        const Team1 = Results[i].team1;
        const Team2 = Results[i].team2;
        const Team1Data = TableManager.getTeam(Team1);
        const Team2Data = TableManager.getTeam(Team2);
        const Team1Score = Results[i].team1Score;
        const Team2Score = Results[i].team2Score;
        if (!Team1Data || !Team2Data) {
            console.log(`One or both teams in match ${Team1} vs ${Team2} do not exist`);
            continue;
        } else {
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
            Team1Data.MatchHistory.push({ Opponent: Team2, TeamScore: Team1Score, OpponentScore: Team2Score });
            Team2Data.MatchHistory.push({ Opponent: Team1, TeamScore: Team2Score, OpponentScore: Team1Score });
            updated = true;
        }
    }
    return updated;
}

function UpdateRanks(Table) {
    return Table.map((item, index) => {
        return Object.assign({ Rank: index + 1 }, item);
    });
}

function PrintTable() {
    const maxGroupNumber = TableManager.getNumOfGroups();
    if (maxGroupNumber === 0) {
        console.log('No table data found');
        return;
    }
    for (let i = 1; i <= maxGroupNumber; i++) {
        const CurrentTable = TableManager.getTable(i);
        if (Array.isArray(CurrentTable) && CurrentTable.length > 0) {
            console.log(`Group ${i}`);
            const TableWithRanks = UpdateRanks(CurrentTable);

            const excludedKeys = ['RegistrationDate', 'GroupNumber', "MatchHistory"];
            const columns = Object.keys(TableWithRanks[0]).filter(key => !excludedKeys.includes(key));

            const columnWidths = columns.map(column =>
                Math.max(...TableWithRanks.map(row => row[column].toString().length), column.length)
            );
            console.log(columns.map((col, i) => col.padEnd(columnWidths[i])).join(' | '));
            console.log(columnWidths.map(width => '-'.repeat(width)).join('-|-'));

            TableWithRanks.forEach(row => {
                console.log(columns.map((col, i) => row[col].toString().padEnd(columnWidths[i])).join(' | '));
            });
            const qualifiedTeams = TableWithRanks.slice(0, 4).map(team => team.TeamName);
            console.log('Teams that have qualified for the next round:', qualifiedTeams.join(", "));
        }
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
        console.log(`${TeamData.MatchHistory[i].Opponent}: ${TeamData.MatchHistory[i].TeamScore}-${TeamData.MatchHistory[i].OpponentScore}`);
    }
}

function UpdateTable(Teams, Results) {
    const BeforeData = {
        Teams: [],
        Results: []
    };
    let teamsUpdated = false;
    const CurrentMaxNumOfGroups = TableManager.getNumOfGroups();
    for (let i = 0; i < Teams.length; i++) {
        const CurrentTeam = TableManager.getTeam(Teams[i].teamName);
        if (CurrentTeam) {
            BeforeData.Teams.push(
                {
                    TeamName: CurrentTeam.TeamName,
                    RegistrationDate: CurrentTeam.RegistrationDate,
                    GroupNumber: CurrentTeam.GroupNumber
                }
            );
            CurrentTeam.RegistrationDate = Teams[i].registrationDate;
            CurrentTeam.GroupNumber = Teams[i].groupNumber;
            teamsUpdated = true;
        } else {
            TableManager.addTeam({
                TeamName: Teams[i].teamName,
                MatchesPlayed: 0,
                Wins: 0,
                Draws: 0,
                Losses: 0,
                Points: 0,
                GoalsScored: 0,
                RegistrationDate: Teams[i].registrationDate,
                GroupNumber: Teams[i].groupNumber,
                MatchHistory: []
            });
            teamsUpdated = true;
        }
        if (Teams[i].groupNumber > CurrentMaxNumOfGroups) {
            TableManager.assignNumOfGroups(Teams[i].groupNumber);
        }
    }
    for (let i = 0; i < Results.length; i++) {
        const CurrentTeam = TableManager.getTeam(Results[i].team1);
        const OpponentTeam = TableManager.getTeam(Results[i].team2);
        if (CurrentTeam && OpponentTeam) {
            const matchIndex = TableManager.getMatch(CurrentTeam, Results[i].team2);
            const OpponentTeam = TableManager.getTeam(Results[i].team2);
            const CurrentTeamBefore = JSON.parse(JSON.stringify(CurrentTeam));
            const OpponentTeamBefore = JSON.parse(JSON.stringify(OpponentTeam));
            if (matchIndex !== -1) {
                BeforeData.Results.push({
                    Team: CurrentTeamBefore,
                    OpponentTeam: OpponentTeamBefore,
                    TeamScore: CurrentTeamBefore.MatchHistory[matchIndex].TeamScore,
                    OpponentScore: CurrentTeamBefore.MatchHistory[matchIndex].OpponentScore,
                });
                const OpponentTeam = TableManager.getTeam(CurrentTeam.MatchHistory[matchIndex].Opponent);
                if (CurrentTeam.MatchHistory[matchIndex].TeamScore > CurrentTeam.MatchHistory[matchIndex].OpponentScore) {
                    CurrentTeam.Wins--;
                    CurrentTeam.Points -= 3;
                    OpponentTeam.Losses--;
                } else if (CurrentTeam.MatchHistory[matchIndex].TeamScore < CurrentTeam.MatchHistory[matchIndex].OpponentScore) {
                    CurrentTeam.Losses--;
                    OpponentTeam.Wins--;
                    OpponentTeam.Points -= 3;
                } else {
                    CurrentTeam.Draws--;
                    CurrentTeam.Points--;
                    OpponentTeam.Draws--;
                    OpponentTeam.Points--;
                }
                CurrentTeam.MatchesPlayed--;
                OpponentTeam.MatchesPlayed--;
                CurrentTeam.GoalsScored -= CurrentTeam.MatchHistory[matchIndex].TeamScore;
                OpponentTeam.GoalsScored -= CurrentTeam.MatchHistory[matchIndex].OpponentScore;
                CurrentTeam.MatchHistory.splice(matchIndex, 1);
            }
        } 
    }
    if (UpdateResults(Results) || teamsUpdated) {
        console.log('Table has been updated with new data');
    } else {
        console.log('No updates have been made to the table');
    }
    return BeforeData;
}

function DeleteTable() {
    TableManager.DeleteTable();
    console.log('Previously entered data has been cleared');
}

module.exports = { FormTable, UpdateResults, UpdateRanks, PrintTable, PrintTeam, UpdateTable, DeleteTable };
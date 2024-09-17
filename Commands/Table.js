class TableManager {
    constructor() {
        if (!TableManager.instance) {
            TableManager.instance = this;
            this.table = [];
            this.NumOfGroups = 0;
        }
        return TableManager.instance;
    }

    assignNumOfGroups(num) {
        this.NumOfGroups = num;
    }

    getNumOfGroups() {
        return this.NumOfGroups;
    }

    addTeam(TeamInfo) {
        this.table.push(TeamInfo);
    }

    getTeam(TeamName) {
        return this.table.find(team => team.TeamName.toLowerCase() === TeamName.toLowerCase());
    }

    getTable(groupNumber) {
        const Table = this.table.filter(team => team.GroupNumber === groupNumber);
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

    getMatch(Team, OpponentName) {
        return Team.MatchHistory.findIndex(match => match.Opponent === OpponentName);
    }

    DeleteTable() {
        this.table = [];
        this.NumOfGroups = 0;
    }
}

const instance = new TableManager();
module.exports = instance;

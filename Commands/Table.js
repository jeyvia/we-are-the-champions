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
        return this.table.find(team => team.TeamName === TeamName);
    }

    getTable(groupNumber) {
        return this.table.filter(team => team.GroupNumber === groupNumber);
    }

    updateTeamResults(TeamName, updatedInfo) {
        const index = this.table.findIndex(team => team.TeamName === TeamName);
        if (index !== -1) {
            this.table[index] = { ...this.table[index], ...updatedInfo };
        } else {
            throw new Error('Team not found');
        }
    }
}

const instance = new TableManager();
module.exports = instance;

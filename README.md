# WeAreTheChampions

## Contents
* [Getting started](#getting-started)
* [Understanding the Command Syntax](#understanding-the-command-syntax)
* [User accounts and Roles](#user-accounts-and-roles)
* [Features](#features)
  * [Listing all available commands: `Help`](#listing-all-available-commands-help)
  * [Table operations](#table-operations)
  * [Exiting the application: `Exit`](#exiting-the-application-exit)
  * [Admin-restricted Commands](#admin-restricted-commands)
* [Sample Outputs](#sample-outputs)
* [FAQ](#faq)
* [Assumptions](#assumptions)

## Getting started

1. Ensure that ```NodeJS``` is installed on your system.
    1. Execute the command ```node -v``` in your terminal window.
    2. Verify that the version of NodeJS installed is at least ```v18``` or higher.
2. Ensure that you have write permissions for the directory in which you are executing the program.
3. Run `node WeAreTheChampions.js` to start the program. Do note that the filenames are case-senstive.
You should see the following greeting message if the project setup is successful:
```
Welcome to WeAreTheChampions!
    ⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀
⢠⣤⣤⣤⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣄⣤⣤⣠
⢸⠀⡶⠶⠾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡷⠶⠶⡆⡼
⠈⡇⢷⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠇⠀⢸⢁⡗
⠀⢹⡘⡆⠀⢹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠀⢀⡏⡼⠀
⠀⠀⢳⡙⣆⠈⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⢀⠞⡼⠁⠀
⠀⠀⠀⠙⣌⠳⣼⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣞⡴⣫⠞⠀⠀⠀
⠀⠀⠀⠀⠈⠓⢮⣻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⣩⠞⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠛⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠞⠋⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⢤⣀⠀⠀⠀⠀⢀⣠⠖⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⡇⢸⡏⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠖⠒⠓⠚⠓⠒⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣠⣞⣉⣉⣉⣉⣉⣉⣉⣉⣉⣉⣙⣆⣀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⠀⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⠀⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠓⠲⠶⠶⠶⠶⠶⠶⠶⠶⠶⠶⠶⠶⠶⠖⠃⠀⠀
```

## Understanding the Command Syntax

* You can input multiple lines at once.
* All input has to end with the "END" command in a **new line**.
* All text strings are not case-sensitive, unless otherwise stated.

### Example: `Adding a team`

Syntax: 
```
Team Information:
TeamX MM/DD GroupNumber
END
```

Examples of valid command syntax:
```
Team Information:
TeamA 01/01 1
END
```

Examples of invalid command syntax:
```
Team Information:
TeamA 01/01 1
```

## User accounts and Roles
WeAreTheChampions currently supports user accounts and the following roles:
* `admin`
* `user`

Both roles are able to use all basic features and commands within WeAreTheChampions. Users with `admin` role would be able to use administrator-restricted commands, while users with `user` role would not. 

For testing, the following usernames and passwords have been provided:
### Role: `admin`
* **Username**: admin
* **Password**: admin

### Role: `user`
* **Username**: user
* **Password**: user

The usernames and passwords above are **case-sensitive**.

## Features

### Listing all available commands: `Help`
Lists all valid commands for WeAreTheChampions.

Syntax: `/Help`

Example of usage:
```
/Help
END
```

Expected output: 
```
Commands:
---- To add team(s) to the table: ----
Team Information:
TeamX DD/MM GroupNumber
END

---- To add match results: ----
Match Results:
TeamX TeamY TeamXScore TeamYScore
END

---- To print the full table by groups: ----
/Print
END

---- To print a specific team's information: ----
/Print TeamX
END

---- To edit a specific team's information: ----
/Edit
TeamX DD/MM GroupNumber
END

---- To edit a specific match result: ----
/Edit
TeamX TeamY TeamXScore TeamYScore
END

---- To clear all previously entered data: ----
/Delete
END

---- To exit the program: ----
/Exit
END
```

## Table Operations
### Adding Team Information: 
Adds the new team information to the table.

Syntax: 
```
Team Information:
TeamName Date GroupNumber
END
```

> ⚠️️️️ Syntax Notes
> * `TeamName` is a text string. It must follow the format 'TeamX' where X is a letter from A-Z. It should be exactly 5 characters long.
> * `Date` is a text string in the format `"DD/MM"`. It should be exactly 5 characters long.
> * `GroupNumber` is an integer. The value should be greater than 0.

Examples of usage: 
```
Team Information:
TeamA 01/01 1
END
```

<hr>

### Adding Match Results: 
Adds the new match results to the table.

Syntax: 
```
Match Results:
Team1Name Team2Name Team1Score Team2Score
END
```

> ⚠️️️️ Syntax Notes
> * `Team1Name` and `Team2Name` are text strings. They must follow the format 'TeamX' where X is a letter from A-Z. They should be exactly 5 characters long.
> * `Team1Score` and `Team2Score` are integers. The values should be at least 0.

Examples of usage: 
```
Match Results:
TeamA TeamB 1 0
END
```

<hr>

### Print table or a specific team: `/Print`
Displays all teams in WeAreTheChampions by their respective group numbers, or a specific team's information. If displaying all teams, WeAreTheChampions shows which team(s) qualify for the next round.

Syntax: `/Print TeamName`

> ⚠️️️️ Syntax Notes
> * `/Print` can take in up to 1 argument. If the argument is specified correctly, WeAreTheChampions will only diplay the specific team's information. If no argument is specified, WeAreTheChampions will display all teams.
> * `TeamName` is a text string. It must follow the format 'TeamX' where X is a letter from A-Z. It should be exactly 5 characters long. This is an **optional** field.

Examples of usage:
* `/Print`
* `/Print TeamA`

<hr>

### Editing Team Information or Match Results: `/Edit` 
Edits Team Information and Match Results of existing teams. If the inputted match results does not exist between the two teams, a new match result will be added to the table.

Syntax: 
```
/Edit
TeamName Date GroupNumber
Team1Name Team2Name Team1Score Team2Score
END
```

> ⚠️️️️ Syntax Notes
> * `TeamName`, `Team1Name` and `Team2Name` are text strings. They must follow the format 'TeamX' where X is a letter from A-Z. They should be exactly 5 characters long.
> * `Date` is a text string in the format `"DD/MM"`. It should be exactly 5 characters long.
> * `GroupNumber` is an integer. The value should be greater than 0.
> * `Team1Score` and `Team2Score` are integers. The values should be at least 0.

Examples of usage: 
```
/Edit
TeamA 02/03 3
TeamA TeamB 2 0
END
```

<hr>

### Deleting all Team Information and Match Results: `/Delete`
Deletes all team information and match results from the table.

Syntax: `/Delete`

Example of usage:
* `/Delete`

<hr>

### Exiting the application: `/Exit`
Exits WeAreTheChampions.

Syntax: `/Exit`

Example of usage:
```
/Exit
END
```

## Admin-restricted Commands
### Editing Team Information or Match Results of a specific user: `/AdminEdit` 
Edits Team Information and Match Results of existing teams of the **specified user**. If the inputted match results does not exist between the two teams, a new match result will be added to the table.

Syntax: 
```
/AdminEdit Username
TeamName Date GroupNumber
Team1Name Team2Name Team1Score Team2Score
END
```

> ⚠️️️️ Syntax Notes
> * `Username` is a text string. It must be a valid username for the command to run.
> * `TeamName`, `Team1Name` and `Team2Name` are text strings. They must follow the format 'TeamX' where X is a letter from A-Z. They should be exactly 5 characters long.
> * `Date` is a text string in the format `"DD/MM"`. It should be exactly 5 characters long.
> * `GroupNumber` is an integer. The value should be greater than 0.
> * `Team1Score` and `Team2Score` are integers. The values should be at least 0.

Examples of usage: 
```
/AdminEdit user
TeamA 02/03 3
TeamA TeamB 2 0
END
```

<hr>

### Deleting all Team Information and Match Results of a specific user: `/AdminDelete`
Deletes all team information and match results from the table of the **specified user**.

Syntax: `/AdminDelete Username`

> ⚠️️️️ Syntax Notes
> * `Username` is a text string. It must be a valid username for the command to run.

Example of usage:
* `/AdminDelete user`

<hr>

## Sample Outputs
Input: 
```
Team Information:
TeamA 01/02 3
END
```

Output:
```
Group 3
Rank | TeamName | MatchesPlayed | Wins | Draws | Losses | Points | GoalsScored
-----|----------|---------------|------|-------|--------|--------|------------
1    | TeamA    | 0             | 0    | 0     | 0      | 0      | 0
Teams that have qualified for the next round: TeamA
```

## FAQ

**Q**: How do I transfer my data to another computer or another instance of WeAreTheChampions?

**A**:
As you enter data into WeAreTheChampions, it creates a `data-<username>.json` file in the **Data** folder. You can copy this file and place it in the **Data** folder of your new computer or instance. 

## Assumptions
1. A team can only exist once and in 1 group.
2. Team names can only be in the format of 'TeamX' where X is a letter from A-Z. It should be exactly 5 characters long.
3. The top 4 teams of each group qualify for the next round. If a group has less than 4 teams, all teams qualify for the next round.
4. A match between 2 teams can only occur once.
5. Teams are able to play teams from other groups.
6. You are only allowed to edit previously entered data, which is limited to:
> * Team name
> * Team registration date
> * Team group number
> * Team(s) scores
7. You will not be able to directly edit other information pertaining to the table such as:
> * Team points
> * Team wins
> * Team matches played
8. If the normal runtime of WeAreTheChampions is disrupted unexpectedly, the new or updated information may not be saved. 
9. `data-<username>.json` should not be tampered with outside of the normal runtime of WeAreTheChampions. Doing so will result in failing the data validation, and you will not be able to restore data from the previous runtime. 
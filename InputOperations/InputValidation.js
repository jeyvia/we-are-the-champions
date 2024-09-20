const { AuthenticateRole, CheckIfUserExists } = require('../Authentication/UserAuthentication');

const NULL_INPUT_MESSAGE = "Input is null, undefined or empty";
const INCORRECT_NUMBER_OF_ARGUMENTS_TEAM_INFORMATION_MESSAGE = "Incorrect number of arguments to input Team Information. Expected number of arguments: 3\n";
const INCORRECT_NUMBER_OF_ARGUMENTS_MATCH_RESULTS_MESSAGE = "Incorrect number of arguments to input Match Results. Expected number of arguments: 4\n";
const INVALID_TEAM_FORMAT_MESSAGE = "Invalid team name format.";
const INVALID_DATE_FORMAT_MESSAGE = "Invalid date format. Date must be given in the format 'DD/MM'";
const INVALID_GROUP_NUMBER_FORMAT_MESSAGE = "Invalid group number format. Group number must be a positive integer";
const INVALID_SCORE_FORMAT_MESSAGE = "Invalid score format. Score must be more than or equal to 0";
const INCORRECT_NUMBER_OF_ARGUMENTS_PRINT_MESSAGE = "Incorrect number of arguments to input Print. Expected number of arguments: 1 or 2\n";
const INCORRECT_NUMBER_OF_ARGUMENTS_EDIT_MESSAGE = "Incorrect number of arguments to input Edit. Expected number of arguments: 3 or 4\n";
const INVALID_DELETE_COMMAND_MESSAGE = "Incorrect number of arguments to input Delete. Expected number of arguments: 1\n";
const INVALID_EXIT_COMMAND_MESSAGE = "Incorrect number of arguments to input Exit. Expected number of arguments: 1\n";
const INVALID_HELP_COMMAND_MESSAGE = "Incorrect number of arguments to input Help. Expected number of arguments: 1\n";
const INCORRECT_NUMBER_OF_ARGUMENTS_ADMIN_EDIT_MESSAGE = "Incorrect number of arguments to input AdminEdit. Expected number of arguments: 2\n";
const INCORRECT_NUMBER_OF_ARGUMENTS_ADMIN_DELETE_MESSAGE = "Incorrect number of arguments to input AdminDelete. Expected number of arguments: 2\n";
const INVALID_PERMISSIONS_MESSAGE = "You do not have the necessary permissions to perform this action";

const VALID_TEAM_INFORMATION_SYNTAX_MESSAGE = "Team Information syntax:\nTeam Information:\nTeamName Date GroupNumber";
const VALID_MATCH_RESULTS_SYNTAX_MESSAGE = "Match Results syntax:\nMatch Results:\nTeam1 Team2 Team1Score Team2Score";
const VALID_PRINT_SYNTAX_MESSAGE = "Print syntax:\n/Print\n/Print TeamName";
const VALID_EDIT_SYNTAX_MESSAGE = "Edit syntax:\n/Edit\nTeamName Date GroupNumber\nTeam1 Team2 Team1Score Team2Score";
const VALID_DELETE_SYNTAX_MESSAGE = "Delete syntax:\n/Delete";
const VALID_EXIT_SYNTAX_MESSAGE = "Exit syntax:\n/Exit";
const VALID_HELP_SYNTAX_MESSAGE = "Help syntax:\n/Help";
const VALID_ADMIN_EDIT_SYNTAX_MESSAGE = "AdminEdit syntax:\n/AdminEdit Username";
const VALID_ADMIN_DELETE_SYNTAX_MESSAGE = "AdminDelete syntax:\n/AdminDelete Username";

function ValidateTeamFormat(input) {
    if (input.length <= 0) {
        throw new Error(INVALID_TEAM_FORMAT_MESSAGE);
    }
}

function ValidateDateFormat(input) {
    if (input.length !== 5) {
        throw new Error(INVALID_DATE_FORMAT_MESSAGE);
    }
    const dateRegex = /^\d{2}\/\d{2}$/;
    if (!dateRegex.test(input)) {
        throw new Error(INVALID_DATE_FORMAT_MESSAGE);
    }
}

function ValidateGroupNumber(input) {
    const groupNumber = parseInt(input);
    if (isNaN(groupNumber) || groupNumber < 1) {
        throw new Error(INVALID_GROUP_NUMBER_FORMAT_MESSAGE);
    }
}

function ValidateScore(input) {
    const score = parseInt(input);
    if (isNaN(score) || score < 0) {
        throw new Error(INVALID_SCORE_FORMAT_MESSAGE);
    }
}

function ValidateTeamInformationInput(input) {

    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 3) {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_TEAM_INFORMATION_MESSAGE + VALID_TEAM_INFORMATION_SYNTAX_MESSAGE);
    }
    ValidateTeamFormat(args[0]);
    ValidateDateFormat(args[1]);
    ValidateGroupNumber(args[2]);
    return args;
}

function ValidateMatchResultsInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 4) {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_MATCH_RESULTS_MESSAGE + VALID_MATCH_RESULTS_SYNTAX_MESSAGE);
    }
    ValidateTeamFormat(args[0]);
    ValidateTeamFormat(args[1]);
    ValidateScore(args[2]);
    ValidateScore(args[3]);
    return args;
}

function ValidatePrintInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length === 2) {
        ValidateTeamFormat(args[1]);
        return args;
    } else if (args.length === 1) {
        return args;
    } else {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_PRINT_MESSAGE + VALID_PRINT_SYNTAX_MESSAGE);
    }
}

function ValidateEditInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length === 4) {
        ValidateTeamFormat(args[0]);
        ValidateTeamFormat(args[1]);
        ValidateScore(args[2]);
        ValidateScore(args[3]);
        return args;
    } else if (args.length === 3) {
        ValidateTeamFormat(args[0]);
        ValidateDateFormat(args[1]);
        ValidateGroupNumber(args[2]);
        return args;
    } else {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_EDIT_MESSAGE + VALID_EDIT_SYNTAX_MESSAGE);
    }
}

function ValidateDeleteInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 1) {
        throw new Error(INVALID_DELETE_COMMAND_MESSAGE + VALID_DELETE_SYNTAX_MESSAGE);
    }
}

function ValidateExitInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 1) {
        throw new Error(INVALID_EXIT_COMMAND_MESSAGE + VALID_EXIT_SYNTAX_MESSAGE);
    }
}

function ValidateHelpInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 1) {
        throw new Error(INVALID_HELP_COMMAND_MESSAGE + VALID_HELP_SYNTAX_MESSAGE);
    }
}

function ValidateAdminEditCommand(input, user) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    if (!AuthenticateRole(user)) {
        throw new Error(INVALID_PERMISSIONS_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 2) {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_ADMIN_EDIT_MESSAGE + VALID_ADMIN_EDIT_SYNTAX_MESSAGE);
    }
    if (!CheckIfUserExists(args[1])) {
        throw new Error(`User ${args[1]} does not exist`);
    }
    return args[1];
}

function ValidateAdminDeleteCommand(input, user) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    if (!AuthenticateRole(user)) {
        throw new Error(INVALID_PERMISSIONS_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 2) {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_ADMIN_DELETE_MESSAGE + VALID_ADMIN_DELETE_SYNTAX_MESSAGE);
    }
    if (!CheckIfUserExists(args[1])) {
        throw new Error(`User ${args[1]} does not exist`);
    }
    return args[1];
}

module.exports = { 
    ValidateTeamInformationInput, 
    ValidateMatchResultsInput, 
    ValidatePrintInput, 
    ValidateEditInput, 
    ValidateDeleteInput, 
    ValidateExitInput, 
    ValidateHelpInput, 
    ValidateAdminEditCommand, 
    ValidateAdminDeleteCommand
};
const NULL_INPUT_MESSAGE = "Input is null, undefined or empty"
const INCORRECT_NUMBER_OF_ARGUMENTS_TEAM_INFORMATION_MESSAGE = "Incorrect number of arguments to input Team Information. Expected number of arguments: 3";
const INCORRECT_NUMBER_OF_ARGUMENTS_MATCH_RESULTS_MESSAGE = "Incorrect number of arguments to input Match Results. Expected number of arguments: 4";
const INVALID_TEAM_FORMAT_MESSAGE = "Invalid team format. Team name must be given in the format 'TeamX' where X is a letter from A-Z";
const INVALID_DATE_FORMAT_MESSAGE = "Invalid date format. Date must be given in the format 'MM/DD'";
const INVALID_GROUP_NUMBER_FORMAT_MESSAGE = "Invalid group number format. Group number must be a positive integer";
const INVALID_SCORE_FORMAT_MESSAGE = "Invalid score format. Score must be more than or equal to 0";
const INCORRECT_NUMBER_OF_ARGUMENTS_PRINT_MESSAGE = "Incorrect number of arguments to input Print. Expected number of arguments: 1 or 2";
const INCORRECT_NUMBER_OF_ARGUMENTS_EDIT_MESSAGE = "Incorrect number of arguments to input Edit. Expected number of arguments: 3 or 4";

function ValidateTeamFormat(input) {
    if (input.length !== 5) {
        throw new Error(INVALID_TEAM_FORMAT_MESSAGE);
    } 
    if (input.substring(0, 4).toLowerCase() !== "team") {
        throw new Error(INVALID_TEAM_FORMAT_MESSAGE);
    }
    const teamRegex = /^[A-Za-z]+$/;
    if (!teamRegex.test(input.substring(4, 5))) {
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
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_TEAM_INFORMATION_MESSAGE); 
    }
    try {
        ValidateTeamFormat(args[0]);
        ValidateDateFormat(args[1]);
        ValidateGroupNumber(args[2]);
    } catch (error) {
        throw error;
    }
    return args;
}

function ValidateMatchResultsInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length !== 4) {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_MATCH_RESULTS_MESSAGE);
    }
    try {
        ValidateTeamFormat(args[0]);
        ValidateTeamFormat(args[1]);
        ValidateScore(args[2]);
        ValidateScore(args[3]);
    } catch (error) {
        throw error;
    }
    return args;
}

function ValidatePrintInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length === 2) {
       try {
            ValidateTeamFormat(args[1]);
        } catch (error) {
            throw error;
       }
       return args;
    } else if (args.length === 1) {
        return args;
    } else {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_PRINT_MESSAGE);
    }
}

function ValidateEditInput(input) {
    if (input === null || input === undefined || input === '') {
        throw new Error(NULL_INPUT_MESSAGE);
    }
    const args = input.split(' ');
    if (args.length === 4) {
        try {
            ValidateTeamFormat(args[0]);
            ValidateTeamFormat(args[1]);
            ValidateScore(args[2]);
            ValidateScore(args[3]);
        } catch (error) {
            throw error;
        }
        return args;
    } else if (args.length === 3) {
        try {
            ValidateTeamFormat(args[0]);
            ValidateDateFormat(args[1]);
            ValidateGroupNumber(args[2]);
        } catch (error) {
            throw error;
        }
        return args;
    } else {
        throw new Error(INCORRECT_NUMBER_OF_ARGUMENTS_EDIT_MESSAGE);
    }
}

module.exports = { ValidateTeamInformationInput, ValidateMatchResultsInput, ValidatePrintInput, ValidateEditInput };
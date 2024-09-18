const crypto = require('crypto');
const fs = require('fs');
const TableManager = require('../Commands/Table');

const FILENAME = "./Data/data.json";
const NO_FILE_MESSAGE = 'No data file found.';
const EMPTY_FILE_MESSAGE = 'The data file is empty.';
const INVALID_JSON_FORMAT_MESSAGE = 'Invalid JSON format.';
const MISSING_FIELDS_MESSAGE = "Missing 'data' or 'hash' fields in the JSON file.";
const DATA_INTEGRITY_CHECK_FAILED_MESSAGE = 'Data integrity check failed: Data has been tampered with.';
const LOAD_DATA_SUCCESS_MESSAGE = 'Data integrity check passed: Data loaded successfully';

function CalculateHash(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

function SaveJsonWithHash() {
    const data = { rawTable: TableManager.getRawTable(), numOfGroups: TableManager.getNumOfGroups() };
    const hash = CalculateHash(data);
    const dataWithHash = { data, hash };
    fs.writeFileSync(FILENAME, JSON.stringify(dataWithHash, null, 2));
}

function LoadAndVerifyJson() {
    if (fs.existsSync(FILENAME)) {
        const FileContent = fs.readFileSync(FILENAME, 'utf-8');
        if (FileContent) {
            let ParsedContent;
            try {
                ParsedContent = JSON.parse(FileContent);
            } catch (error) {
                throw new Error(INVALID_JSON_FORMAT_MESSAGE);
            }
            if (!ParsedContent.data || Array.isArray(ParsedContent.data.rawTable) || ParsedContent.data.numOfGroups === 0 || !ParsedContent.hash) {
                throw new Error(MISSING_FIELDS_MESSAGE);
            }

            const CalculatedHash = CalculateHash(ParsedContent.data);
            if (CalculatedHash !== ParsedContent.hash) {
                throw new Error(DATA_INTEGRITY_CHECK_FAILED_MESSAGE);
            }
            
            TableManager.setRawTable(ParsedContent.data.rawTable);
            TableManager.assignNumOfGroups(ParsedContent.data.numOfGroups);
            console.log(LOAD_DATA_SUCCESS_MESSAGE);
        } else {
            throw new Error(EMPTY_FILE_MESSAGE);
        }
    } else {
        throw new Error(NO_FILE_MESSAGE);
    }
}

module.exports = { SaveJsonWithHash, LoadAndVerifyJson };
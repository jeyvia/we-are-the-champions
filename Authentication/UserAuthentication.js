const fs = require('fs');
const crypto = require('crypto');

const USERS_FILE = './Authentication/users.json';

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function AuthenticateUser(username, password) {
    const users = readUsers();

    const user = users[username];
    const hashedPassword = hashPassword(password);

    if (user && user.password === hashedPassword) {
        return { username: username, role: user.role };
    }
}

function CheckIfUserExists(username) {
    const users = readUsers();
    return users[username] !== undefined;
}

function AuthenticateRole(user) {
    if (user.role === 'admin') {
        return true;
    }
    return false;
}

module.exports = { AuthenticateUser, AuthenticateRole, CheckIfUserExists };
const PrivilegedRoles = ['admin'];

function AuthenticateRole(role) {
    if (PrivilegedRoles.includes(role)) {
        return true;
    }
    return false;
}

module.exports = { AuthenticateRole };
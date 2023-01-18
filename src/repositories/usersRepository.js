import connection from "../database.js";

async function getUsers() {
    const users = await connection.query(`
        SELECT id, username, "profilePic" FROM users;
    `);
    return users.rows;
}

async function checkUsernameAvailability(username) {
    const usernameRequest = await connection.query(`
        SELECT * FROM users
        WHERE username = $1;
    `, [username]);
    return (usernameRequest.rowCount == 0);
}

async function createUser({ username, hashedPassword, profilePic }) {
    const newUserRequest = await connection.query(`
        INSERT INTO users (username, password, "profilePic")
        VALUES ($1, $2, $3)
        RETURNING id;
    `, [username, hashedPassword, profilePic]);
    return newUserRequest.rows[0].id;
}

async function logUser({ userId, token }) {
    await connection.query(`
        INSERT INTO sessions ("userId", token)
        VALUES ($1, $2);
    `, [userId, token]);
}

async function getUserByUsername(username) {
    const user = await connection.query(`
        SELECT * FROM users
        WHERE username = $1;
    `, [username]);
    return user.rows[0];
}

export { getUsers, checkUsernameAvailability, createUser, logUser, getUserByUsername }
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
    return (usernameRequest.rows.length > 0);
}

async function signUp({username, hashedPassword, profilePic}) {
    const newUser = await connection.query(`
        INSERT INTO users (username, password, "profilePic")
        VALUES ($1, $2, $3)
        RETURNING id;
    `, [username, hashedPassword, profilePic]);
    const userId = newUser.rows[0];
    console.log(newUser.rows[0].id);
    return userId;

    //await connection.query(`
    //    INSERT INTO sessions (userId, token)
    //    VALUES ($1, $2);
    //`, [newUserId, token]);
}

export { getUsers, checkUsernameAvailability, signUp }
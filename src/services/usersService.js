import * as repository from '../repositories/usersRepository.js';

async function getUsers() {
    const users = await repository.getUsers();
    return users;
}

async function signUp({ username, password, profilePic }) {
    const isUsernameUsed = await repository.checkUsernameAvailability(username);
    if(isUsernameUsed) return false;

    let hashedPassword = password;                                                                                                                                                   
    const token = await repository.signUp({ username, hashedPassword, profilePic });
    return token;
}

export { getUsers, signUp }
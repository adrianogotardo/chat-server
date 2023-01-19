import * as repository from '../repositories/usersRepository.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function getUsers() {
    const users = await repository.getUsers();
    return users;
}

async function checkUsernameAvailability(username) {
    const isUsernameAvailable = await repository.checkUsernameAvailability(username);
    return isUsernameAvailable;
}

async function signUp({ username, password, profilePic }) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    const userId = await repository.createUser({ username, hashedPassword, profilePic });
    const token = uuid();
    await repository.logUser({userId, token});
    return token;
}

async function getUserInfo(username) {
    const user = await repository.getUserByUsername(username);
    if(!user) return false;
    return user;
}

async function login({ user, password }) {
    if(!bcrypt.compareSync(password, user.password)) return false;
    const token = uuid();
    await repository.logUser({ userId: user.id, token });
    return token;
}

export { getUsers, checkUsernameAvailability, signUp, getUserInfo, login }
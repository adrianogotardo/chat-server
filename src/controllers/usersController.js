import * as service from '../services/usersService.js';

async function getUsers(req, res) {
    try {
        const users = await service.getUsers();
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

async function signUp(req, res) {
    const { username, password, profilePic } = req.body;
    if(profilePic.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) == null) 
    return res.sendStatus(422);
    try {
        const isUsernameAvailable = service.checkUsernameAvailability(username);
        if(!isUsernameAvailable) return res.sendStatus(409);
        const token = await service.signUp({username, password, profilePic});
        return res.status(201).send(token);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

async function signIn(req, res) {
    const { username, password } = req.body;
    if(!username || !password) return res.sendStatus(422);
    try {
        const user = await service.getUserInfo(username);
        if(!user) return res.sendStatus(404);
        const token = await service.login({ user, password });
        if(!token) return res.send(401);
        return res.status(200).send(token);
    } catch(error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
    //
}

export { getUsers, signUp, signIn }
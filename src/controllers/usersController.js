import * as service from '../services/usersService.js';

async function getUsers(req, res) {
    try {
        const users = await service.getUsers();
        console.log(users);
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

async function signUp(req, res) {
    try {
        const { username, password, profilePic } = req.body;
        if(profilePic.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) == null) return res.sendStatus(422);

        const token = await service.signUp({username, password, profilePic});
        if(!token) return res.sendStatus(409);

        return res.status(201).send(token);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export { getUsers, signUp }
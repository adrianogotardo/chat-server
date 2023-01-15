import express from 'express';
import cors from 'cors';
import { getUsers, signUp } from './controllers/usersController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', getUsers);

app.post('/signup', signUp);

app.post('/signin', async (req, res) => {

});

app.get('/messages', async (req, res) => {

});

app.post('/messages', async (req, res) => {

});

app.delete('/messages', async (req, res) => {

});

app.put('/messages', async (req, res) => {

});


export default app;
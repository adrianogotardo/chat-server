import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Chegou um GET!");
    res.send("GET recebido :)").status(200);
})

export default app;
import express from "express";
import cors from "cors";
import { sample_users } from "./data";
import path from 'path';


const app = express();
//localhost:4200
//localhost:5000
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));






app.get("/api/login", (req, res) => {
    res.send(sample_users);
})
// aqui  lo de nasr

app.post("/api/login", (req, res) => {
    const { userName, password } = req.body;
    const user = sample_users.find(user => user.userName === userName && user.password === password);

    if (user) {
        res.send(user);
    } else {
        res.status(400).send("Username or password is not valid");
    }
})

// const port = 5000;
// app.listen(port, () => {
//     console.log("website served on http://localhost:" + port);
// })

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})

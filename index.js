import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express';
import { MongoClient } from "mongodb";
const app = express();
const PORT = 4000;
const PORT = process.env.PORT;


const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();

app.get("/", function (req, res) {
    res.send("Hello Purushothaman");
});

app.post("/movies", express.json(), async (req, res) => {
    const data = req.body;
    const result = await client.db("movieporject").collection("movies").insertMany(data);
    res.status(201).send(result);
});

app.get("/movies", async (req, res) => {
    const movies = await client.db("movieproject").collection("movies").find({}).toArray();
    res.send(movies);
});

app.listen(PORT, () => {
    console.log(`Server is started in ${PORT}`);
})

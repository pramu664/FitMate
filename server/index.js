import bodyParser from "body-parser";
import cors from "cors";
import express, { application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use((req, res, next) => {
    console.log("Hey, I am global middleware.");
    console.log("Path:",req["path"], "Method:",req["method"]);
    next();
})

app.get("/", (req, res) => {
    console.log(process.env.PORT);
    res.json("Welcome to my server...");
})


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


    
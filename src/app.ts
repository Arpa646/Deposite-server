import cors from "cors";
import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';

import router from "./route/index";
import notFound from "./app/middleware/notFound";


const app: Application = express();

// Parsers

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


app.use(cors({
  credentials: true,
  origin:"http://localhost:3000"
}));




app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Bank Account',
  });
});



// Application routes
app.use("/api", router);



app.use(notFound);



export default app;

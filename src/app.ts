import cors from "cors";
import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';




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







export default app;

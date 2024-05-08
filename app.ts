import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import roleRouter from './src/routers/roleRouter';


const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req:Request, res:Response) => {
    return res.status(200).send('Hello World!');
});


app.use('/api/v1/role', roleRouter);



export default app;

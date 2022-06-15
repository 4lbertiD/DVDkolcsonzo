import 'reflect-metadata';
import {createConnection} from 'typeorm';
import { connectionOptions } from '../ormconfig';
import express from 'express';
import { getRouter } from './routes';

createConnection(connectionOptions).then(() => {
    const app = express();

    app.use(express.json());
    app.use('/api', getRouter());

    app.listen(5000, () => {
        console.log('Listening on 5000 ...');
    });
}).catch(error => console.log(error));


import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Request, Response } from 'express';

import { TTPparams } from './TTPparams';
import Router from './routes/index';

import RSA from './models/RSA';
import RSAPublicKey from './models/RSAPublicKey';
import RSAPrivateKey from './models/RSAPrivateKey';

//INITIALIZATIONS
const ttpParams = TTPparams.getInstance();
ttpParams.setPort(5000);
const app: express.Application = express();  //To create an Express application

//CONFIGS
app.set('port', ttpParams.getPort() || process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ 'extended': false }));
app.use(morgan('dev'));
app.use(cors());

//ROUTER
app.get('/test', (req: Request, res: Response) => {
    res.status(200).send(`Hello World! I'm listening at port ${app.get('port')}`);
});
app.use('', Router);

//SERVER STARTUP
app.listen(app.get('port'), async () => {
    console.log(`TTP started. Listening at port ${app.get('port')}`);

    //GENERATE (2048 bits) RSA KEY PAIR FOR THIS SESSION
    let kp = await RSA.generateKeys(2048);
    ttpParams.setRSAkpub(kp.kpub as RSAPublicKey);
    ttpParams.setRSAkpriv(kp.kpriv as RSAPrivateKey);
    console.log(`TTP generated RSA Key Pair:\ne = ${kp.kpub.e}\nn = ${kp.kpub.n}\nd = ${kp.kpriv.d}\n`);

});
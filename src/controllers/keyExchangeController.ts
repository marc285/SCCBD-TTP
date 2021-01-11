import { Request, Response } from 'express';
import * as bigintConversion from 'bigint-conversion';

import { TTPparams } from '../TTPparams';
import RSAPublicKey from '../models/RSAPublicKey';

class keyExchangeController{

    public async serverKeyExchange(req: Request, res: Response){ //RSA Key exchange between Server and TTP
        try{
            const ttpParams = TTPparams.getInstance();
    
            let { e, n } = req.body; //HEX encoded (in JSON)
    
            if ((e != null) && (n != null)) {
                ttpParams.setServerRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(e), bigintConversion.hexToBigint(n)));
                console.log(`\nReceived Server RSA Public Key\ne = ${ttpParams.getServerRSAkpub().e}\nn = ${ttpParams.getServerRSAkpub().n}`)
    
                res.status(200).json({'e': bigintConversion.bigintToHex(ttpParams.getRSAkpub().e), 'n': bigintConversion.bigintToHex(ttpParams.getRSAkpub().n) }); //HEX coded
            }
            else
                res.status(400).json({ 'e': `Bad Request: Missing Server's key's Public Exponent or Modulus` });
        }
        catch{
            res.status(500).json({ 'e': 'Internal Server Error'});
        }
    }
    
    public async clientKeyExchange(req: Request, res: Response){ //RSA Key exchange between Client and TTP
        try{
            const ttpParams = TTPparams.getInstance();
    
            let { e, n } = req.body; //HEX encoded (in JSON)
    
            if ((e != null) && (n != null)) {
                ttpParams.setClientRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(e), bigintConversion.hexToBigint(n)));
                console.log(`\nReceived Client RSA Public Key\ne = ${ttpParams.getClientRSAkpub().e}\nn = ${ttpParams.getClientRSAkpub().n}`)
    
                res.status(200).json({'e': bigintConversion.bigintToHex(ttpParams.getRSAkpub().e), 'n': bigintConversion.bigintToHex(ttpParams.getRSAkpub().n)}); //HEX coded
            }
            else
                res.status(400).json({'e': `Bad Request: Missing Client's key's Public Exponent or Modulus`});
        }
        catch{
            res.status(500).json({'e': 'Internal Server Error'});
        }
    }

}

const controller: keyExchangeController = new keyExchangeController();
export default controller;
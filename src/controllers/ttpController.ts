import { Request, Response } from 'express';
import * as bigintConversion from 'bigint-conversion';
import * as objectSha from 'object-sha';

import { TTPparams } from '../TTPparams';

class ttpController {

    public async publishSharedKey(req: Request, res: Response){ //TYPE 3: Publishes (stores) the shared Key (K)
        try{
            const ttpParams = TTPparams.getInstance();

            let { obj } = req.body;

            let serializedBody = objectSha.hashable(obj.body);
            const hashObj: string = await objectSha.digest(serializedBody); //HEX
            const hashProof: bigint = ttpParams.getServerRSAkpub().verify(bigintConversion.hexToBigint(obj.proof.value));
            
            if(hashObj == bigintConversion.bigintToHex(hashProof)){
                ttpParams.setSharedKey(obj.body.msg);

                let timestamp: number = Date.now();
                ttpParams.setTS4(timestamp);

                let body = {
                    'type': "4", 'src': "A", 'dst': "B", 'ttp': "TTP", 'ts': timestamp
                }

                serializedBody = objectSha.hashable(body);
                const digest = await objectSha.digest(serializedBody);
                const signature = ttpParams.getRSAkpriv().sign(bigintConversion.hexToBigint(digest));

                obj = {
                    'body' : body,
                    'proof': { 'type': "Publication of K", 'value': bigintConversion.bigintToHex(signature) }
                }

                console.log(obj);
                res.status(201).json({'obj': obj}); //TYPE 4: Returns to the Server an acknowledgement
            }
            else{
                console.log("\nError: Can't verify the proof of origin of K");
                res.status(403).json({'obj': `Error: Can't verify the proof of origin of K`});
            }
        }
        catch{
            res.status(500).json({'obj' : 'Internal Server Error'});
        }
    }

    public async getSharedKey(req: Request, res: Response){ //TYPE 4: Sends to the Client the shared Key (K)
        try{
            const ttpParams = TTPparams.getInstance();

            let body = {
                'type': "4", 'src': "A", 'dst': "B", 'ttp': "TTP", 'ts': ttpParams.getTS4(), 'msg': ttpParams.getSharedKey()
            }

            const serializedBody = objectSha.hashable(body);
            const digest = await objectSha.digest(serializedBody);
            const signature = ttpParams.getRSAkpriv().sign(bigintConversion.hexToBigint(digest));

            let obj = {
                'body' : body,
                'proof': { 'type': "Publication of K", 'value': bigintConversion.bigintToHex(signature) }
            }

            console.log(Object.values(obj));
            res.status(200).json({'obj': obj});
        }
        catch{
            res.status(500).json({'obj' : 'Internal Server Error'});
        }
    }

}

const controller: ttpController = new ttpController();
export default controller;
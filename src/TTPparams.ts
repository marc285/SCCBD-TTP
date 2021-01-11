import RSAPublicKey from './models/RSAPublicKey';
import RSAPrivateKey from './models/RSAPrivateKey';

export class TTPparams {  //Singleton Pattern

    private static instance: TTPparams;

    private port: number;
    private sharedKey: any; //(K of the TTP schema)
    private RSAkpub: RSAPublicKey; //e,n BigInt
    private RSAkpriv: RSAPrivateKey; //d,n Bigint
    private serverRSAkpub: RSAPublicKey; //Public key of the Server 
    private clientRSAkpub: RSAPublicKey; //Public key of the Client 
    private TS4: number; //Timestamp stored for TYPE 4 Message 

    private constructor() { //Empty initialization 
        this.port = 0;
        this.sharedKey = '';
        this.RSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.RSAkpriv = new RSAPrivateKey(BigInt(0), BigInt(0));
        this.serverRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.clientRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.TS4 = Date.now();
    };

    public static getInstance(): TTPparams {
        if (!TTPparams.instance) {
            TTPparams.instance = new TTPparams();
        }

        return TTPparams.instance;
    }

    public getPort(): number {
        return this.port;
    }

    public setPort(port: number) {
        this.port = port;
    }

    public getSharedKey(): any {
        return this.sharedKey;
    }

    public setSharedKey(sharedKey: any) {
        this.sharedKey = sharedKey;
    }

    public getRSAkpub(): RSAPublicKey {
        return this.RSAkpub;
    }

    public setRSAkpub(RSAkpub: RSAPublicKey) {
        this.RSAkpub = RSAkpub;
    }

    public getRSAkpriv(): RSAPrivateKey {
        return this.RSAkpriv;
    }

    public setRSAkpriv(RSAkpriv: RSAPrivateKey) {
        this.RSAkpriv = RSAkpriv;
    }

    public getServerRSAkpub(): RSAPublicKey {
        return this.serverRSAkpub;
    }

    public setServerRSAkpub(RSAkpub: RSAPublicKey) {
        this.serverRSAkpub = RSAkpub;
    }

    public getClientRSAkpub(): RSAPublicKey {
        return this.clientRSAkpub;
    }

    public setClientRSAkpub(RSAkpub: RSAPublicKey) {
        this.clientRSAkpub = RSAkpub;
    }

    public getTS4(): number {
        return this.TS4;
    }

    public setTS4(TS4: number) {
        this.TS4 = TS4;
    }

}
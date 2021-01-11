# SCCBD-TTP
Trusted Third Party (TTP) Server (for Non-Repudiation Protocol implementation) of the Cibersecurity (SCCBD) test project by Marc Cayuelas
  
## Scripts
`npm run dev` Run in development  
`npm run prod` Run in production  
`npm run build` Build (transpile) to production  
  
## API Endpoints
  
**POST** `/keyExchange/server` RSA Key Exchange between the Server and the TTP  
**POST** `/keyExchange/client` RSA Key Exchange between the Client and the TTP  
___  
**GET** `/ttp/getKey` [TTP TYPE 4] Sends to the Client the Shared Key (K)  
**POST** `/ttp/publishKey` [TTP TYPE 3] Publishes (stores) the Shared Key (K) in the TTP  
  
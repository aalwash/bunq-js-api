import {BunqApiConfig} from "./BunqApiConfig";
import {BunqApiSetup} from "./BunqApiSetup";
import {BunqConnection} from "./BunqConnection";
import {BunqKey} from "./BunqKey";
import {BunqApi} from "./BunqApi";
import fs = require('fs');

const dateTime = require('node-datetime');
var dt = dateTime.create();
var dateTimeString = dt.format('YmdHMS');


const config:BunqApiConfig = new BunqApiConfig();
const deviceServerConfig = BunqApiConfig.readJson(config.json.secretsFile);
const privateKeyPem:string=BunqApiConfig.read(config.json.privateKeyFile);
const key : BunqKey = new BunqKey(privateKeyPem);
const installationTokenConfig = BunqApiConfig.readJson(config.json.installationTokenFile);
const installationToken:string=installationTokenConfig.Response[1].Token.token;
const connect:BunqConnection = new BunqConnection();
const setup:BunqApiSetup=new BunqApiSetup(connect,key,deviceServerConfig.secret,installationToken);
const bunqApi:BunqApi=new BunqApi(connect, key,deviceServerConfig.secret,setup,
    config.json.bunqSessionFile, config.json.bunqSessionHistoryPath);

bunqApi.updateSession().then(function(response:string){
    console.log("current session token:"+response);
}).catch(function(error:string){
    console.log("error : "+error);
});
import {
  getPythClusterApiUrl,
    getPythProgramKeyForCluster,
    PriceStatus,
    PythConnection,
} from '@pythnetwork/client';
import { Connection } from '@solana/web3.js';
import * as dotenv from 'dotenv';
dotenv.config();

const PYTHNET_CLUSTER_NAME = 'pythnet';
const CLUSTER = 'pythnet';

const connection = new Connection(getPythClusterApiUrl(PYTHNET_CLUSTER_NAME)) 
const pythPublicKey = getPythProgramKeyForCluster(CLUSTER);
const pythConnection = new PythConnection(connection, pythPublicKey);

pythConnection.onPriceChange((productAccount, priceAccount) => {
    const symbol = productAccount.symbol;
    if (symbol === 'Crypto.ETH/USD' || symbol === 'Crypto.FTM/USD') {
        const price = priceAccount.price;
        const confidence = priceAccount.confidence;
        if (price && confidence) {
            if (symbol === 'Crypto.ETH/USD') {
                console.log(`ETH/USD price: \x1b[34m$${price.toFixed(4)}\x1b[0m`);
            } else if (symbol === 'Crypto.FTM/USD') {
                console.log(`FTM/USD price: \x1b[33m$${price.toFixed(4)}\x1b[0m`);
            }
        } else {
            console.log(`Price for ${symbol} is not available`);
        }
    }
});



console.log('Listening for price changes...');
pythConnection.start();
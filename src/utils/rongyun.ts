import { rongyunConfig } from '../config/rongyun.config';
import { sha1 } from './crypto';
export function createHeader() {
    const nonce = (Math.random() * Math.pow(10, 5)).toFixed(0);
    const timestamp = new Date().getTime();
    const signature = sha1(`${rongyunConfig.appSecret}${nonce}${timestamp}`);
    return {
        'App-Key': rongyunConfig.appKey,
        'Nonce': nonce,
        'Timestamp': timestamp,
        'Signature': signature,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
export {
    rongyunConfig
};
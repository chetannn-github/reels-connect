import cron from 'node-cron';
import { refreshAllUserTokens } from '../services/refreshToken.service.js';


cron.schedule('0 0 */3 * *', async () => {
    console.log('Running token refresh cron job...');
    await refreshAllUserTokens();
});

console.log('Token refresh cron job scheduled.');
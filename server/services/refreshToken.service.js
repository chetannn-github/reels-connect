import { refreshLongLivedToken } from '../controllers/ig/index.js';
import { User } from '../models/user.model.js';

export async function refreshAllUserTokens() {
    const users = await User.find({});

    for (let user of users) {
        try {
            await refreshLongLivedToken(user);
        } catch (err) {
            console.error(`Failed for user ${user._id}:`, err.message);
        }
    }
}
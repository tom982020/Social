import { createClient } from 'altogic';
import { Session } from 'inspector';

// This `envUrl` and `clientKey` is sample you need to create your own.
let envUrl = 'https://auth.c1-na.altogic.com';
let clientKey = 'e574fee1fb2b443...a8598ca68b7d8';

const altogic = createClient(envUrl, clientKey, {
    signInRedirect: '/login',
});

// We will use this function in server-side.
export const altogicWithToken = (token) => {
    altogic.auth.setSession(token);
    return altogic;
};

export default altogic;
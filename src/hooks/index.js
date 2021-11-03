import * as cookie from 'cookie';
import { connection } from "$lib/persistence/db";

export const handle = async ({ request, resolve }) => {
    const { db } = await connection();

    // cookies
    const cookies = cookie.parse(request.headers.cookie || "");
    request.locals.cookies = cookies;

    // auth
    let user = {};
    const finded = await db.collection('cookie').findOne({ session_id: cookies.session_id });
    if (finded) {
        let db_user = await db.collection('user').findOne({ _id: finded.user });
        if (!db_user) user.authenticated = false;
        else {
            user = db_user;
            user.authenticated = true;
        }
    } else user.authenticated = false;
    request.locals.user = user;

    // session
    request.locals.session = {};
    request.locals.session.user = { authenticated: user.authenticated };

    return await resolve(request);
}

export const getSession = async (request) => {
    return request.locals.session;
}
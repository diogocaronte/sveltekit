import { connection } from "$lib/persistence/db";
import { v4 as uuidv4 } from 'uuid';
import * as cookie from 'cookie';
import stringHash from "string-hash";

export const post = async ({ body }) => {
    const { db } = await connection();

    const finded = await db.collection('user').findOne({ username: body.username });
    if (!finded || finded.password != stringHash(body.password)) return {
        status: 401,
        body: { message: 'Incorrect username or password' }
    }

    const session_id = uuidv4();
    
    const is_duplicated = await db.collection('cookie').findOne({user: finded._id});

    if (is_duplicated) await db.collection('cookie').updateOne({ user: finded._id }, { $set: { session_id }});
    else db.collection('cookie').insertOne({ session_id, user: finded._id });

    const headers = {
        'Set-Cookie': cookie.serialize('session_id', session_id, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/'
        })
    }

    return {
        status: 200,
        headers,
        body: { message: 'Success' }
    }
}
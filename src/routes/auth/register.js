import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { connection } from '$lib/persistence/db';
import { validate } from 'jsonschema';

export const post = async ({ body }) => {
    const { db } = await connection();

    let res = validate(body, {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                minLength: 6,
                maxLength: 30
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 30
            }
        },
        required: ['username', 'password']
    });

    if (!res.valid) return {
        status: 422,
        body: { message: res.errors }
    }

    const finded = await db.collection('user').findOne({ username: body.username });
    if (finded) return {
        status: 409,
        body: { message: 'User with that username already exists' }
    }

    const { insertedId } = await db.collection('user').insertOne({
        username: body.username,
        password: stringHash(body.password)
    });

    const session_id = uuidv4();
    await db.collection('cookie').insertOne({
        session_id,
        user: insertedId
    });

    const headers = {
        'Set-Cookie': cookie.serialize('session_id', session_id, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/'
        })
    }

    return {
        status: 201,
        headers,
        body: { message: 'Created' }
    };
}
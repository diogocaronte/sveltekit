import { connection } from "$lib/persistence/db";
import { Unauthorized } from "$lib/response";
import { validate } from 'jsonschema';

export async function post({ locals, body }) {
    const { db } = await connection();

    const user = locals.user;
    if (!user.authenticated) return Unauthorized();

    let res = validate(body, {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                minLength: 1,
                maxLength: 500
            }
        },
        required: ['message']
    });

    if (!res.valid) return {
        status: 422,
        body: { message: res.errors }
    }

    let post = {
        author: user.username,
        createdAt: new Date(),
        message: body.message
    }
    
    await db.collection('post').insertOne(post);

    return {
        status: 201,
        body: { post }
    }
}
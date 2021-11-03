import { connection } from "$lib/persistence/db";
import { Unauthorized } from "$lib/response";

export async function get({ locals, params }) {
    const { db } = await connection();

    const user = locals.user;
    if (!user.authenticated) return Unauthorized();

    let finded = await db.collection('user').findOne({ username: params.username }, { projection: { _id: 0, password: 0 }});
    if (!finded) return {
        status: 404,
        body: { message: 'User not found' }
    }

    return {
        status: 200,
        body: finded
    };
}
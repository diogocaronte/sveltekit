import { connection } from "$lib/persistence/db";
import { Unauthorized } from "$lib/response";

export async function get({ locals, params }) {
    const { db } = await connection();

    const user = locals.user;
    if (!user.authenticated) return Unauthorized();

    let finded = await db.collection('post').find({ author: params.username });
    finded = await finded.toArray();

    return {
        status: 200,
        body: finded
    };
}
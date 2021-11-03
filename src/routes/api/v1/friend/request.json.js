import { connection } from "$lib/persistence/db";
import { Unauthorized } from "$lib/response";

export async function get({ locals, params }) {
    const { db } = await connection();

    const user = locals.user;
    if (!user.authenticated) return Unauthorized();

    const finded = await db.collection('friend_request').find({ to: user.username }, { projection: { _id: 0 }});
    let requests = [];

    await finded.forEach(element => {
        requests.push(element.from);
    });

    return {
        status: 200,
        body: requests
    }
}
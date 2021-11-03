import { connection } from "$lib/persistence/db";
import { Unauthorized } from "$lib/response";

export async function get({ locals, params }) {
    const { db } = await connection();

    const user = locals.user;
    if (!user.authenticated) return Unauthorized();

    const finded = await db.collection('friend').find({ friend: params.username }, { projection: { _id: 0 }});
    let friends = [];
    await finded.forEach(element => {
        friends.push(...element.friend);
    });
    friends = friends.filter(element => element != user.username);

    return {
        status: 200,
        body: friends
    }
}
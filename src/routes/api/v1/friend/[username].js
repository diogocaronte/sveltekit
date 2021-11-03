import { connection } from "$lib/persistence/db";
import { NotFound, Unauthorized } from "$lib/response";

export async function post({ locals, params }) {
    const { db } = await connection();

    const user = locals.user;
    if (!user.authenticated) return Unauthorized();

    const finded = await db.collection('user').findOne({ username: params.username });
    if (!finded) return NotFound();

    if (finded.username == user.username) return {
        status: 406,
        body: { message: 'You not can invite yourself' }
    }

    const is_friend = await db.collection('friend').findOne({
        $and: [
            { friend: user.username },
            { friend: params.username }
        ]
    });
    if (is_friend) return {
        status: 406,
        body: { message: 'You already are friends'}
    }
    
    let already_send = await db.collection('friend_request').findOne({ from: user.username, to: params.username });
    if (already_send) return {
        status: 406,
        body: { message: 'You has already invited' }
    }

    let requested = await db.collection('friend_request').findOne({ from: params.username, to: user.username });
    if (requested) { // accept friend friend_request
        await db.collection('friend').insertOne({ friend: [params.username, user.username] });
        await db.collection('friend_request').deleteOne({ from: params.username, to: user.username });
    } else { // just invite
        await db.collection('friend_request').insertOne({ from: user.username, to: params.username });
    }

    return {
        status: 200,
        body: { message: 'Success' }
    }
}
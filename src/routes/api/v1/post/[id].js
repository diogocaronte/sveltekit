import { ObjectId} from "mongodb";
import { connection } from "$lib/persistence/db";
import { Unauthorized } from "$lib/response";

export async function del({ locals, params }) {
    const { db } = await connection();

    const user = locals.user;
    if (!user.authenticated) return Unauthorized();

    let finded = await db.collection('post').deleteOne({ _id: ObjectId(params.id) });
    if (finded.deletedCount === 0) return {
        status: 404,
        body: { message: 'Post not founded' }
    }

    return {
        status: 200,
        body: { message: 'Success' }
    }
}
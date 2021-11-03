import { get as get_friends } from "./[username].json";
export async function get({ locals }) {

    const response = await get_friends({ locals, params: { username: locals.user.username }});

    return response;
}
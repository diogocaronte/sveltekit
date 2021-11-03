import { get as get_user } from "./[username].json";
export async function get({ locals }) {

    const response = await get_user({locals, params: { username: locals.user.username }});   

    return response;
}
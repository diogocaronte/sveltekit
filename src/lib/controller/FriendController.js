import { wrapper } from "./_utils";

export default class FriendController {
    constructor() {}

    async add(username) {
        return wrapper(await fetch(`/api/v1/friend/${username}`, {
            method: 'POST'
        }));
    }

    async listByUsername(username) {
        return wrapper(await fetch(`/api/v1/friend/${username}.json`));
    }

    async request_list() {
        return wrapper(await fetch('/api/v1/friend/request.json'));
    }
}
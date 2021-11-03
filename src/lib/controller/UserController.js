import { wrapper } from "./_utils";

export default class UserController {
    constructor() {}

    async getByUsername(username) {
        return wrapper(await fetch(`/api/v1/user/${username}.json`));
    }
}
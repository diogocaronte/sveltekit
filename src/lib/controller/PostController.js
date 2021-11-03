import { wrapper } from "./_utils";

export default class PostController {
    constructor() {}

    async create(message) {
        return wrapper(await fetch(`/api/v1/post`, {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' }
        }));
    }

    async delete(id) {
        return wrapper(await fetch(`/api/v1/post/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }));
    }

    async list() {
        return wrapper(await fetch('/api/v1/post/all.json'));
    }
}
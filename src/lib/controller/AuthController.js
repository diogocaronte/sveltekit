import { wrapper } from "./_utils";

export default class AuthController {
    constructor() {}

    async login(credential) {
        return wrapper(await fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credential),
            headers: { 'Content-Type': 'application/json' }
        }));
    }

    async register(credential) {
        return wrapper(await fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(credential),
            headers: { 'Content-Type': 'application/json' }
        }));
    }
}
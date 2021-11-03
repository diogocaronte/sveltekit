export default class Post {
    constructor(id, author, message, createdAt = new Date()) {
        this._id = id;
        this.author = author;
        this.message = message;
        this.createdAt = createdAt;
    }
}
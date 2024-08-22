module.exports = class WrongDataException extends Error {
    // message:string;
    constructor(message:string) {
        super(message);
        this.name = 'WrongDataException';

        Object.setPrototypeOf(this, WrongDataException.prototype);
    }
}

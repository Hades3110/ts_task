"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrongDataException extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongDataException';
    }
}
exports.default = WrongDataException;

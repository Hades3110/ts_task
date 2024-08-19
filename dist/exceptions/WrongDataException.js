"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongDataException = void 0;
class WrongDataException extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongDataException';
    }
}
exports.WrongDataException = WrongDataException;

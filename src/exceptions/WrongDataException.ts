class WrongDataException extends Error {
    name: string;

    constructor(message: string) {
        super(message);
        this.name = 'WrongDataException';
    }
}

export default WrongDataException

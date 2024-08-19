import { WrongDataErrorMessages } from "../types/enums/wrongDataErrorMessages";

export default class WrongDataException extends Error {
  constructor(message: WrongDataErrorMessages) {
    super(message);
    this.name = WrongDataErrorMessages.WRONG_DATA_EXCEPTION
  }
}

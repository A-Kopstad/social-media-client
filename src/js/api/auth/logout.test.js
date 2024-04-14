import { logout } from "./logout";
import * as storage from "../../storage/index.js";

// Mocking the storage module
jest.mock("../../storage/index.js", () => {
  return {
    remove: jest.fn(),
  };
});

describe("logout function", () => {
  it("should clear the token and profile from the storage", () => {
    logout();

    expect(storage.remove).toHaveBeenCalledWith("token");
    expect(storage.remove).toHaveBeenCalledWith("profile");
    expect(storage.remove).toHaveBeenCalledTimes(2);
  });
});

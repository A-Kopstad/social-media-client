import { login } from "./login";

// Mocking localStorage
const mockLocalStorage = {};
Object.defineProperty(global, "localStorage", {
  value: {
    getItem: jest.fn((key) => mockLocalStorage[key]),
    setItem: jest.fn((key, value) => {
      mockLocalStorage[key] = value.toString();
    }),
    clear: jest.fn(() => {
      Object.keys(mockLocalStorage).forEach(
        (key) => delete mockLocalStorage[key],
      );
    }),
  },
  configurable: true,
});

// Mocking fetch
global.fetch = jest.fn();

describe("login function", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  it("stores accessToken in localStorage on successful login", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ accessToken: "12345" }),
    });

    await login("validemail@noroff.no", "validpassword");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify("12345"),
    );
  });

  it("throws an error with invalid credentials", async () => {
    fetch.mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(
      login("invalidemail@noroff.no", "wrongpassword"),
    ).rejects.toThrow("Unauthorized");
  });
});

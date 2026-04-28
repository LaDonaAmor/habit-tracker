import { storage } from "@/lib/storage";

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns fallback when localStorage is empty", () => {
    expect(storage.getHabits()).toEqual([]);
  });

  it("clears session correctly", () => {
    storage.setSession({ userId: "u1", email: "a@b.com" });
    storage.clearSession();
    expect(storage.getSession()).toBeNull();
  });
});

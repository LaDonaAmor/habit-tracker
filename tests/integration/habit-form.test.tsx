import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "@/app/dashboard/page";
import { storage } from "@/lib/storage";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

function seedSession() {
  storage.setUsers([
    { id: "u1", email: "a@b.com", password: "pw", createdAt: "" },
  ]);
  storage.setSession({ userId: "u1", email: "a@b.com" });
}

describe("habit form", () => {
  it("shows a validation error when habit name is empty", async () => {
    seedSession();
    render(<DashboardPage />);
    await userEvent.click(await screen.findByTestId("create-habit-button"));
    await userEvent.click(screen.getByTestId("habit-save-button"));
    expect(
      await screen.findByText("Habit name is required"),
    ).toBeInTheDocument();
  });

  it("creates a new habit and renders it in the list", async () => {
    seedSession();
    render(<DashboardPage />);
    await userEvent.click(await screen.findByTestId("create-habit-button"));
    await userEvent.type(screen.getByTestId("habit-name-input"), "Drink Water");
    await userEvent.click(screen.getByTestId("habit-save-button"));
    expect(
      await screen.findByTestId("habit-card-drink-water"),
    ).toBeInTheDocument();
  });

  it("edits an existing habit and preserves immutable fields", async () => {
    seedSession();
    storage.setHabits([
      {
        id: "h1",
        userId: "u1",
        name: "Old",
        description: "",
        frequency: "daily",
        createdAt: "2025-01-01",
        completions: ["2025-01-02"],
      },
    ]);
    render(<DashboardPage />);
    await userEvent.click(await screen.findByTestId("habit-edit-old"));
    const input = screen.getByTestId("habit-name-input");
    await userEvent.clear(input);
    await userEvent.type(input, "New");
    await userEvent.click(screen.getByTestId("habit-save-button"));
    const updated = storage.getHabits()[0];
    expect(updated.name).toBe("New");
    expect(updated.id).toBe("h1");
    expect(updated.userId).toBe("u1");
    expect(updated.createdAt).toBe("2025-01-01");
    expect(updated.completions).toEqual(["2025-01-02"]);
  });

  it("deletes a habit only after explicit confirmation", async () => {
    seedSession();
    storage.setHabits([
      {
        id: "h1",
        userId: "u1",
        name: "Run",
        description: "",
        frequency: "daily",
        createdAt: "",
        completions: [],
      },
    ]);
    render(<DashboardPage />);
    await userEvent.click(await screen.findByTestId("habit-delete-run"));
    expect(screen.getByTestId("habit-card-run")).toBeInTheDocument(); // still there
    await userEvent.click(screen.getByTestId("confirm-delete-button"));
    expect(screen.queryByTestId("habit-card-run")).not.toBeInTheDocument();
  });

  it("toggles completion and updates the streak display", async () => {
    seedSession();
    storage.setHabits([
      {
        id: "h1",
        userId: "u1",
        name: "Read",
        description: "",
        frequency: "daily",
        createdAt: "",
        completions: [],
      },
    ]);
    render(<DashboardPage />);
    const card = await screen.findByTestId("habit-card-read");
    expect(within(card).getByTestId("habit-streak-read")).toHaveTextContent(
      "0",
    );
    await userEvent.click(within(card).getByTestId("habit-complete-read"));
    expect(within(card).getByTestId("habit-streak-read")).toHaveTextContent(
      "1",
    );
  });
});

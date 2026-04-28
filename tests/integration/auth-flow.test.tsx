import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { storage } from "@/lib/storage";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe("auth flow", () => {
  it("submits the signup form and creates a session", async () => {
    render(<SignupForm />);
    await userEvent.type(screen.getByTestId("auth-signup-email"), "a@b.com");
    await userEvent.type(screen.getByTestId("auth-signup-password"), "pw12345");
    await userEvent.click(screen.getByTestId("auth-signup-submit"));
    expect(storage.getSession()?.email).toBe("a@b.com");
  });

  it("shows an error for duplicate signup email", async () => {
    storage.setUsers([
      { id: "x", email: "dup@b.com", password: "pw", createdAt: "" },
    ]);
    render(<SignupForm />);
    await userEvent.type(screen.getByTestId("auth-signup-email"), "dup@b.com");
    await userEvent.type(screen.getByTestId("auth-signup-password"), "pw");
    await userEvent.click(screen.getByTestId("auth-signup-submit"));
    expect(await screen.findByText("User already exists")).toBeInTheDocument();
  });

  it("submits the login form and stores the active session", async () => {
    storage.setUsers([
      { id: "u", email: "l@b.com", password: "pw", createdAt: "" },
    ]);
    render(<LoginForm />);
    await userEvent.type(screen.getByTestId("auth-login-email"), "l@b.com");
    await userEvent.type(screen.getByTestId("auth-login-password"), "pw");
    await userEvent.click(screen.getByTestId("auth-login-submit"));
    expect(storage.getSession()?.userId).toBe("u");
  });

  it("shows an error for invalid login credentials", async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByTestId("auth-login-email"), "no@b.com");
    await userEvent.type(screen.getByTestId("auth-login-password"), "bad");
    await userEvent.click(screen.getByTestId("auth-login-submit"));
    expect(
      await screen.findByText("Invalid email or password"),
    ).toBeInTheDocument();
  });
});

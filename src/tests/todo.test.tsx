import { expect, test, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import App from "../pages/Home";

describe("todo test", () => {
  const { unmount } = render(<App />);
  test("is Render", async () => {
    const appleButton = screen.queryByTestId("Apple-og-list");
    expect(appleButton).toBeInTheDocument;

    expect(appleButton).toBeDefined();
    unmount();
  });

  test("is move to correct column and jump back in 5000ms", async () => {
    const { rerender, unmount } = render(<App />);
    const appleButton = screen.queryByTestId("Apple-og-list");

    appleButton?.click();
    rerender(<App />);
    expect(screen.queryByTestId("Apple-og-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Apple-Fruit-list")).toBeInTheDocument();
    rerender(<App />);

    await waitFor(
      () => expect(screen.getByTestId("Apple-og-list")).toBeInTheDocument(),
      { interval: 1000, timeout: 5000 }
    );
    await waitFor(
      () =>
        expect(
          screen.queryByTestId("Apple-Fruit-list")
        ).not.toBeInTheDocument(),
      { interval: 1000, timeout: 5000 }
    );

    unmount();
  });

  test("is move to correct column and jump back move back instantly when clicking", async () => {
    const { rerender, unmount } = render(<App />);
    const appleButton = screen.queryByTestId("Apple-og-list");

    appleButton?.click();
    rerender(<App />);
    expect(screen.queryByTestId("Apple-og-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Apple-Fruit-list")).toBeInTheDocument();

    screen.queryByTestId("Apple-Fruit-list")?.click();
    rerender(<App />);
    expect(screen.getByTestId("Apple-og-list")).toBeInTheDocument();
    expect(screen.queryByTestId("Apple-Fruit-list")).not.toBeInTheDocument();
    unmount();
  });
});

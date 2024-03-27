import { expect, test, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import App from "../pages/Home";

describe("todo test", () => {
  test("is Render", async () => {
    render(<App />);
    const appleButton = screen.queryByTestId("Apple-og-list");
    expect(appleButton).toBeInTheDocument();
  });

  test("is move to correct column and jump back in 5000ms", async () => {
    render(<App />);
    const appleButton = screen.queryByTestId("Apple-og-list");

    appleButton?.click();

    await waitFor(() => {
      expect(screen.queryByTestId("Apple-og-list")).not.toBeInTheDocument();
      expect(screen.queryByTestId("Apple-Fruit-list")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.getByTestId("Apple-og-list")).toBeInTheDocument();
        expect(
          screen.queryByTestId("Apple-Fruit-list")
        ).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  test("is move to correct column and jump back move back instantly when clicking", async () => {
    render(<App />);
    const appleButton = screen.queryByTestId("Apple-og-list");

    appleButton?.click();

    await waitFor(() => {
      expect(screen.queryByTestId("Apple-og-list")).not.toBeInTheDocument();
      expect(screen.queryByTestId("Apple-Fruit-list")).toBeInTheDocument();
    });

    screen.queryByTestId("Apple-Fruit-list")?.click();

    await waitFor(() => {
      expect(screen.getByTestId("Apple-og-list")).toBeInTheDocument();
      expect(screen.queryByTestId("Apple-Fruit-list")).not.toBeInTheDocument();
    });
  });
});

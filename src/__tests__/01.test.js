// src/__tests__/01.test.js
import { renderHook } from "@testing-library/react-hooks";
import { useDocumentTitle } from "../exercise/01";

describe("useDocumentTitle hook", () => {
  test("is a function and sets the document title", () => {
    const title = "Test Title";

    // Render the hook
    renderHook(() => useDocumentTitle(title));

    // The document title should be updated
    expect(document.title).toBe(title);
  });

  test("updates the title when the hook is called with a new value", () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "Initial Title" },
    });

    expect(document.title).toBe("Initial Title");

    // Rerender hook with new title
    rerender({ title: "Updated Title" });
    expect(document.title).toBe("Updated Title");
  });
});

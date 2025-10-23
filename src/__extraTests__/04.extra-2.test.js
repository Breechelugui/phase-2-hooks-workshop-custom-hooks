import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04"; // adjust path if needed

describe("Exercise 04 - Bonus 2", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("updates state after storage events", () => {
    const { result } = renderHook(() => useLocalStorage("test", "initial"));

    // Simulate another tab updating localStorage
    act(() => {
      localStorage.setItem("test", JSON.stringify("new value"));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "test",
          newValue: JSON.stringify("new value"),
        })
      );
    });

    expect(result.current[0]).toBe("new value");
  });

  test("removes the storage event listener on unmount", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useLocalStorage("test", "initial"));
    unmount();

    expect(addSpy).toHaveBeenCalledWith("storage", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("storage", expect.any(Function));
  });
});

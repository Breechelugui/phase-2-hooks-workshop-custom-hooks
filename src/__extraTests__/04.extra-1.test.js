import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04"; // adjust path if needed

describe("Exercise 04 - Bonus 2", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("updates state after storage events", () => {
    const { result } = renderHook(() => useLocalStorage("test", "initial"));

    // Simulate a storage event like another tab changed localStorage
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "test",
          newValue: JSON.stringify("new value"),
        })
      );
    });

    expect(result.current[0]).toBe("new value");
  });

  test("the event handler function is removed when the component unmounts", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useLocalStorage("test", "initial"));
    unmount();

    expect(addSpy).toHaveBeenCalledWith("storage", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("storage", expect.any(Function));
  });
});

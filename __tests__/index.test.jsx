import "@testing-library/jest-dom";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "../src/app/page";
import { getRandomInt } from "../src/utils";

const jsonData = require("../static_file/data.json");

describe("Page Testing", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    //jest.runOnlyPendingTimers()
    //jest.useRealTimers();
  });

  const data = jsonData.data;

  it("renders a heading", () => {
    render(<Page />);
    const heading = screen.getByText(/Auto Delete Todo List/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders the 2 boxes", () => {
    const { container } = render(<Page />);
    const titleBuckets = container.querySelectorAll(".title");
    for (const title of titleBuckets) {
      expect(["fruit", "vegetable"]).toContain(
        title.textContent.toLocaleLowerCase()
      );
    }
  });

  it("Click any element to category bucket. Then, It will back in 5 seconds", async () => {
    // Setup a screen
    render(<Page />);
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const restBucket = screen.getByTestId("rest-bucket");

    // Find a item and get category bucket
    const index = getRandomInt(0, data.length - 1);
    const item = screen.getByTestId(data.at(index).name);
    const categoryBucket = screen.getByTestId(
      `${data.at(index).type.toLocaleLowerCase()}-bucket`
    );

    // check exist item in category bucket
    await user.click(item);
    const newItem = within(categoryBucket).getByTestId(data.at(index).name);
    expect(newItem).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5500);
    });

    // check item back to be a last item in rest bucket, after time passed more than 5 seconds.
    const itemsInRest = restBucket.querySelectorAll("*");
    expect(itemsInRest.item(itemsInRest.length - 1).textContent).toMatch(
      data.at(index).name
    );
  });

  it("Click any element to category bucket. Then, click it back immediately", async () => {
    // Setup a screen
    render(<Page />);
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const restBucket = screen.getByTestId("rest-bucket");

    // Find a item and get category bucket
    const index = getRandomInt(0, data.length - 1);
    const item = screen.getByTestId(data.at(index).name);
    const categoryBucket = screen.getByTestId(
      `${data.at(index).type.toLocaleLowerCase()}-bucket`
    );

    // check exist item in category bucket
    await user.click(item);
    const newItem = within(categoryBucket).getByTestId(data.at(index).name);
    expect(newItem).toBeInTheDocument();

    // check item back to be a last item in rest bucket, after click a item.
    await user.click(newItem);
    const itemsInRest = restBucket.querySelectorAll("*");
    expect(itemsInRest.item(itemsInRest.length - 1).textContent).toMatch(
      data.at(index).name
    );
  });
});

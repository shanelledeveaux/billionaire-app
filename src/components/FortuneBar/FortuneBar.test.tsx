import { render, screen } from "@testing-library/react";
import FortuneBar from "./FortuneBar";
import "@testing-library/jest-dom";

describe("FortuneBar", () => {
  it("renders remaining and spent amounts", () => {
    render(
      <FortuneBar remaining={120} spent={120} spentPct={50} totalItems={3} />,
    );
    expect(screen.getByText("$120.0B")).toBeInTheDocument();
    expect(screen.getByText("$120.0B spent so far")).toBeInTheDocument();
  });

  it("displays item count and percentage", () => {
    render(
      <FortuneBar remaining={120} spent={120} spentPct={50} totalItems={3} />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});

function expect(arg0: any) {
  throw new Error("Function not implemented.");
}

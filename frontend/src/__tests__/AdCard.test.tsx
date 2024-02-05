import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AdCard from "../components/AdCard";

describe("AdCard", () => {
  it("renders the AdCard component", () => {
    const view = render(
      <AdCard
        link="/ads/1"
        ad={{
          id: 1,
          title: "myad",
          picture: "http://img.com/i.png",
          price: 42,
        }}
      />
    );

    expect(screen.getByText(/myad/)).toBeVisible();
    expect(screen.getByText(/42/)).toBeVisible();
    expect(view.baseElement).toMatchSnapshot();
  });
});

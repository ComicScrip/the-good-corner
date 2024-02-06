import { render, screen } from "@testing-library/react";
import AdCard from "../components/AdCard";

describe("AdCard component", () => {
  it("renders correctly", () => {
    const view = render(
      <AdCard
        ad={{
          id: 1,
          picture: "https://img.com/i.png",
          title: "testing",
          price: 42,
        }}
        link="/ads/1"
      ></AdCard>
    );
    expect(screen.getByText(/testing/)).toBeInTheDocument();
    expect(screen.getByText(/42/)).toBeInTheDocument();
    expect(view.baseElement).toMatchSnapshot();
  });
});

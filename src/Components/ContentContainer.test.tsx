import * as React from "react";
import ContentContainer from "./ContentContainer";
import { shallow } from "enzyme";

describe("ContentContainer", () => {
  it("sets the parent div id to the specified id", () => {
    const tree = shallow(<ContentContainer id="123" cardContent={<div />} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders provided cardContent", () => {
    const tree = shallow(
      <ContentContainer id="" cardContent={<h3>Content</h3>} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders a light card by default", () => {
    const tree = shallow(<ContentContainer id="" cardContent={<div />} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders a light card when specified", () => {
    const tree = shallow(
      <ContentContainer id="" cardContent={<div />} backgroundColor="light" />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders a dark card when specified", () => {
    const tree = shallow(
      <ContentContainer id="" cardContent={<div />} backgroundColor="dark" />
    );
    expect(tree).toMatchSnapshot();
  });
});

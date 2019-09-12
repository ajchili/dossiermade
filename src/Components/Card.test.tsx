import * as React from "react";
import Card from "./Card";
import { shallow } from "enzyme";

describe("Card", () => {
  
  it("renders a provided title and content", () => {
    const tree = shallow(<Card title="Title" content={<h3>Content</h3>} />);
    expect(tree.html()).toMatchSnapshot();
  });
  
  it("renders a light card by default", () => {
    const tree = shallow(<Card title="" content={<div/>} />);
    expect(tree.html()).toMatchSnapshot();
  });
  
  it("renders a light card when specified", () => {
    const tree = shallow(<Card title="" content={<div/>} backgroundColor="light" />);
    expect(tree.html()).toMatchSnapshot();
  });
  
  it("renders a dark card when specified", () => {
    const tree = shallow(<Card title="" content={<div/>} backgroundColor="dark" />);
    expect(tree.html()).toMatchSnapshot();
  });
});

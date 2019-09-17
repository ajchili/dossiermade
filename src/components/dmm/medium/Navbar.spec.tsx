import * as React from "react";
import Navbar from "./Navbar";
import { Link } from "../Navbar";
import { shallow } from "enzyme";

describe("Medium Navbar", () => {
  it("renders no links if none are provided", () => {
    const tree = shallow(<Navbar links={[]} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders links if any are provided", () => {
    const links: Array<Link> = [
      {
        name: "TEST",
        url: "test"
      },
      {
        name: "TESTING",
        url: "testing"
      }
    ];
    const tree = shallow(<Navbar links={links} />);
    expect(tree).toMatchSnapshot();
  });
});

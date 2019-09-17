import * as React from "react";
import NavbarMenu from "./NavbarMenu";
import { Link } from "./Navbar";
import { shallow } from "enzyme";

describe("NavbarMenu", () => {
  it("renders no links if none are provided", () => {
    const tree = shallow(<NavbarMenu links={[]} />);
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
    const tree = shallow(<NavbarMenu links={links} />);
    expect(tree).toMatchSnapshot();
  });
});

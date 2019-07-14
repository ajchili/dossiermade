import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ContentContainer from "../Components/ContentContainer";
import ContactCard from "../Components/ContactCard";

interface Props extends RouteComponentProps {}

class Work extends Component<Props> {
  render() {
    return (
      <div>
        <ContentContainer
          id="contact"
          backgroundColor="dark"
          cardContent={<ContactCard />}
        />
      </div>
    );
  }
}

export default withRouter(Work);

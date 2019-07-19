import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ContentContainer from "../Components/ContentContainer";
import ContactCard from "../Components/ContactCard";
import WorkCard from "../Components/WorkCard";
import Person from "../lib/Person";
import Work from "../lib/Work";

interface Props extends RouteComponentProps {}

interface State {
  allWork: Array<Work>;
}

class WorksPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let state: { allWork: Array<Work> } = props.location.state || {
      eallWork: []
    };
    this.state = {
      allWork: state.allWork
    };
    window.scrollTo(0, 0);
  }

  render() {
    const { allWork } = this.state;
    return (
      <div>
        <ContentContainer
          id="content"
          backgroundColor="dark"
          cardContent={
            <WorkCard
              backgroundColor="dark"
              bottomContent={
                <button className="uk-button uk-button-secondary">More</button>
              }
              work={allWork || []}
              page={"other"}
            />
          }
        />
        <ContentContainer
          id="content"
          backgroundColor="dark"
          cardContent={<ContactCard people={Person.getStaticPeople()} />}
        />
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <button
            className="uk-button uk-button-secondary"
            onClick={() => {
              const { history } = this.props;
              history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(WorksPage);

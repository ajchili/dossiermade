import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ContentContainer from "../Components/ContentContainer";
import ContactCard from "../Components/ContactCard";
import WorkHighlight from "../Components/WorkHighlight";
import Work from "../lib/Work";

interface Props extends RouteComponentProps {}

interface State {
  type: "single" | "all";
  work?: Work;
  allWork?: Array<Work>;
}

class WorkPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let state: { work?: Work } = props.location.state || {};
    let params: { id?: string } = props.match.params;
    // Checking for title fixes bug where react state reloads
    // and changes type of work object.
    if (state.work === undefined || !state.work.title) {
      if (params.id) {
        this._loadSingleWork(params.id);
      } else {
        this._loadPaginatedWork();
      }
    }
    this.state = {
      type: params.id ? "single" : "all",
      work: state.work
    };
    window.scrollTo(0, 0);
  }

  _loadSingleWork = async (id: string) => {
    const { history } = this.props;
    try {
      let work = await Work.getById(id);
      this.setState({ work });
    } catch (err) {
      if (err.message === "Work does not exist!") {
        return history.push("/work");
      } else {
        return history.push("/");
      }
    }
  };

  _loadPaginatedWork = async () => {};

  render() {
    const { type, work } = this.state;
    return (
      <div>
        {type === "single" && <WorkHighlight work={work} />}
        <ContentContainer
          id="content"
          backgroundColor="dark"
          cardContent={<ContactCard />}
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

export default withRouter(WorkPage);

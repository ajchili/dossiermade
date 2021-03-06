import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import ContactCard from "../components/ContactCard";
import WorkHighlight from "../components/WorkHighlight";
import WorkShowcaseContainer from "../components/dmm/WorkShowcaseContainer";
import { Work } from "../lib/firebase";
import WorkStore from "../store/WorkStore";

interface Props extends RouteComponentProps { }

interface State {
  type: "single" | "all";
  work?: Work;
  allWork?: Array<Work>;
}

class WorkPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const state: { work?: Work } = props.location.state || { work: undefined };
    const params: { id?: string } = props.match.params;
    const type = !!params.id ? "single" : "all";
    this.state = {
      type,
      work: state.work,
      allWork: WorkStore.instance().work
    };
    if (type === "single") {
      this._loadSingleWork(params.id!);
    }
    window.scrollTo(0, 0);
  }

  _loadSingleWork = async (id: string) => {
    const { history } = this.props;
    try {
      let work = await WorkStore.instance().getById(id);
      this.setState({ work });
    } catch (err) {
      if (err.message === "Work does not exist!") {
        return history.push("/work");
      } else {
        return history.push("/");
      }
    }
  };

  render() {
    const { type, work, allWork = [] } = this.state;
    return (
      <div>
        {type === "single" && <WorkHighlight work={work} />}
        {type === "all" && (
          <ContentContainer
            id="content"
            backgroundColor="dark"
            cardContent={
              <WorkShowcaseContainer
                backgroundColor="dark"
                bottomContent={
                  <button className="uk-button uk-button-secondary">
                    More
                  </button>
                }
                work={allWork}
              />
            }
          />
        )}
        <ContentContainer
          id="contact"
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

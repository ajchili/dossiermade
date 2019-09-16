import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import ContactCard from "../components/ContactCard";
import WorkCard from "../components/WorkCard";
import WorkHighlight from "../components/WorkHighlight";
import Person from "../lib/Person";
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
    let state: { work?: Work; allWork?: Array<Work> } = props.location
      .state || { work: undefined, allWork: undefined };
    let params: { id?: string } = props.match.params;
    if (state.work !== undefined && !state.work.title) {
      state.work = undefined;
    }
    if (
      state.allWork !== undefined &&
      (!state.allWork.length || !state.allWork[0].title)
    ) {
      state.allWork = undefined;
    }
    this.state = {
      type: params.id ? "single" : "all",
      work: state.work,
      allWork: state.allWork
    };
    if (params.id) {
      this._loadSingleWork(params.id);
    } else if (state.allWork === undefined) {
    }
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

  render() {
    const { type, work, allWork } = this.state;
    return (
      <div>
        {type === "single" && <WorkHighlight work={work} />}
        {type === "all" && !!allWork && (
          <ContentContainer
            id="content"
            backgroundColor="dark"
            cardContent={
              <WorkCard
                backgroundColor="dark"
                bottomContent={
                  <button className="uk-button uk-button-secondary">
                    More
                  </button>
                }
                work={allWork || []}
                page={"other"}
              />
            }
          />
        )}
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

export default withRouter(WorkPage);

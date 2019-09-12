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
  hideMoreButton: boolean;
  loadingMoreWork: boolean;
}

class WorksPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const state: { allWork: Array<Work> } = props.location.state || {
      allWork: []
    };
    // Get all objects that have the property id. This is done to ensure that
    // provided objects are of type Work. Provided objects are not of type
    // Work when a refresh occurs.
    const allWork: Array<Work> = state.allWork.filter(work => !!work.id);
    this.state = {
      allWork,
      hideMoreButton: allWork.length !== 5,
      loadingMoreWork: false
    };
    window.scrollTo(0, 0);
    if (allWork.length === 0) {
      this._getRecentWork();
    }
  }

  _getRecentWork = async () => {
    try {
      const recentWork = await Work.getRecent();
      this.setState({
        allWork: recentWork,
        hideMoreButton: recentWork.length !== 5
      });
    } catch (err) {
      // TODO: Handle error
    }
  }

  _getMoreWork = async () => {
    const { allWork } = this.state;
    if (allWork.length > 0) {
      this.setState({
        loadingMoreWork: true
      });
      try {
        const lastWorkId: string = allWork[allWork.length - 1].id;
        const lastWorkDoc = await Work.getDocById(lastWorkId);
        const olderWork = await Work.getAfter(lastWorkDoc);
        this.setState({
          allWork: allWork.concat(olderWork),
          hideMoreButton: olderWork.length !== 5,
        });
      } catch (err) {
        // TODO: Handle error
      } finally {
        this.setState({
          loadingMoreWork: false
        });
      }
    }
  }

  render() {
    const { allWork, hideMoreButton, loadingMoreWork } = this.state;
    return (
      <div>
        <ContentContainer
          id="content"
          backgroundColor="dark"
          cardContent={
            <WorkCard
              backgroundColor="dark"
              bottomContent={
                <div>
                  <button
                    className="uk-button uk-button-secondary"
                    hidden={loadingMoreWork || hideMoreButton}
                    onClick={this._getMoreWork}
                  >
                    More
                  </button>
                  <div
                    className="uk-text-center uk-dark"
                    hidden={!loadingMoreWork}
                  >
                    <div uk-spinner="ratio: 1" />
                  </div>
                </div>
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

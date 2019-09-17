import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import ContactCard from "../components/ContactCard";
import WorkCard from "../components/WorkCard";
import Person from "../lib/Person";
import Work from "../lib/Work";
import WorkStore from "../store/WorkStore";

interface Props extends RouteComponentProps {}

interface State {
  allWork: Array<Work>;
  hideMoreButton: boolean;
  loadingMoreWork: boolean;
}

class WorksPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const allWork = WorkStore.instance().work;
    this.state = {
      allWork,
      hideMoreButton: false,
      loadingMoreWork: false
    };
    window.scrollTo(0, 0);
    if (allWork.length === 0) {
      this._getRecentWork();
    }
  }

  _getRecentWork = async () => {
    try {
      const recentWork = await WorkStore.instance().getRecent(5);
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
        const olderWork = await WorkStore.instance().getAfter(lastWorkId);
        this.setState({
          allWork: WorkStore.instance().work,
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
    const { allWork = [], hideMoreButton, loadingMoreWork } = this.state;
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
              work={allWork}
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

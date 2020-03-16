import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Alert from "../components/Alert";
import ContentContainer from "../components/ContentContainer";
import ContactCard from "../components/ContactCard";
import Spinner from "../components/Spinner";
import WorkShowcaseContainer from "../components/dmm/WorkShowcaseContainer";
import { Work } from "../lib/firebase";
import WorkStore from "../store/WorkStore";

interface Props extends RouteComponentProps { }

interface State {
  alerts: Array<string>;
  allWork: Array<Work>;
  hideMoreButton: boolean;
  loadingMoreWork: boolean;
}

class WorksPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const allWork = WorkStore.instance().work;
    this.state = {
      alerts: [],
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
      const { alerts } = this.state;
      this.setState({
        alerts: ["Unable to load recent work, please try again!"].concat(alerts)
      });
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
        const { alerts } = this.state;
        this.setState({
          alerts: ["Unable to additional work, please try again!"].concat(alerts)
        });
      } finally {
        this.setState({
          loadingMoreWork: false
        });
      }
    }
  }

  render() {
    const {
      alerts = [],
      allWork = [],
      hideMoreButton,
      loadingMoreWork
    } = this.state;

    return (
      <div>
        <ContentContainer
          id="content"
          backgroundColor="dark"
          cardContent={
            <WorkShowcaseContainer
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
                  {alerts.length > 0 &&
                    <div className="uk-margin-top uk-margin-left uk-margin-right">
                      {alerts.map((alert: string, i: number) => <Alert
                        key={i}
                        content={alert}
                        closeable={true}
                        type="danger"
                        onClose={() => {
                          const { alerts } = this.state;
                          alerts.splice(i, 1);
                          this.setState({ alerts });
                        }} />
                      )}
                    </div>
                  }
                  {loadingMoreWork && <Spinner backgroundColor="dark" />}
                </div>
              }
              work={allWork}
            />
          }
        />
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

export default withRouter(WorksPage);

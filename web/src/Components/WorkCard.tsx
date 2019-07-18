import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Work from "../lib/Work";

interface State {
  allWork: Array<Work>;
}

class WorkCard extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      allWork: []
    };
  }

  async componentDidMount() {
    try {
      let allWork = await Work.get();
      this.setState({ allWork });
    } catch (err) {
      // TODO: Handle error
      console.warn(err);
    }
  }

  render() {
    const { allWork } = this.state;
    return (
      <Card
        title="OUR WORK"
        backgroundColor="light"
        content={
          <div>
            {allWork.map((work: Work, i: number) => (
              <div
                key={work.id}
                className="uk-column-1-1"
                style={i > 0 ? styles.project : undefined}
              >
                <div
                  className="uk-card uk-card-hover uk-card-body"
                  style={{
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${work.backgroundImage})`
                  }}
                >
                  <div className="uk-light uk-background-secondary">
                    <div className="uk-padding">
                      <p className="uk-h2">{work.title}</p>
                      <p>{work.description}</p>
                    </div>
                  </div>
                  <div className="uk-text-center uk-margin-top">
                    <Link
                      to={{
                        pathname: `/work/${work.id}`,
                        state: { work }
                      }}
                      className="uk-button uk-button-secondary"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div className="uk-text-center" style={styles.project}>
              <Link to="/work" className="uk-button uk-button-secondary">
                More
              </Link>
            </div>
          </div>
        }
      />
    );
  }
}

const styles = {
  project: {
    paddingTop: "3.5vh"
  }
};

export default WorkCard;

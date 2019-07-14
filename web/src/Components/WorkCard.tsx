import React, { Component } from "react";
import Card from "./Card";
import Work from "../lib/Work";

interface State {
  projects: Array<Work>;
}

class WorkCard extends Component<{}, State> {
  state = {
    projects: []
  };

  async componentDidMount() {
    try {
      let projects = await Work.getRecent();
      this.setState({ projects });
    } catch (err) {
      // TODO: Handle error
      console.warn(err);
    }
  }

  render() {
    const { projects } = this.state;
    return (
      <Card
        title="OUR WORK"
        backgroundColor="light"
        content={
          <div className="uk-dark">
            {projects.map((project: Work, i) => (
              <div
                key={project.id}
                className="uk-column-1-1"
                style={i > 0 ? styles.project : undefined}
              >
                <div
                  className="uk-card uk-card-large uk-card-hover uk-card-body"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${project.backgroundImage})`
                  }}
                >
                  <p className="uk-h2">{project.title}</p>
                  <p className="uk-h3">{project.description}</p>
                  <button className="uk-button uk-button-secondary">
                    View
                  </button>
                </div>
              </div>
            ))}
            <div className="uk-text-center" style={styles.project}>
              <button className="uk-button uk-button-secondary" type="button">
                More
              </button>
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

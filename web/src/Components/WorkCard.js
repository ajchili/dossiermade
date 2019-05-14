import React, { Component } from "react";
import firebase from "./firebase";
import Card from "./Card";

const staticProjcets = [
  {
    id: "aevo",
    title: "VEHICLE SHOWCASE",
    subtitle: "Aviel's EVO X",
    backgroundImage:
      "https://scontent-iad3-1.cdninstagram.com/vp/7f2a39d2641eefec50c53dee39f3f078/5CE488E3/t51.2885-15/sh0.08/e35/s640x640/52843953_259473518331372_1976875947050269731_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com"
  },
  {
    id: "egti",
    title: "VEHICLE SHOWCASE",
    subtitle: "Elijah's MKVI GTI",
    backgroundImage: "http://dossiermade.com/media/gtiFrontLake.jpg"
  }
];

class WorkCard extends Component {
  state = {
    projects: staticProjcets
  };

  async componentDidMount() {
    try {
      let querySnapshot = await firebase
        .firestore()
        .collection("work")
        .limit(5)
        .get();
      let projects = querySnapshot.docs.map(snapshot => {
        return { id: snapshot.id, ...snapshot.data() };
      });
      this.setState({ projects });
    } catch (err) {
      // TODO: Handle error
    }
  }

  render() {
    const { projects } = this.state;
    return (
      <Card
        title="OUR WORK"
        content={
          <div className="uk-light">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="uk-column-1-1"
                style={i > 0 ? styles.project : null}
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
                  <p className="uk-h3">{project.subtitle}</p>
                  <button
                    className="uk-button uk-button-text"
                    style={styles.viewButton}
                  >
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
  },
  viewButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 10
  }
};

export default WorkCard;

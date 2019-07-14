import React, { Component } from "react";
import BackgroundVideo from "./HomeBackgroundVideo";

class HomeLander extends Component {
  render() {
    return (
      <div style={styles.lander}>
        <BackgroundVideo />
        <div className="uk-light" style={styles.landerContent}>
          <div style={styles.landerContentItems}>
            <p className="uk-h1 uk-text-center">DOSSIER MADE MEDIA</p>
            <div className="uk-text-center">
              <a href="#work" uk-scroll="true">
                <button
                  className="uk-button uk-button-default uk-button-large uk-margin-right"
                  type="button"
                >
                  our work
                </button>
              </a>
              <a href="#contact" uk-scroll="true">
                <button
                  className="uk-button uk-button-default uk-button-large uk-margin-left"
                  type="button"
                >
                  contact us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  lander: {
    width: "100%",
    height: "100vh"
  },
  landerContent: {
    width: "100%",
    height: "100%",
    display: "table",
    position: "relative"
  },
  landerContentItems: {
    height: "100%",
    display: "table-cell",
    verticalAlign: "middle",
    mixBlendMode: "difference"
  }
};

export default HomeLander;

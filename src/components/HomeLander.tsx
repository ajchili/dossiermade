import React, { Component } from "react";
import BackgroundVideo from "./HomeBackgroundVideo";

interface Props {
  id: string;
  showVideo: boolean;
}

export default class HomeLander extends Component<Props> {
  render() {
    const { id, showVideo = false } = this.props;

    return (
      <div id={id} style={styles.lander}>
        {showVideo && <BackgroundVideo />}
        <div
          className="uk-light invert"
          // @ts-ignore
          style={styles.landerContent}
        >
          <div
            // @ts-ignore
            style={styles.landerContentItems}
          >
            <p className="uk-h1 uk-text-center">DOSSIER MADE MEDIA</p>
            <div
              style={{
                position: "absolute",
                left: "50%"
              }}
            >
              <a
                href="#work"
                uk-scroll="true"
                style={{
                  position: "absolute",
                  right: 15
                }}
              >
                <button
                  className="uk-button uk-button-default uk-button-large"
                  type="button"
                >
                  our&nbsp;work
                </button>
              </a>
              <a
                href="#contact"
                uk-scroll="true"
                style={{
                  position: "absolute",
                  left: 15
                }}
              >
                <button
                  className="uk-button uk-button-default uk-button-large"
                  type="button"
                >
                  contact&nbsp;us
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
    height: "100vh",
    backgroundColor: "#000000"
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
    verticalAlign: "middle"
  }
};

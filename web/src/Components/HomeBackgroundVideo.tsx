import React, { Component } from "react";
const video = require("../Assets/LazySaturday.mp4");

export default class HomeBackgroundVideo extends Component {
  render() {
    return (
      <div className="uk-visible@m">
        <video
          // @ts-ignore
          style={styles.video}
          src={video}
          muted
          autoPlay
          loop
        />
      </div>
    );
  }
}

const styles = {
  video: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#000000",
    position: "fixed",
    objectFit: "contain",
    align: "center"
  }
};

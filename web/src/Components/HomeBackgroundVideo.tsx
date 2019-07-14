import React, { Component } from "react";
const video = require("../Assets/LazySaturday.mp4");

class HomeBackgroundVideo extends Component {
  render() {
    return (
      <video
        // @ts-ignore
        style={styles.video}
        src={video}
        muted
        autoPlay
        loop
      />
    );
  }
}

const styles = {
  video: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#000000",
    objectFit: "contain",
    position: "fixed",
    align: "center"
  }
};

export default HomeBackgroundVideo;

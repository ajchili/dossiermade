import React, { Component } from "react";
import Video from "../Assets/LazySaturday.mp4";

class HomeBackgroundVideo extends Component {
  render() {
    return (
      <video
        style={styles.video}
        src={Video}
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
    zIndex: -1,
    align: "center"
  }
};

export default HomeBackgroundVideo;

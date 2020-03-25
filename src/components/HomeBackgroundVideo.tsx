import React, { Component } from "react";

const videoID = "399472259";

interface State {
  browser: "chrome" | "safari";
}

export default class HomeBackgroundVideo extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      browser: navigator.userAgent.toLowerCase().includes("safari")
        ? "safari"
        : "chrome"
    };
  }

  render() {
    const { browser } = this.state;
    return (
      <iframe
        title="backgroundVideo"
        src={`https://player.vimeo.com/video/${videoID}?background=1`}
        frameBorder="0"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#000000",
          position: "fixed",
          objectFit: browser === "chrome" ? "contain" : "inherit",
          // @ts-ignore
          align: "center"
        }}
      />
    );
  }
}

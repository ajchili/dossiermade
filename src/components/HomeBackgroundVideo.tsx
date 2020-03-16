import React, { Component } from "react";

const videoID = "RsWmpntc4-I";

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
      <div>
        <iframe
          title="backgroundVideo"
          src={`https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1&amp;loop=1&amp;playlist=${videoID}&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;autohide=1&amp;showinfo=0&amp;controls=0`}
          frameBorder="0"
          uk-responsive="true"
          uk-video="automute: true"
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
        <div className="black-bar" style={{ top: 0 }} />
        <div className="black-bar" style={{ bottom: 0 }} />
      </div>
    );
  }
}

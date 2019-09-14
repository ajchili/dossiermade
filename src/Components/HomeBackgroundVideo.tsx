import React, { Component } from "react";

const videoID = "QVlB1IurF8E";

interface State {
  browser: "chrome" | "safari";
  canResizeBlackBars: boolean;
}

export default class HomeBackgroundVideo extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      browser: navigator.userAgent.toLowerCase().includes("safari")
        ? "safari"
        : "chrome",
      canResizeBlackBars: false
    };
  }

  componentDidMount() {
    // setTimeout is used to allow for the YouTube overlay to have ample
    // time to become hidden before allowing the black bars to become
    // resizable.
    setTimeout(() => {
      // Only allow for resizing of the black bars when the vertical
      // height of the display at 8vh is greater than 60 pixels.
      if (window.innerHeight * 0.08 > 60) {
        this.setState({ canResizeBlackBars: true });
      }
    }, 7000);
  }

  render() {
    const { browser, canResizeBlackBars } = this.state;
    const height = canResizeBlackBars ? "8vh" : 60;
    return (
      <div className="uk-visible@s">
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
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            height,
            backgroundColor: "#000000",
            zIndex: 10
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            height,
            backgroundColor: "#000000"
          }}
        />
      </div>
    );
  }
}

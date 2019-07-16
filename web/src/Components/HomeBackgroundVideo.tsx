import React, { Component } from "react";

const videoID = "KS29PRHNC2A";

interface State {
  canResizeBlackBars: boolean;
}

export default class HomeBackgroundVideo extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
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
    const { canResizeBlackBars } = this.state;
    const height = canResizeBlackBars ? "8vh" : 60;
    return (
      <div className="uk-visible@m">
        <iframe
          title="backgroundVideo"
          src={`https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1&amp;loop=1&amp;playlist=${videoID}&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;autohide=1&amp;showinfo=0&amp;controls=0`}
          frameborder="0"
          uk-responsive
          uk-video="automute: true"
          // @ts-ignore
          style={styles.video}
        />
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            height,
            backgroundColor: "#000000"
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

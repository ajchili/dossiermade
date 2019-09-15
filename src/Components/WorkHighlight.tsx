import React, { Component } from "react";
import Card from "./Card";
import ContentContainer from "./ContentContainer";
import Work from "../lib/Work";

export interface Props {
  work?: Work;
}

export default class WorkHighlight extends Component<Props> {
  render() {
    const { work } = this.props;
    return (
      <ContentContainer
        id="work"
        backgroundColor="dark"
        cardContent={
          <Card
            title={work ? work.title : "Loading..."}
            content={
              <div>
                {work && (
                  <iframe
                    title="video"
                    src={work.embeddedURL}
                    style={styles.iframe}
                  />
                )}
              </div>
            }
            backgroundColor="dark"
          />
        }
      />
    );
  }
}

const styles = {
  iframe: {
    width: "100%",
    height: "65vh",
    minHeight: 300
  }
};

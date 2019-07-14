import React, { Component, ReactElement } from "react";

export interface Props {
  backgroundColor?: "light" | "dark";
  cardContent: ReactElement;
  id: string;
}

export default class HomeContentContainer extends Component<Props> {
  render() {
    const { backgroundColor = "light", cardContent, id } = this.props;

    return (
      <div
        id={id}
        className={
          backgroundColor === "light"
            ? "uk-background-muted"
            : "uk-background-secondary"
        }
        style={{
          position: "relative"
        }}
      >
        <div style={styles.content}>{cardContent}</div>
      </div>
    );
  }
}

const styles = {
  content: {
    marginLeft: "15%",
    marginRight: "15%",
    paddingTop: "7.5vh",
    paddingBottom: "7.5vh"
  }
};

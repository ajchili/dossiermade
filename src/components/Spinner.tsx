import React, { Component } from "react";

export interface Props {
  backgroundColor?: "light" | "dark";
  ratio?: number;
}

export default class extends Component<Props> {
  render() {
    const { backgroundColor = "light", ratio = 1 } = this.props;

    return (
      <div
        className={`uk-text-center uk-${
          backgroundColor === "light" ? "dark" : "light"
        }`}
      >
        <div uk-spinner={`ratio: ${ratio}`} />
      </div>
    );
  }
}

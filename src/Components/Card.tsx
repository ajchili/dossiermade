import React, { Component, ReactElement } from "react";

export interface Props {
  backgroundColor?: "light" | "dark";
  content: ReactElement;
  title: string;
}

export default class Card extends Component<Props> {
  render() {
    const { backgroundColor = "light", content, title } = this.props;

    return (
      <div
        className={`uk-card uk-card-body ${
          backgroundColor === "light" ? "uk-card-hover" : "uk-card-default"
        }`}
      >
        <p className="uk-h1">{title}</p>
        {content}
      </div>
    );
  }
}

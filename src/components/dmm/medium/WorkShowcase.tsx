import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Props } from "../WorkShowcaseContainer";
import Work from "../../../lib/Work";

export default class extends Component<Props> {
  render() {
    const { backgroundColor = "light", work: allWork } = this.props;

    return (
      <div className="uk-child-width-1-1" uk-grid="true">
        {allWork.map((work: Work) => (
          <div key={work.id}>
            <div
              className={"uk-card uk-card-body"}
              style={{
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${work.backgroundImage})`,
                minHeight: "65vh"
              }}
            >
              <div
                className={
                  backgroundColor === "light"
                    ? "uk-background-secondary"
                    : "uk-background-default"
                }
                style={{
                  bottom: 0,
                  display: "flex",
                  flexDirection: "row",
                  left: 0,
                  position: "absolute",
                  right: 0
                }}
              >
                <div
                  className={`${
                    backgroundColor === "light" ? "uk-light" : "uk-secondary"
                  } uk-margin-left`}
                  style={{ flex: 2 }}
                >
                  <span className="uk-h2 uk-text-uppercase">{work.title}</span>
                </div>
                <Link
                  to={`/work/${work.id}`}
                  className={`uk-button ${
                    backgroundColor === "light"
                      ? "uk-button-secondary"
                      : "uk-button-default"
                  }`}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

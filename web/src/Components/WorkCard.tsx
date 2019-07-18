import React, { Component, ReactElement } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Work from "../lib/Work";

interface Props {
  backgroundColor?: "light" | "dark";
  bottomContent?: ReactElement;
  work: Array<Work>;
  page: "home" | "other";
}

class WorkCard extends Component<Props> {
  render() {
    const {
      backgroundColor = "light",
      bottomContent,
      work: allWork,
      page
    } = this.props;
    return (
      <Card
        title="OUR WORK"
        backgroundColor={backgroundColor}
        content={
          <div>
            {!allWork.length && (
              <div className="uk-text-center uk-dark">
                <div uk-spinner="ratio: 1" />
              </div>
            )}
            {allWork.map((work: Work, i: number) => (
              <div
                key={work.id}
                className={`uk-column-1-1 ${i > 0 ? "uk-margin-top" : ""}`}
              >
                <div
                  className="uk-card uk-card-hover uk-card-body"
                  style={{
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${work.backgroundImage})`
                  }}
                >
                  <div className="uk-light uk-background-secondary">
                    <div className="uk-padding">
                      <p className="uk-h2">{work.title}</p>
                      <p>{work.description}</p>
                    </div>
                  </div>
                  <div className="uk-text-center uk-margin-top">
                    <Link
                      to={{
                        pathname: `/work/${work.id}`,
                        state: { work }
                      }}
                      className="uk-button uk-button-secondary"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div className="uk-text-center uk-margin-top">
              {page === "home" && (
                <Link
                  to={{ pathname: "/work", state: { allWork } }}
                  className="uk-button uk-button-secondary"
                >
                  View All
                </Link>
              )}
              {page === "other" && bottomContent}
            </div>
          </div>
        }
      />
    );
  }
}

export default WorkCard;

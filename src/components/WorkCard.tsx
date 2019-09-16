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

interface State {
  titleFlexDirection: "column" | "row"
}

class WorkCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      titleFlexDirection: window.innerWidth < 400 ? "column" : "row"
    };
  }

  componentDidMount() {
    this._updateWindowDimensions();
    window.addEventListener('resize', this._updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowDimensions);
  }

  _updateWindowDimensions = () => {
    this.setState({ titleFlexDirection: window.innerWidth < 600 ? "column" : "row" });
  }

  render() {
    const {
      backgroundColor = "light",
      bottomContent,
      work: allWork,
      page
    } = this.props;
    const { titleFlexDirection } = this.state;
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
                    backgroundImage: `url(${work.backgroundImage})`,
                    minHeight: "65vh"
                  }}
                >
                  <div
                    className="uk-background-secondary"
                    style={{
                      bottom: 0,
                      display: "flex",
                      flexDirection: titleFlexDirection,
                      left: 0,
                      position: "absolute",
                      right: 0
                    }}
                  >
                    <div
                      className="uk-light uk-margin-left"
                      style={{ flex: 2 }}
                    >
                      <span className="uk-h2 uk-text-uppercase">{work.title}</span>
                    </div>
                    <Link
                      to={`/work/${work.id}`}
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
                  to={"/work"}
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

import React, { Component, ReactElement } from "react";
import { Link } from "react-router-dom";
import Work from "../lib/Work";

interface Props {
  backgroundColor?: "light" | "dark";
  bottomContent?: ReactElement;
  work: Array<Work>;
  page: "home" | "other";
}

interface State {
  titleFlexDirection: "column" | "row";
}

class WorkCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      titleFlexDirection: this._determineTitleFlexDirection()
    };
  }

  componentDidMount() {
    this._updateWindowDimensions();
    window.addEventListener("resize", this._updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._updateWindowDimensions);
  }

  _determineTitleFlexDirection = (): "column" | "row" => {
    // If height is greater than width, always show column. This allows iPads
    // and other mobile devices to render content better.
    if (window.innerWidth < window.innerHeight) {
      return "column";
    }
    return window.innerWidth < 400 ? "column" : "row";
  };

  _updateWindowDimensions = () => {
    this.setState({ titleFlexDirection: this._determineTitleFlexDirection() });
  };

  render() {
    const {
      backgroundColor = "light",
      bottomContent,
      work: allWork,
      page
    } = this.props;
    const { titleFlexDirection } = this.state;
    return (
      <div>
        {!allWork.length && (
          <div className="uk-text-center uk-dark">
            <div uk-spinner="ratio: 1" />
          </div>
        )}
        <div
          className="uk-child-width-1-2@s uk-child-width-1-1@m"
          uk-grid={"masonry: true"}
        >
          {allWork.map((work: Work) => (
            <div key={work.id}>
              <div
                className="uk-card uk-card-body uk-card-hover"
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
                    flexDirection: titleFlexDirection,
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
                    <span className="uk-h2 uk-text-uppercase">
                      {work.title}
                    </span>
                  </div>
                  <Link
                    to={`/work/${work.id}`}
                    className={`uk-button ${
                      backgroundColor === "light"
                        ? "uk-button-secondary"
                        : "uk-button-light"
                    }`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="uk-text-center uk-margin-top">
          {page === "home" && (
            <Link to={"/work"} className="uk-button uk-button-secondary">
              View All
            </Link>
          )}
          {page === "other" && bottomContent}
        </div>
      </div>
    );
  }
}

export default WorkCard;

import React, { Component, ReactElement } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import Medium from "./medium/WorkShowcase";
import Small from "./small/WorkShowcase";
import { Work } from "../../lib/firebase";

export interface Props {
  backgroundColor?: "light" | "dark";
  bottomContent?: ReactElement;
  work: Array<Work>;
}

export default class extends Component<Props> {
  render() {
    const { backgroundColor = "light", bottomContent, work = [] } = this.props;

    const visibleWork = work.filter(work => work.title.length > 0 && work.url.length > 0 && work.backgroundImage.length > 0);

    return (
      <div>
        {!work.length && <Spinner backgroundColor={backgroundColor} />}
        <div className="uk-hidden@m">
          <Small
            backgroundColor={backgroundColor}
            bottomContent={bottomContent}
            work={visibleWork}
          />
        </div>
        <div className="uk-visible@m">
          <Medium
            backgroundColor={backgroundColor}
            bottomContent={bottomContent}
            work={visibleWork}
          />
        </div>
        <div className="uk-text-center uk-margin-top">
          {!!bottomContent ? (
            bottomContent
          ) : (
              <Link to={"/work"} className="uk-button uk-button-secondary">
                View All
            </Link>
            )}
        </div>
      </div>
    );
  }
}

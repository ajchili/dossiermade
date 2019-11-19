import React, { Component } from "react";

export interface Props {
  id: string;
}

export default class extends Component<Props> {
  render() {
    const { children, id } = this.props;

    return (
      <div id={id} className="uk-flex-top" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button className="uk-modal-close-default" type="button" uk-close="true" />
            {children}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";

interface Props {
  closeable?: boolean;
  content: string;
  onClose?: () => void;
  type: "primary" | "success" | "warning" | "danger";
}

export default class extends Component<Props> {
  render() {
    const {
      type,
      closeable = false,
      content,
      onClose = () => { }
    } = this.props;

    return (
      <div className={`uk-alert-${type}`} uk-alert="true">
        {closeable &&
          <span
            className="uk-alert-close"
            uk-close="true"
            onClick={() => setTimeout(onClose, 150)} />
        }
        <p>{content}</p>
      </div>
    );
  }
}